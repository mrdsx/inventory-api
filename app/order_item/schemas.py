from pydantic import BaseModel


class OrderItemPayload(BaseModel):
    name: str
    description: str
    category: str
    cost: float
    quantity: int


class OrderItemSchema(BaseModel):
    id: int
    order_id: int
    name: str
    description: str
    category: str
    cost: float
    quantity: int
