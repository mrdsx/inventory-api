from sqlalchemy.ext.asyncio import AsyncSession

from .models import Order


async def save_order(supplier_id: int, session: AsyncSession) -> Order:
    new_order = Order(supplier_id=supplier_id)
    session.add(new_order)
    await session.commit()
    await session.refresh(new_order)

    return new_order
