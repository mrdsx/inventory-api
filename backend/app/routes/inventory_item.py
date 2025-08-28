from fastapi import APIRouter, Depends
from fastapi_pagination import Page, Params, paginate, set_page, set_params
from pydantic import PositiveInt
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_session
from constants import (
    API_ROUTER_PREFIX,
    DEFAULT_PAGE_NUMBER,
    DEFAULT_PAGE_SIZE,
    InventoryItemResponseMsg,
)
from models import InventoryItem
from schemas import (
    CreateInventoryItemSchema,
    InventoryItemSchema,
    PaginatedResponse,
    UpdateInventoryItemSchema,
)
from services import find_inventory_item_by_id
from utils import build_db_inventory_item
from validation import validate_inventory_item_not_exists_by_sku

router = APIRouter(prefix=API_ROUTER_PREFIX)


@router.get(
    "/inventory_items", response_model=PaginatedResponse[list[InventoryItemSchema]]
)
async def get_inventory_items(
    page: PositiveInt = DEFAULT_PAGE_NUMBER,
    size: PositiveInt = DEFAULT_PAGE_SIZE,
    session: AsyncSession = Depends(get_session),
):
    set_page(Page[InventoryItemSchema])
    set_params(Params(page=page, size=size))
    results = await session.execute(select(InventoryItem).order_by(InventoryItem.id))
    db_inventory_items = results.scalars().all()

    return paginate(db_inventory_items)


@router.get("/inventory_items/{inventory_item_id}", response_model=InventoryItemSchema)
async def get_inventory_item_by_id(
    inventory_item_id: int, session: AsyncSession = Depends(get_session)
):
    db_inventory_item = await find_inventory_item_by_id(inventory_item_id, session)

    return db_inventory_item


@router.post("/inventory_items")
async def create_inventory_item(
    inventory_item: CreateInventoryItemSchema,
    session: AsyncSession = Depends(get_session),
):
    await validate_inventory_item_not_exists_by_sku(inventory_item.sku, session)

    new_inventory_item = build_db_inventory_item(inventory_item)
    session.add(new_inventory_item)
    await session.commit()

    return {"message": "Successfully added new inventory item"}


@router.put("/inventory_items/{inventory_item_id}", response_model=InventoryItemSchema)
async def update_inventory_item_by_id(
    inventory_item_id: int,
    inventory_item: UpdateInventoryItemSchema,
    session: AsyncSession = Depends(get_session),
):
    db_inventory_item = await find_inventory_item_by_id(inventory_item_id, session)

    for key, value in inventory_item.model_dump().items():
        setattr(db_inventory_item, key, value)
    await session.commit()
    await session.refresh(db_inventory_item)

    return db_inventory_item


@router.delete("/inventory_items/{inventory_item_id}")
async def delete_inventory_item_by_id(
    inventory_item_id: int, session: AsyncSession = Depends(get_session)
):
    db_inventory_item = await find_inventory_item_by_id(inventory_item_id, session)
    await session.delete(db_inventory_item)
    await session.commit()

    return {"message": InventoryItemResponseMsg.inventory_item_deleted}


@router.delete("/inventory_items/{order_id}")
async def delete_inventory_items_by_order_id(
    order_id: int, session: AsyncSession = Depends(get_session)
):
    results = await session.execute(
        select(InventoryItem).where(InventoryItem.order_id == order_id)
    )
    db_inventory_items = results.scalars().all()
    await session.delete(db_inventory_items)
    await session.commit()

    return {"message": InventoryItemResponseMsg.inventory_item_deleted}
