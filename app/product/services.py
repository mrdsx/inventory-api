from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence

from .models import Product
from order import Order
from order_item import OrderItem


async def save_products(
    order: Order, order_items: Sequence[OrderItem], session: AsyncSession
) -> None:
    products: list[OrderItem] = []
    for order_item in order_items:
        for index in range(order_item.quantity):
            products.append(
                Product(
                    sku=f"SKU-{index}",
                    supplier_id=order.supplier_id,
                    name=order_item.name,
                    description=order_item.description,
                    category=order_item.category,
                    cost=order_item.cost,
                    price=order_item.cost * 1.5,
                )
            )

    session.add_all(products)
    await session.commit()
    await session.refresh(order)
