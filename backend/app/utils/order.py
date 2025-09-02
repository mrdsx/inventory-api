from typing import Sequence
from fastapi import HTTPException, status
from sqlalchemy import Select, select

from constants import OrderResponseMsg, OrderStatus
from models import Order, OrderItem
from schemas import OrderPublicSchema, OrdersCountSchema
from utils import format_date_from_iso_format
from .order_item import get_order_items_total_cost


def build_order_public_schema(
    order: Order, order_items: Sequence[OrderItem]
) -> OrderPublicSchema:
    total_cost = get_order_items_total_cost(order_items)
    formatted_date = format_date_from_iso_format(order.date)

    return OrderPublicSchema(
        id=order.id,
        date=formatted_date,
        status=order.status,  # type: ignore
        total_cost=total_cost,
    )


def build_get_orders_query(
    count: bool = False, order_by_recent: bool = False, limit: int | None = None
) -> Select[tuple[Order]]:
    query = select(Order)
    if not count:
        query = query.limit(limit)

    if order_by_recent:
        return query.order_by(Order.date.desc())
    return query.order_by(Order.id)


def get_orders_count(
    status: OrderStatus | None, results: Sequence[Order]
) -> OrdersCountSchema:
    if status is not None:
        orders = [order for order in results if order.status == status]
        return OrdersCountSchema(orders_count=len(orders))

    return OrdersCountSchema(orders_count=len(results))


def handle_update_order_status(order_status: OrderStatus) -> None:
    match order_status:
        case OrderStatus.CANCELED:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=OrderResponseMsg.canceled_order_status_cannot_be_updated,
            )
        case OrderStatus.DELIVERED:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=OrderResponseMsg.delivered_order_status_cannot_be_updated,
            )
        case _:
            pass
