from enum import Enum

INVENTORY_ITEM_SKU_LENGTH = 30
INVENTORY_ITEM_DESCRIPTION_LENGTH = 1000


class InventoryItemResponseMsg(str, Enum):
    inventory_item_already_exists = "Product already exists"
    inventory_item_deleted = "Successfully deleted product"
    inventory_item_not_found = "Product not found"
    inventory_items_deleted = "Successfully deleted products"
