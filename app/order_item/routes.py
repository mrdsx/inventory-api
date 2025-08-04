from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

import prefixes
from database import get_db
from order.validation import validate_order_exists
from .schemas import OrderItemSchema
from .services import find_order_items_by_order_id

router = APIRouter(prefix=prefixes.API_ROUTER_PREFIX)


@router.get("/order_items/{order_id}", response_model=list[OrderItemSchema])
async def get_order_items_by_order_id(
    order_id: int, session: AsyncSession = Depends(get_db)
):
    await validate_order_exists(order_id, session)
    order_items = await find_order_items_by_order_id(order_id, session)

    return order_items
