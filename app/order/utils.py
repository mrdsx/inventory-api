from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence

from order_item import find_order_items_by_order_id, OrderItemSchema
from supplier import Supplier
from .constants import OrderStatuses
from .models import Order
from .schemas import OrderPublicSchema


async def build_order_public_schema(
    order: Order, supplier: Supplier, session: AsyncSession
) -> OrderPublicSchema:
    db_order_items = await find_order_items_by_order_id(order.id, session)
    total_cost = await get_order_items_total_cost(db_order_items)

    return OrderPublicSchema(
        id=order.id,
        supplier_name=supplier.name,
        date=order.date,
        status=order.status,
        total_cost=total_cost,
    )  # type: ignore


async def get_order_items_total_cost(order_items: Sequence[OrderItemSchema]) -> float:
    total_cost: float = 0
    for order_item in order_items:
        total_cost += order_item.cost * order_item.quantity

    return total_cost


def handle_update_order_status(order_status: OrderStatuses):
    match order_status:
        case OrderStatuses.CANCELED:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Can't update status of {OrderStatuses.CANCELED.lower()} order",
            )
        case OrderStatuses.DELIVERED:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Can't update status of {OrderStatuses.DELIVERED.lower()} order",
            )
        case _:
            pass
