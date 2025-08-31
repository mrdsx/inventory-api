from typing import Sequence
from sqlalchemy.ext.asyncio import AsyncSession

from services import find_supplier_by_id
from schemas import OrderItemSchema, OrderItemPublicSchema


async def build_order_item_public_schema(
    order_item: OrderItemSchema, session: AsyncSession
) -> OrderItemPublicSchema:
    db_supplier = await find_supplier_by_id(order_item.supplier_id, session)

    return OrderItemPublicSchema(
        id=order_item.id,
        order_id=order_item.order_id,
        supplier_name=db_supplier.name,
        name=order_item.name,
        description=order_item.description,
        category=order_item.category,
        cost=order_item.cost,
        quantity=order_item.quantity,
    )  # type: ignore


def get_order_items_total_cost(order_items: Sequence[OrderItemSchema]) -> float:
    total_cost: float = 0
    for order_item in order_items:
        total_cost += order_item.cost * order_item.quantity

    return total_cost
