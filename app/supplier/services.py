from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .constants import ResponseMsg
from .models import Supplier


async def find_supplier_by_id(id: int, session: AsyncSession) -> Supplier:
    result = await session.execute(select(Supplier).where(Supplier.id == id))
    db_supplier = result.scalar()
    if db_supplier is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=ResponseMsg.supplier_not_found
        )

    return db_supplier


async def find_supplier_by_name(name: str, session: AsyncSession) -> Supplier:
    result = await session.execute(select(Supplier).where(Supplier.name == name))
    db_supplier = result.scalar()
    if db_supplier is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail=ResponseMsg.supplier_not_found
        )

    return db_supplier
