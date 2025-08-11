from enum import Enum


class OrderStatus(str, Enum):
    CANCELED = "Canceled"
    IN_TRANSIT = "In Transit"
    DELIVERED = "Delivered"


class OrderResponseMsg(str, Enum):
    canceled_order_status_not_updated = (
        f"Can't update status of {OrderStatus.CANCELED.lower()} order"
    )
    delivered_order_status_not_updated = (
        f"Can't update status of {OrderStatus.DELIVERED.lower()} order"
    )
    order_deleted = "Order successfully deleted"
    order_not_found = "Order not found"
