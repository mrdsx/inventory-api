from typing import Annotated, Any
from pydantic import BaseModel, Field, NonNegativeFloat
from datetime import datetime

from constants import OrderStatus
from .order_item import CreateOrderItemSchema


class CreateOrderSchema(BaseModel):
    supplier_name: str
    items: list[CreateOrderItemSchema]


class OrderSchema(BaseModel):
    id: int
    supplier_id: int
    date: Annotated[datetime, Any]
    status: OrderStatus


class OrderPublicSchema(OrderSchema):
    supplier_id: int = Field(0, exclude=True)
    supplier_name: str
    total_cost: NonNegativeFloat
