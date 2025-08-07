from enum import Enum


class ResponseMsg(str, Enum):
    product_deleted = "Successfully deleted product"
    product_not_found = "Product not found"
    products_deleted = "Successfully deleted products"
