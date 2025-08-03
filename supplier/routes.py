from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_db
from prefixes import API_ROUTER_PREFIX
from supplier.models import Supplier
from supplier.schemas import SupplierPayload, SupplierSchema

router = APIRouter(prefix=API_ROUTER_PREFIX)


@router.get("/suppliers", response_model=list[SupplierSchema])
async def get_suppliers(session: AsyncSession = Depends(get_db)):
    suppliers = await session.execute(select(Supplier))

    return suppliers.scalars().all()


@router.post("/suppliers")
async def create_supplier(
    supplier: SupplierPayload, session: AsyncSession = Depends(get_db)
):
    new_supplier = Supplier(name=supplier.name, contact_email=supplier.contact_email)
    session.add(new_supplier)
    await session.commit()
    await session.refresh(new_supplier)

    return new_supplier


@router.put("/suppliers/{id}", response_model=SupplierSchema)
async def asd(
    id: int, supplier: SupplierPayload, session: AsyncSession = Depends(get_db)
):
    result = await session.execute(select(Supplier).where(Supplier.id == id))
    db_supplier = result.scalar()
    if db_supplier is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Supplier not found"
        )

    for key, value in supplier.model_dump().items():
        setattr(db_supplier, key, value)

    return db_supplier


@router.delete("/suppliers/{id}")
async def delete_supplier_by_id(id: int, session: AsyncSession = Depends(get_db)):
    result = await session.execute(select(Supplier).where(Supplier.id == id))
    db_supplier = result.scalar()
    if db_supplier is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Supplier not found"
        )
    await session.delete(db_supplier)
    await session.commit()

    return {"message": "Supplier successfully deleted"}
