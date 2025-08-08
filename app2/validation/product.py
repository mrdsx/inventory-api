from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from constants import ProductResponse
from models import Product


async def validate_product_not_exists_by_sku(sku: str, session: AsyncSession) -> None:
    result = await session.execute(select(Product).where(Product.sku == sku))
    db_product = result.scalar()
    if db_product is not None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=ProductResponse.product_already_exists,
        )
