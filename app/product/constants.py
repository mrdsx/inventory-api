from enum import Enum


class ResponseMsg(str, Enum):
    products_deleted = "Successfully deleted products"
