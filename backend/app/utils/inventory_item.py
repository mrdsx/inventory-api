from models import InventoryItem, Supplier
from schemas import CreateInventoryItemSchema, InventoryItemPublicSchema


def build_inventory_item_public_schema(
    inventory_item: InventoryItem, supplier: Supplier
) -> InventoryItemPublicSchema:
    return InventoryItemPublicSchema(
        id=inventory_item.id,
        sku=inventory_item.sku,
        order_id=inventory_item.order_id,
        supplier_name=supplier.name,
        name=inventory_item.name,
        description=inventory_item.description,
        category=inventory_item.category,
        cost=inventory_item.cost,
        price=inventory_item.price,
    )  # type: ignore


def build_db_inventory_item(product: CreateInventoryItemSchema) -> InventoryItem:
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
