from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from constants import InventoryItemResponseMsg
from models import InventoryItem


async def validate_inventory_item_not_exists_by_sku(
    sku: str, session: AsyncSession
) -> None:
    result = await session.execute(
        select(InventoryItem).where(InventoryItem.sku == sku)
    )
    db_inventory_item = result.scalar()
    if db_inventory_item is not None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=InventoryItemResponseMsg.inventory_item_already_exists,
        )
