from enum import Enum

INVENTORY_ITEM_SKU_LENGTH = 30
INVENTORY_ITEM_DESCRIPTION_LENGTH = 1000


class InventoryItemResponseMsg(str, Enum):
    product_already_exists = "Product already exists"
    product_deleted = "Successfully deleted product"
    product_not_found = "Product not found"
    products_deleted = "Successfully deleted products"
