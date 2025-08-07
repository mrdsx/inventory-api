from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_session
from prefixes import API_ROUTER_PREFIX
from .constants import ResponseMsg
from .models import Product
from .schemas import ProductSchema, UpdateProductSchema
from .services import find_product_by_id

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

    return {"message": ResponseMsg.product_deleted}


@router.delete("/products/{order_id}")
async def delete_products_by_order_id(
    order_id: int, session: AsyncSession = Depends(get_session)
):
    result = await session.execute(select(Product).where(Product.order_id == order_id))
    db_products = result.scalars().all()
    await session.delete(db_products)
    await session.commit()

    return {"message": ResponseMsg.products_deleted}
