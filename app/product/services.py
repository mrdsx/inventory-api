from math import floor
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence

from order import Order
from order_item import OrderItem
from .models import Product


async def save_products(
    order: Order, order_items: Sequence[OrderItem], session: AsyncSession
) -> None:
    products: list[OrderItem] = []
    for i, order_item in enumerate(order_items):
        for j in range(order_item.quantity):
            price = order_item.cost + floor(order_item.cost / 2)
            products.append(
                Product(
                    sku=f"SKU-{order.id}-{i}-{j}",
                    order_id=order.id,
                    supplier_id=order.supplier_id,
                    name=order_item.name,
                    description=order_item.description,
                    category=order_item.category,
                    cost=order_item.cost,
                    price=price,
                )
            )

    session.add_all(products)
    await session.commit()
    await session.refresh(order)
