from typing import Union
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi_pagination import paginate, set_page, set_params
from fastapi_pagination.default import Page, Params
from sqlalchemy.ext.asyncio import AsyncSession

from constants import API_ROUTER_PREFIX, OrderItemResponseMsg, OrderStatus
from database import get_session
from schemas import (
    CreateOrderSchema,
    OrdersCountSchema,
    OrderItemSchema,
    OrderPublicSchema,
    OrderSchema,
    PaginatedResponse,
)
from services import (
    find_order_by_id,
    find_order_item_by_id,
    find_order_items_by_order_id,
    find_supplier_by_id,
    find_supplier_by_name,
    save_order,
    save_order_items,
    save_inventory_items,
)
from utils import (
    build_order_public_schema,
    build_order_schema,
    build_get_orders_query,
    get_orders_count,
    handle_update_order_status,
)
from validation import validate_order_exists, validate_order_items


router = APIRouter(prefix=API_ROUTER_PREFIX)


@router.get(
    "/orders",
    response_model=Union[
        PaginatedResponse[list[OrderPublicSchema]] | OrdersCountSchema
    ],
)
async def get_orders(
    count: bool = False,
    limit: int | None = None,
    order_by_recent: bool = False,
    page: int = 1,
    size: int = 10,
    status: OrderStatus | None = None,
    session: AsyncSession = Depends(get_session),
):
    set_page(Page[OrderPublicSchema])
    set_params(Params(page=page, size=size))
    query = build_get_orders_query(count, order_by_recent, limit)
    results = await session.execute(query)

    if not count:
        db_orders = [
            await build_order_public_schema(order, supplier, session)
            for order, supplier in results
            if status is None or order.status == status
        ]

        return paginate(db_orders)
    return get_orders_count(status, results)


@router.get("/orders/{order_id}", response_model=OrderPublicSchema)
async def get_order_by_id(order_id: int, session: AsyncSession = Depends(get_session)):
    db_order = await find_order_by_id(order_id, session)
    db_supplier = await find_supplier_by_id(db_order.supplier_id, session)

    return await build_order_public_schema(db_order, db_supplier, session)


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

    return build_order_schema(new_order)


@router.patch("/orders/{order_id}")
async def update_order_status(
    order_id: int, status: OrderStatus, session: AsyncSession = Depends(get_session)
):
    db_order = await find_order_by_id(order_id, session)
    handle_update_order_status(db_order.status)  # type: ignore

    if status == OrderStatus.DELIVERED:
        db_order_items = await find_order_items_by_order_id(db_order.id, session)
        await save_inventory_items(db_order, db_order_items, session)

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

    return {"message": OrderItemResponseMsg.order_item_deleted}
