from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from prefixes import API_ROUTER_PREFIX
from supplier.models import DB_Supplier
from supplier.schemas import SupplierPayload, SupplierSchema

router = APIRouter(prefix=API_ROUTER_PREFIX)


@router.get("/suppliers", response_model=list[SupplierSchema])
async def get_suppliers(session: AsyncSession = Depends(get_db)):
    suppliers = await session.execute(select(DB_Supplier))

    return suppliers.scalars().all()


@router.post("/suppliers")
async def create_supplier(
    supplier: SupplierPayload, session: AsyncSession = Depends(get_db)
):
    new_supplier = DB_Supplier(name=supplier.name, contact_email=supplier.contact_email)
    session.add(new_supplier)
    await session.commit()
    await session.refresh(new_supplier)

    return new_supplier
