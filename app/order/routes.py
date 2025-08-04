from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from prefixes import API_ROUTER_PREFIX
from order_item.models import OrderItem
from order_item.services import save_order_items
from supplier.models import Supplier
from supplier.services import find_supplier_by_id, find_supplier_by_name
from .models import Order
from .schemas import OrderPayload, OrderSchema
from .services import save_order
from .validation import validate_order_exists, validate_order_items


router = APIRouter(prefix=API_ROUTER_PREFIX)


@router.get("/orders")
async def get_orders(session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Order, Supplier).join(Supplier))
    return [
        {
            "id": order.id,
            "supplier_name": supplier.name,
            "date": order.date,
            "status": order.status,
        }
        for order, supplier in result
    ]


# TODO: Extract repeating code
@router.get("/orders/{order_id}")
async def get_order_info_by_order_id(order_id: int, session: AsyncSession = Depends(get_db)):  # type: ignore
    await validate_order_exists(order_id, session)

    result = await session.execute(
        select(OrderItem).where(OrderItem.order_id == order_id)
    )

    total_cost: float = 0
    for order_item in result.scalars().all():
        total_cost += order_item.cost * order_item.quantity

    result2 = await session.execute(select(Order).where(Order.id == order_id))
    order = result2.scalar()

    supplier = await find_supplier_by_id(order.supplier_id, session)  # type: ignore

    return {
        "id": order.id,  # type: ignore
        "supplier_name": supplier.name,
        "date": order.date,  # type: ignore
        "status": order.status,  # type: ignore
        "total_cost": total_cost,
    }  # type: ignore


@router.post("/orders", response_model=OrderSchema)
async def create_order(order: OrderPayload, session: AsyncSession = Depends(get_db)):
    validate_order_items(order.items)

    supplier = await find_supplier_by_name(order.supplier_name, session)
    new_order = await save_order(supplier.id, session)
    await save_order_items(new_order, order.items, session)

    return new_order
