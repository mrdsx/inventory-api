from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .constants import ResponseMsg
from .models import Order


async def find_order_by_id(id: int, session: AsyncSession) -> Order:
    result = await session.execute(select(Order).where(Order.id == id))
    db_order = result.scalar()
    if db_order is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=ResponseMsg.order_not_found
        )

    return db_order


async def save_order(supplier_id: int, session: AsyncSession) -> Order:
    new_order = Order(supplier_id=supplier_id)
    session.add(new_order)
    await session.commit()
    await session.refresh(new_order)

    return new_order
