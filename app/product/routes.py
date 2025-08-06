from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_session
from prefixes import API_ROUTER_PREFIX
from .models import Product
from .schemas import ProductSchema

router = APIRouter(prefix=API_ROUTER_PREFIX)


@router.get("/products", response_model=list[ProductSchema])
async def get_products(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Product))

    return result.scalars().all()
