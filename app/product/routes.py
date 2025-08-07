from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_session
from prefixes import API_ROUTER_PREFIX
from .constants import ResponseMsg
from .models import Product
from .schemas import ProductSchema

router = APIRouter(prefix=API_ROUTER_PREFIX)


@router.get("/products", response_model=list[ProductSchema])
async def get_products(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Product))

    return result.scalars().all()


@router.delete("/products/{order_id}")
async def delete_products_by_order_id(
    order_id: int, session: AsyncSession = Depends(get_session)
):
    result = await session.execute(select(Product).where(Product.order_id == order_id))
    db_products = result.scalars().all()
    await session.delete(db_products)
    await session.commit()

    return {"message": ResponseMsg.products_deleted}
