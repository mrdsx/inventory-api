from pydantic import BaseModel, Field


class ProductSchema(BaseModel):
    id: int
    sku: str = Field(min_length=3, max_length=30, pattern="^[A-Z0-9-]+$")
    name: str
    description: str = Field(max_length=1000)
    category: str
    cost: float
    price: float
    supplier: str
