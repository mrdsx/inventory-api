from math import floor
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence

from constants import InventoryItemResponseMsg
from models import Order, OrderItem, InventoryItem


async def find_inventory_item_by_id(id: int, session: AsyncSession) -> InventoryItem:
    result = await session.execute(select(InventoryItem).where(InventoryItem.id == id))
    db_inventory_item = result.scalar()
    if db_inventory_item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=InventoryItemResponseMsg.inventory_item_not_found,
        )

    return db_inventory_item


async def save_inventory_items(
    order: Order, order_items: Sequence[OrderItem], session: AsyncSession
) -> None:
    inventory_items: list[OrderItem] = []
    for i, order_item in enumerate(order_items):
        for j in range(order_item.quantity):
            price = order_item.cost + floor(order_item.cost / 2)
            inventory_items.append(
                InventoryItem(
                    sku=f"SKU-{order.id}-{i}-{j}",
                    order_id=order.id,
                    supplier_id=order.supplier_id,
                    name=order_item.name,
                    description=order_item.description,
                    category=order_item.category,
                    cost=order_item.cost,
                    price=price,
                )
            )

    session.add_all(inventory_items)
    await session.commit()
    await session.refresh(order)
