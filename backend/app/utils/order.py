from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from constants import OrderResponseMsg, OrderStatus
from models import Order, Supplier
from schemas import OrderPublicSchema, OrderSchema
from services import find_order_items_by_order_id
from utils import format_date_from_iso_format
from .order_item import get_order_items_total_cost


async def build_order_public_schema(
    order: Order, supplier: Supplier, session: AsyncSession
) -> OrderPublicSchema:
    db_order_items = await find_order_items_by_order_id(order.id, session)
    total_cost = get_order_items_total_cost(db_order_items)
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


def build_get_orders_query(order_by_recent: bool, limit: int | None = None):
    query = select(Order, Supplier).join(Supplier).limit(limit)
    if order_by_recent:
        return query.order_by(Order.date.desc())
    return query.order_by(Order.id)


def handle_update_order_status(order_status: OrderStatus) -> None:
    match order_status:
        case OrderStatus.CANCELED:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=OrderResponseMsg.canceled_order_status_not_updated,
            )
        case OrderStatus.DELIVERED:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=OrderResponseMsg.delivered_order_status_not_updated,
            )
        case _:
            pass
