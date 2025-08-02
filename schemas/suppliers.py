from pydantic import BaseModel


class SupplierSchema(BaseModel):
    id: int
    name: str
    contact_email: str
