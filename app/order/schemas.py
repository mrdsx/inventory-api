from typing import Annotated, Any
from pydantic import BaseModel, Field, NonNegativeFloat
from datetime import datetime

from order_item import OrderItemPayload
from .constants import OrderStatus


class OrderPayload(BaseModel):
    supplier_name: str
    items: list[OrderItemPayload]


class OrderSchema(BaseModel):
    id: int
    supplier_id: int
    date: Annotated[datetime, Any]
    status: OrderStatus


class OrderPublicSchema(OrderSchema):
    supplier_id: int = Field(0, exclude=True)
    supplier_name: str
    total_cost: NonNegativeFloat
