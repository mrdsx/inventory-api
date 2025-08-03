from typing import Annotated, Any
from pydantic import BaseModel
from datetime import datetime

from order_item.schemas import OrderItemPayload
from .constants import OrderStatuses


class OrderPayload(BaseModel):
    supplier_name: str
    items: list[OrderItemPayload]


class OrderSchema(BaseModel):
    id: int
    supplier_id: int
    date: Annotated[datetime, Any]
    status: OrderStatuses
