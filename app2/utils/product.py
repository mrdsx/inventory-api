from ..models.product import Product
from ..schemas.product import CreateProductSchema


def build_product_db_object(product: CreateProductSchema) -> Product:
    return Product(
        sku=product.sku,
        order_id=product.order_id,
        supplier_id=product.supplier_id,
        name=product.name,
        description=product.description,
        category=product.category,
        cost=product.cost,
        price=product.price,
    )
