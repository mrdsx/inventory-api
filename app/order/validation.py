from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from order_item.schemas import OrderItemPayload
from .models import Order


async def validate_order_exists(order_id: int, session: AsyncSession) -> None:
    result = await session.execute(select(Order).where(Order.id == order_id))
    db_order = result.scalar()
    if db_order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Order not found"
        )


def validate_order_items(items: list[OrderItemPayload]) -> None:
    if len(items) == 0:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Order items list is empty",
        )
