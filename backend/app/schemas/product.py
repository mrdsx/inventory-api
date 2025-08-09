from pydantic import BaseModel, Field, NonNegativeFloat


class ProductSchema(BaseModel):
    id: int
    sku: str = Field(min_length=3, max_length=30, pattern="^[A-Z0-9-]+$")
    order_id: int
    supplier_id: int
    name: str
    description: str = Field(max_length=1000)
    category: str
    cost: NonNegativeFloat
    price: NonNegativeFloat


class CreateProductSchema(ProductSchema):
    id: int = Field(0, validate_default=True, exclude=True)


class UpdateProductSchema(BaseModel):
    name: str
    description: str = Field(max_length=1000)
    category: str
    price: NonNegativeFloat
