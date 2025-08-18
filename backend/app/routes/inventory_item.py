from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_session
from constants import API_ROUTER_PREFIX, InventoryItemResponseMsg
from models import Product
from schemas import CreateProductSchema, ProductSchema, UpdateProductSchema
from services import find_product_by_id
from utils import build_db_product
from validation import validate_product_not_exists_by_sku

router = APIRouter(prefix=API_ROUTER_PREFIX)


@router.get("/products", response_model=list[ProductSchema])
async def get_products(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Product).order_by(Product.id))

    return result.scalars().all()


@router.get("/products/{product_id}", response_model=ProductSchema)
async def get_product_by_id(
    product_id: int, session: AsyncSession = Depends(get_session)
):
    db_product = await find_product_by_id(product_id, session)

    return db_product


@router.post("/products", response_model=ProductSchema)
async def create_product(
    product: CreateProductSchema, session: AsyncSession = Depends(get_session)
):
    await validate_product_not_exists_by_sku(product.sku, session)

    new_product = build_db_product(product)
    session.add(new_product)
    await session.commit()
    await session.refresh(new_product)

    return new_product


@router.put("/products/{product_id}", response_model=ProductSchema)
async def update_product_by_id(
    product_id: int,
    product: UpdateProductSchema,
    session: AsyncSession = Depends(get_session),
):
    db_product = await find_product_by_id(product_id, session)

    for key, value in product.model_dump().items():
        setattr(db_product, key, value)
    await session.commit()
    await session.refresh(db_product)

    return db_product


@router.delete("/products/{product_id}")
async def delete_product_by_id(
    product_id: int, session: AsyncSession = Depends(get_session)
):
    db_product = await find_product_by_id(product_id, session)
    await session.delete(db_product)
    await session.commit()

    return {"message": InventoryItemResponseMsg.product_deleted}


@router.delete("/products/{order_id}")
async def delete_products_by_order_id(
    order_id: int, session: AsyncSession = Depends(get_session)
):
    result = await session.execute(select(Product).where(Product.order_id == order_id))
    db_products = result.scalars().all()
    await session.delete(db_products)
    await session.commit()

    return {"message": InventoryItemResponseMsg.products_deleted}
