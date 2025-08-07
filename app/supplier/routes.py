from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_session
from prefixes import API_ROUTER_PREFIX
from .constants import ResponseMsg
from .models import Supplier
from .schemas import SupplierPayload, SupplierSchema
from .services import find_supplier_by_id
from .validation import validate_supplier_not_exists

router = APIRouter(prefix=API_ROUTER_PREFIX)


@router.get("/suppliers", response_model=list[SupplierSchema])
async def get_suppliers(session: AsyncSession = Depends(get_session)):
    result = await session.execute(select(Supplier))

    return result.scalars().all()


@router.post("/suppliers", response_model=SupplierSchema)
async def create_supplier(
    supplier: SupplierPayload, session: AsyncSession = Depends(get_session)
):
    await validate_supplier_not_exists(supplier, session)

    new_supplier = Supplier(name=supplier.name, contact_email=supplier.contact_email)
    session.add(new_supplier)
    await session.commit()
    await session.refresh(new_supplier)

    return new_supplier


@router.put("/suppliers/{id}", response_model=SupplierSchema)
async def update_supplier_by_id(
    id: int, supplier: SupplierPayload, session: AsyncSession = Depends(get_session)
):
    db_supplier = await find_supplier_by_id(id, session)
    for key, value in supplier.model_dump().items():
        setattr(db_supplier, key, value)

    return db_supplier


@router.delete("/suppliers/{id}")
async def delete_supplier_by_id(id: int, session: AsyncSession = Depends(get_session)):
    db_supplier = await find_supplier_by_id(id, session)
    await session.delete(db_supplier)
    await session.commit()

    return {"message": ResponseMsg.supplier_deleted}
