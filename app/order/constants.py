from enum import Enum


class OrderStatuses(str, Enum):
    IN_TRANSIT = "In Transit"
    DELIVERED = "Delivered"
