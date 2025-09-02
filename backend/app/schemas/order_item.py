from pydantic import BaseModel, Field, NonNegativeFloat


class CreateOrderItemSchema(BaseModel):
    name: str
    supplier_id: int
    description: str
    category: str
    cost: NonNegativeFloat
    quantity: int


class OrderItemSchema(BaseModel):
    id: int
    order_id: int
    supplier_id: int
    name: str
    description: str
    category: str
    cost: NonNegativeFloat
    quantity: int


class OrderItemPublicSchema(OrderItemSchema):
    supplier_id: int = Field(0, exclude=True)
    supplier_name: str
