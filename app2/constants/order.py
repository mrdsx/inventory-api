from enum import Enum


class OrderResponse(str, Enum):
    order_deleted = "Order successfully deleted"
    order_not_found = "Order not found"


class OrderStatus(str, Enum):
    CANCELED = "Canceled"
    IN_TRANSIT = "In Transit"
    DELIVERED = "Delivered"
