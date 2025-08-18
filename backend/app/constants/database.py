from enum import Enum


class TableName(str, Enum):
    ORDER_ITEMS = "order_items"
    ORDERS = "orders"
    INVENTORY_ITEMS = "inventory_items"
    SUPPLIERS = "suppliers"
