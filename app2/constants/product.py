from enum import Enum


class ProductResponse(str, Enum):
    product_already_exists = "Product already exists"
    product_deleted = "Successfully deleted product"
    product_not_found = "Product not found"
    products_deleted = "Successfully deleted products"
