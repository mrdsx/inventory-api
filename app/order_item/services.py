from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from order import Order
from .models import OrderItem
from .schemas import OrderItemPayload


async def find_order_items_by_order_id(order_id: int, session: AsyncSession):
    result = await session.execute(
        select(OrderItem).where(OrderItem.order_id == order_id)
    )

    return result.scalars().all()


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
