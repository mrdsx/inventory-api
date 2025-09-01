from typing import Sequence
from fastapi import HTTPException, status
from sqlalchemy import Result, Select, select

from constants import OrderResponseMsg, OrderStatus
from models import Order, OrderItem, Supplier
from schemas import OrderPublicSchema, OrderSchema, OrdersCountSchema
from utils import format_date_from_iso_format
from .order_item import get_order_items_total_cost


def build_order_public_schema(
    order: Order, order_items: Sequence[OrderItem], supplier: Supplier
) -> OrderPublicSchema:
    total_cost = get_order_items_total_cost(order_items)
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


def build_get_orders_query(
    count: bool = False, order_by_recent: bool = False, limit: int | None = None
) -> Select[tuple[Order, Supplier]]:
    query = select(Order, Supplier).join(Supplier)
    if not count:
        query = query.limit(limit)

    if order_by_recent:
        return query.order_by(Order.date.desc())
    return query.order_by(Order.id)


def get_orders_count(
    status: OrderStatus | None, result: Result[tuple[Order, Supplier]]
) -> OrdersCountSchema:
    if status is not None:
        orders = [order for order, _supplier in result if order.status == status]
        return OrdersCountSchema(orders_count=len(orders))

    return OrdersCountSchema(orders_count=len(result.scalars().all()))


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
