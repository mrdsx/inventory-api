from pydantic import BaseModel, NonNegativeFloat

from constants import OrderStatus
from .order_item import CreateOrderItemSchema


class CreateOrderSchema(BaseModel):
    items: list[CreateOrderItemSchema]


class OrderSchema(BaseModel):
    id: int
    date: str
    status: OrderStatus


class OrderPublicSchema(OrderSchema):
    total_cost: NonNegativeFloat


class OrdersCountSchema(BaseModel):
    orders_count: int
