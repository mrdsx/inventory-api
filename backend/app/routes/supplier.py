from fastapi import APIRouter, Depends
from fastapi_pagination import Page, Params, paginate, set_page, set_params
from pydantic import PositiveInt
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from database import get_session
from constants import (
    API_ROUTER_PREFIX,
    DEFAULT_PAGE_NUMBER,
    DEFAULT_PAGE_SIZE,
    SupplierResponseMsg,
)
from models import Supplier
from schemas import CreateSupplierSchema, PaginatedResponse, SupplierSchema
from services import find_supplier_by_id
from validation import validate_supplier_not_exists

router = APIRouter(prefix=API_ROUTER_PREFIX)


@router.get("/suppliers", response_model=PaginatedResponse[list[SupplierSchema]])
async def get_suppliers(
    limit: PositiveInt | None = None,
    page: PositiveInt = DEFAULT_PAGE_NUMBER,
    size: PositiveInt = DEFAULT_PAGE_SIZE,
    session: AsyncSession = Depends(get_session),
):
    set_page(Page[SupplierSchema])
    set_params(Params(page=page, size=size))
    results = await session.execute(select(Supplier).order_by(Supplier.id).limit(limit))
    db_suppliers = results.scalars().all()

    return paginate(db_suppliers)


@router.get("/suppliers/{id}", response_model=SupplierSchema)
async def get_supplier_by_id(id: int, session: AsyncSession = Depends(get_session)):
    return await find_supplier_by_id(id, session)


@router.post("/suppliers")
async def create_supplier(
    supplier: CreateSupplierSchema, session: AsyncSession = Depends(get_session)
):
    await validate_supplier_not_exists(supplier, session)

    new_supplier = Supplier(name=supplier.name, contact_email=supplier.contact_email)
    session.add(new_supplier)
    await session.commit()
    await session.refresh(new_supplier)

    return {"message": SupplierResponseMsg.supplier_created}


@router.put("/suppliers/{id}", response_model=SupplierSchema)
async def update_supplier_by_id(
    id: int,
    supplier: CreateSupplierSchema,
    session: AsyncSession = Depends(get_session),
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

    return {"message": SupplierResponseMsg.supplier_deleted}
