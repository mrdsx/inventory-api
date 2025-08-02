from fastapi import APIRouter

from endpoints import API_ROUTER_PREFIX
from schemas.suppliers import SupplierSchema

router = APIRouter(prefix=API_ROUTER_PREFIX)

suppliers: list[SupplierSchema] = [
    SupplierSchema(id=1, name="Supplier name", contact_email="Supplier's email"),
    SupplierSchema(id=2, name="Name 2", contact_email="Email"),
]


@router.get("/suppliers", response_model=list[SupplierSchema])
def read_suppliers():
    return suppliers


@router.post("/suppliers")
def create_supplier(supplier: SupplierSchema):
    suppliers.append(supplier)
    return supplier
