from typing import Sequence
from app.schemas.order_item import OrderItemSchema


def get_order_items_total_cost(order_items: Sequence[OrderItemSchema]) -> float:
    total_cost: float = 0
    for order_item in order_items:
        total_cost += order_item.cost * order_item.quantity

    return total_cost
