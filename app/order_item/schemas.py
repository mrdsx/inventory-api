from pydantic import BaseModel, NonNegativeFloat


class OrderItemPayload(BaseModel):
    name: str
    description: str
    category: str
    cost: NonNegativeFloat
    quantity: int


class OrderItemSchema(BaseModel):
    id: int
    order_id: int
    name: str
    description: str
    category: str
    cost: NonNegativeFloat
    quantity: int
