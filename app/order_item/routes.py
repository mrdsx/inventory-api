from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

import prefixes
from database import get_db
from order.validation import validate_order_exists
from .models import OrderItem
from .schemas import OrderItemSchema

router = APIRouter(prefix=prefixes.API_ROUTER_PREFIX)


@router.get("/order_items/{order_id}", response_model=list[OrderItemSchema])
async def get_order_items_by_order_id(
    order_id: int, session: AsyncSession = Depends(get_db)
):
    await validate_order_exists(order_id, session)

    result = await session.execute(
        select(OrderItem).where(OrderItem.order_id == order_id)
    )

    return result.scalars().all()
