from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence

from constants import OrderResponse, OrderStatus
from models import Order, Supplier
from schemas import OrderItemSchema, OrderPublicSchema, OrderSchema
from services import find_order_items_by_order_id
from utils import format_date_from_iso_format


async def build_order_public_schema(
    order: Order, supplier: Supplier, session: AsyncSession
) -> OrderPublicSchema:
    db_order_items = await find_order_items_by_order_id(order.id, session)
    total_cost = await get_order_items_total_cost(db_order_items)
    formatted_date = format_date_from_iso_format(order.date)

    return OrderPublicSchema(
        id=order.id,
        supplier_name=supplier.name,
        date=formatted_date,
        status=order.status,
        total_cost=total_cost,
    )  # type: ignore


def build_order_schema(order: Order) -> OrderSchema:
    return OrderSchema(
        id=order.id,
        supplier_id=order.supplier_id,
        date=format_date_from_iso_format(order.date),
        status=order.status,  # type: ignore
    )


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
                detail=OrderResponse.canceled_order_status_not_updated,
            )
        case OrderStatus.DELIVERED:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=OrderResponse.delivered_order_status_not_updated,
            )
        case _:
            pass
