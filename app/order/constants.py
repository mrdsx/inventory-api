from enum import Enum


class OrderStatus(str, Enum):
    CANCELED = "Canceled"
    IN_TRANSIT = "In Transit"
    DELIVERED = "Delivered"
