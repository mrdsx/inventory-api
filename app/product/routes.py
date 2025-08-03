from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from prefixes import API_ROUTER_PREFIX
from . import Product, ProductSchema


router = APIRouter(prefix=API_ROUTER_PREFIX)


@router.get("/products", response_model=list[ProductSchema])
async def get_products(session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Product))

    return result.scalars().all()
