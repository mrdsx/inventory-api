from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_session
from constants import API_ROUTER_PREFIX, InventoryItemResponseMsg
from models import InventoryItem
from schemas import CreateProductSchema, ProductSchema, UpdateProductSchema
from services import find_product_by_id
from utils import build_db_product
from validation import validate_product_not_exists_by_sku

router = APIRouter(prefix=API_ROUTER_PREFIX)


@router.get("/inventory_items", response_model=list[ProductSchema])
async def get_inventory_items(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(InventoryItem).order_by(InventoryItem.id))

    return result.scalars().all()


@router.get("/inventory_items/{inventory_item_id}", response_model=ProductSchema)
async def get_inventory_item_by_id(
    inventory_item_id: int, session: AsyncSession = Depends(get_session)
):
    db_inventory_item = await find_product_by_id(inventory_item_id, session)

    return db_inventory_item


@router.post("/inventory_items", response_model=ProductSchema)
async def create_inventory_item(
    inventory_item: CreateProductSchema, session: AsyncSession = Depends(get_session)
):
    await validate_product_not_exists_by_sku(inventory_item.sku, session)

    new_inventory_item = build_db_product(inventory_item)
    session.add(new_inventory_item)
    await session.commit()
    await session.refresh(new_inventory_item)

    return new_inventory_item


@router.put("/inventory_items/{inventory_item_id}", response_model=ProductSchema)
async def update_inventory_item_by_id(
    inventory_item_id: int,
    inventory_item: UpdateProductSchema,
    session: AsyncSession = Depends(get_session),
):
    db_inventory_item = await find_product_by_id(inventory_item_id, session)

    for key, value in inventory_item.model_dump().items():
        setattr(db_inventory_item, key, value)
    await session.commit()
    await session.refresh(db_inventory_item)

    return db_inventory_item


@router.delete("/inventory_items/{inventory_item_id}")
async def delete_inventory_item_by_id(
    inventory_item_id: int, session: AsyncSession = Depends(get_session)
):
    db_inventory_item = await find_product_by_id(inventory_item_id, session)
    await session.delete(db_inventory_item)
    await session.commit()

    return {"message": InventoryItemResponseMsg.product_deleted}


@router.delete("/inventory_items/{order_id}")
async def delete_inventory_items_by_order_id(
    order_id: int, session: AsyncSession = Depends(get_session)
):
    result = await session.execute(
        select(InventoryItem).where(InventoryItem.order_id == order_id)
    )
    db_inventory_items = result.scalars().all()
    await session.delete(db_inventory_items)
    await session.commit()

    return {"message": InventoryItemResponseMsg.products_deleted}
