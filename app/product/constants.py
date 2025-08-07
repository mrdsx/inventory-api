from enum import Enum


class ResponseMsg(str, Enum):
    products_deleted = "Successfully deleted products"
    product_not_found = "Product not found"
