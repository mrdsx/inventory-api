from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from constants import InventoryItemResponseMsg
from models import InventoryItem


async def validate_product_not_exists_by_sku(sku: str, session: AsyncSession) -> None:
    result = await session.execute(
        select(InventoryItem).where(InventoryItem.sku == sku)
    )
    db_product = result.scalar()
    if db_product is not None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=InventoryItemResponseMsg.product_already_exists,
        )
