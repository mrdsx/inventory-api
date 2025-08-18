from models import InventoryItem
from schemas import CreateProductSchema


def build_db_product(product: CreateProductSchema) -> InventoryItem:
    return InventoryItem(
        sku=product.sku,
        order_id=product.order_id,
        supplier_id=product.supplier_id,
        name=product.name,
        description=product.description,
        category=product.category,
        cost=product.cost,
        price=product.price,
    )
