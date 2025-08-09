from enum import Enum


class TableName(Enum, str):
    ORDER_ITEMS = "order_items"
    ORDERS = "orders"
    PRODUCTS = "products"
    SUPPLIERS = "suppliers"
