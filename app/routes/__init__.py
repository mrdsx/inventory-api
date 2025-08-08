from .order import router as router_orders
from .product import router as router_products
from .supplier import router as router_suppliers

__all__ = [
    # * order
    "router_orders",
    # * product
    "router_products",
    # * supplier
    "router_suppliers",
]
