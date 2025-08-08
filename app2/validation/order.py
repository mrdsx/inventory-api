from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from constants import OrderResponse, OrderItemResponse
from models import Order
from schemas import CreateOrderItemSchema


async def validate_order_exists(order_id: int, session: AsyncSession) -> None:
    result = await session.execute(select(Order).where(Order.id == order_id))
    db_order = result.scalar()
    if db_order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=OrderResponse.order_not_found
        )


def validate_order_items(items: list[CreateOrderItemSchema]) -> None:
    if len(items) == 0:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=OrderItemResponse.order_items_list_is_empty,
        )
