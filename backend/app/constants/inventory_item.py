from enum import Enum

PRODUCT_SKU_LENGTH = 30
PRODUCT_DESCRIPTION_LENGTH = 1000


class ProductResponseMsg(str, Enum):
    product_already_exists = "Product already exists"
    product_deleted = "Successfully deleted product"
    product_not_found = "Product not found"
    products_deleted = "Successfully deleted products"
