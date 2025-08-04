from typing import Annotated, Any
from pydantic import BaseModel, Field
from datetime import datetime

from order_item import OrderItemPayload
from .constants import OrderStatuses


class OrderPayload(BaseModel):
    supplier_name: str
    items: list[OrderItemPayload]


class OrderSchema(BaseModel):
    id: int
    supplier_id: int
    date: Annotated[datetime, Any]
    status: OrderStatuses


class OrderPublicSchema(OrderSchema):
    supplier_id: int = Field(0, exclude=True)
    supplier_name: str
    total_cost: float
