from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from constants import API_ROUTER_PREFIX, OrderItemResponse, OrderStatus
from database import get_session
from models import Order, Supplier
from schemas import CreateOrderSchema, OrderItemSchema, OrderPublicSchema, OrderSchema
from services import (
    find_order_by_id,
    find_order_item_by_id,
    find_order_items_by_order_id,
    find_supplier_by_id,
    find_supplier_by_name,
    save_order,
    save_order_items,
    save_products,
)
from utils import (
    build_order_public_schema,
    get_order_items_total_cost,
    handle_update_order_status,
)
from validation import validate_order_exists, validate_order_items


router = APIRouter(prefix=API_ROUTER_PREFIX)


@router.get("/orders", response_model=list[OrderPublicSchema])
async def get_orders(
    limit: int | None = None,
    order_by_recent: bool = False,
    session: AsyncSession = Depends(get_session),
):
    query = select(Order, Supplier).join(Supplier).limit(limit)
    if order_by_recent:
        query = query.order_by(Order.date.desc())
    else:
        query = query.order_by(Order.id)

    result = await session.execute(query)

    return [
        await build_order_public_schema(order, supplier, session)
        for order, supplier in result
    ]


@router.get("/orders/{order_id}", response_model=OrderPublicSchema)
async def get_order_by_id(order_id: int, session: AsyncSession = Depends(get_session)):
    db_order = await find_order_by_id(order_id, session)
    db_supplier = await find_supplier_by_id(db_order.supplier_id, session)
    db_order_items = await find_order_items_by_order_id(order_id, session)
    total_cost = await get_order_items_total_cost(db_order_items)

    return OrderPublicSchema(
        id=db_order.id,
        supplier_name=db_supplier.name,
        date=db_order.date,
        status=db_order.status,
        total_cost=total_cost,
    )  # type: ignore


@router.get("/orders/{order_id}/items", response_model=list[OrderItemSchema])
async def get_order_items_by_order_id(
    order_id: int, session: AsyncSession = Depends(get_session)
):
    await validate_order_exists(order_id, session)
    db_order_items = await find_order_items_by_order_id(order_id, session)

    return db_order_items


@router.post("/orders", response_model=OrderSchema)
async def create_order(
    order: CreateOrderSchema, session: AsyncSession = Depends(get_session)
):
    validate_order_items(order.items)

    db_supplier = await find_supplier_by_name(order.supplier_name, session)
    new_order = await save_order(db_supplier.id, session)
    await save_order_items(new_order, order.items, session)

    return new_order


@router.patch("/orders/{order_id}")
async def update_order_status(
    order_id: int, status: OrderStatus, session: AsyncSession = Depends(get_session)
):
    db_order = await find_order_by_id(order_id, session)
    handle_update_order_status(db_order.status)  # type: ignore

    if status == OrderStatus.DELIVERED:
        db_order_items = await find_order_items_by_order_id(db_order.id, session)
        await save_products(db_order, db_order_items, session)

    db_order.status = status
    await session.commit()

    return {"message": f"Order #{order_id} status changed to {status.value}"}


@router.delete("/orders/{order_id}/items/{item_id}")
async def delete_order_item_by_id(
    item_id: int, order_id: int, session: AsyncSession = Depends(get_session)
):
    await validate_order_exists(order_id, session)

    db_order = await find_order_by_id(order_id, session)
    if db_order.status != OrderStatus.IN_TRANSIT:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Can't delete item from {db_order.status.lower()} order",
        )

    db_order_item = await find_order_item_by_id(item_id, order_id, session)
    await session.delete(db_order_item)
    await session.commit()

    return {"message": OrderItemResponse.order_item_deleted}
