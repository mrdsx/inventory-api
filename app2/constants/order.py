from enum import Enum


class OrderStatus(str, Enum):
    CANCELED = "Canceled"
    IN_TRANSIT = "In Transit"
    DELIVERED = "Delivered"


class ResponseMsg(str, Enum):
    order_deleted = "Order successfully deleted"
    order_not_found = "Order not found"
