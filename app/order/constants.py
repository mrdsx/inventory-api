from enum import Enum


class OrderStatuses(str, Enum):
    CANCELED = "Canceled"
    IN_TRANSIT = "In Transit"
    DELIVERED = "Delivered"
