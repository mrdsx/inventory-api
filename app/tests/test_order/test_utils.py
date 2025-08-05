import pytest
from typing import Sequence


from order.utils import get_order_items_total_cost
from order_item.schemas import OrderItemSchema


@pytest.mark.asyncio
async def test_get_order_items_total_cost():
    COST = 49.99
    QUANTITY = 95

    order_items = [
        OrderItemSchema(
            id=1,
            order_id=1,
            name="Test Order Item",
            description="",
            category="",
            cost=COST,
            quantity=QUANTITY,
        )
    ]

    total_cost = await get_order_items_total_cost(order_items)
    assert total_cost == COST * QUANTITY

    empty_order_items: Sequence[OrderItemSchema] = []
    total_cost = await get_order_items_total_cost(empty_order_items)
    assert total_cost == 0
