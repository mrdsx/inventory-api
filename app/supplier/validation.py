from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .constants import ResponseMsg
from .models import Supplier
from .schemas import SupplierPayload


async def validate_supplier_not_exists(
    supplier: SupplierPayload, session: AsyncSession
) -> None:
    result = await session.execute(
        select(Supplier).where(
            (Supplier.name == supplier.name)
            | (Supplier.contact_email == supplier.contact_email)
        )
    )
    db_supplier = result.scalar()
    if db_supplier is not None:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=ResponseMsg.supplier_already_exists,
        )
