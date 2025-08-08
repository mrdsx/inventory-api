from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence

from constants import OrderStatus
from models import Order, Supplier
from schemas import OrderItemSchema, OrderPublicSchema
from services import find_order_items_by_order_id


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


def handle_update_order_status(order_status: OrderStatus) -> None:
    match order_status:
        case OrderStatus.CANCELED:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Can't update status of {OrderStatus.CANCELED.lower()} order",
            )
        case OrderStatus.DELIVERED:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Can't update status of {OrderStatus.DELIVERED.lower()} order",
            )
        case _:
            pass
