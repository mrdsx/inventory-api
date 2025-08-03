from sqlalchemy.ext.asyncio import AsyncSession

from order.models import Order
from .models import OrderItem
from .schemas import OrderItemPayload


async def save_order_items(
    order: Order, items: list[OrderItemPayload], session: AsyncSession
):
    order_items = [
        OrderItem(
            order_id=order.id,
            name=item.name,
            description=item.description,
            category=item.category,
            cost=item.cost,
            quantity=item.quantity,
        )
        for item in items
    ]
    session.add_all(order_items)
    await session.commit()
    await session.refresh(order)
