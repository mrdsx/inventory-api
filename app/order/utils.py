from sqlalchemy.ext.asyncio import AsyncSession

from order_item import find_order_items_by_order_id
from supplier.models import Supplier
from .models import Order
from .schemas import OrderPublicSchema


async def build_order_public_schema(
    order: Order, supplier: Supplier, session: AsyncSession
):
    return OrderPublicSchema(
        id=order.id,
        supplier_name=supplier.name,
        date=order.date,
        status=order.status,
        total_cost=await get_order_items_total_cost(order.id, session),
    )  # type: ignore


async def get_order_items_total_cost(order_id: int, session: AsyncSession):
    order_items = await find_order_items_by_order_id(order_id, session)

    total_cost: float = 0
    for order_item in order_items:
        total_cost += order_item.cost * order_item.quantity

    return total_cost
