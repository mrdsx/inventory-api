from enum import Enum


class TableName(str, Enum):
    ORDER_ITEMS = "order_items"
    ORDERS = "orders"
    PRODUCTS = "products"
    SUPPLIERS = "suppliers"
