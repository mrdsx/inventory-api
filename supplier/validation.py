from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from supplier.models import Supplier


async def validate_supplier_not_exists(name: str, session: AsyncSession):
    result = await session.execute(select(Supplier).where(Supplier.name == name))
    db_supplier = result.scalar()
    if db_supplier is not None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Supplier '{name}' already exists",
        )
