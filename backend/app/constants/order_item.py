from enum import Enum

from .product import PRODUCT_DESCRIPTION_LENGTH

ORDER_ITEM_DESCRIPTION_LENGTH = PRODUCT_DESCRIPTION_LENGTH


class OrderItemResponseMsg(str, Enum):
    order_item_deleted = "Order item successfully deleted"
    order_item_not_found = "Order item not found"
    order_items_list_is_empty = "Order items list is empty"
