from pydantic import BaseModel


class SupplierPayload(BaseModel):
    name: str
    contact_email: str


class SupplierSchema(BaseModel):
    id: int
    name: str
    contact_email: str
