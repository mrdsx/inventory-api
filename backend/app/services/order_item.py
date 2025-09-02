from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence

from constants import OrderItemResponseMsg
from models import OrderItem
from schemas import CreateOrderItemSchema


async def find_order_item_by_id(
    item_id: int, order_id: int, session: AsyncSession
) -> OrderItem:
    result = await session.execute(
        select(OrderItem).where(
            (OrderItem.id == item_id) & (OrderItem.order_id == order_id)
        )
    )
    db_order_item = result.scalar()
    if db_order_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=OrderItemResponseMsg.order_item_not_found,
        )

    return db_order_item


async def find_order_items_by_order_id(
    order_id: int, session: AsyncSession
) -> Sequence[OrderItem]:
    result = await session.execute(
        select(OrderItem).where(OrderItem.order_id == order_id).order_by(OrderItem.id)
    )

    return result.scalars().all()


async def save_order_items(
    order_id: int, items: list[CreateOrderItemSchema], session: AsyncSession
) -> None:

    order_items = [
        OrderItem(
            order_id=order_id,
            supplier_id=item.supplier_id,
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
