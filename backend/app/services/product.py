from math import floor
from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence

from constants import ProductResponseMsg
from models import Order, OrderItem, Product


async def find_product_by_id(id: int, session: AsyncSession) -> Product:
    result = await session.execute(select(Product).where(Product.id == id))
    db_product = result.scalar()
    if db_product is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=ProductResponseMsg.product_not_found,
        )

    return db_product


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
