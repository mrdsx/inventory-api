from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from prefixes import API_ROUTER_PREFIX
from order_item.services import save_order_items
from supplier.models import Supplier
from supplier.services import find_supplier_by_id, find_supplier_by_name
from .models import Order
from .schemas import OrderPayload, OrderPublicSchema, OrderSchema
from .services import find_order_by_id, save_order
from .utils import build_order_public_schema, get_order_items_total_cost
from .validation import validate_order_items


router = APIRouter(prefix=API_ROUTER_PREFIX)


@router.get("/orders", response_model=list[OrderPublicSchema])
async def get_orders(session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Order, Supplier).join(Supplier))

    return [
        await build_order_public_schema(order, supplier, session)
        for order, supplier in result
    ]


@router.get("/orders/{order_id}", response_model=OrderPublicSchema)
async def get_order_info_by_order_id(
    order_id: int, session: AsyncSession = Depends(get_db)
):
    order = await find_order_by_id(order_id, session)
    supplier = await find_supplier_by_id(order.supplier_id, session)
    total_cost = await get_order_items_total_cost(order_id, session)

    return OrderPublicSchema(
        id=order.id,
        supplier_name=supplier.name,
        date=order.date,
        status=order.status,
        total_cost=total_cost,
    )  # type: ignore


@router.post("/orders", response_model=OrderSchema)
async def create_order(order: OrderPayload, session: AsyncSession = Depends(get_db)):
    validate_order_items(order.items)

    supplier = await find_supplier_by_name(order.supplier_name, session)
    new_order = await save_order(supplier.id, session)
    await save_order_items(new_order, order.items, session)

    return new_order
