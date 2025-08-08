from enum import Enum


class ResponseMsg(str, Enum):
    supplier_already_exists = "Supplier already exists"
    supplier_deleted = "Supplier successfully deleted"
    supplier_not_found = "Supplier not found"
