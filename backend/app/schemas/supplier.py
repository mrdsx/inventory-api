from pydantic import BaseModel


class CreateSupplierSchema(BaseModel):
    name: str
    contact_email: str


class UpdateSupplierSchema(CreateSupplierSchema):
    pass


class SupplierSchema(BaseModel):
    id: int
    name: str
    contact_email: str
