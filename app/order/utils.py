from sqlalchemy.ext.asyncio import AsyncSession

from order_item.services import find_order_items_by_order_id


async def get_order_items_total_cost(order_id: int, session: AsyncSession):
    order_items = await find_order_items_by_order_id(order_id, session)

    total_cost: float = 0
    for order_item in order_items:
        total_cost += order_item.cost * order_item.quantity

    return total_cost
