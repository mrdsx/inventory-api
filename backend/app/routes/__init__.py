from .inventory_item import router as router_inventory_items
from .order import router as router_orders
from .supplier import router as router_suppliers

__all__ = [
    # * inventory_item
    "router_inventory_items",
    # * order
    "router_orders",
    # * supplier
    "router_suppliers",
]
