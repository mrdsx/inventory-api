import pytest
from fastapi import HTTPException
from typing import Sequence


from order import (
    get_order_items_total_cost,
    handle_update_order_status,
    OrderStatuses,
)
from order_item import OrderItemSchema


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


def test_handle_update_order_status():
    with pytest.raises(HTTPException) as exc_info:
        handle_update_order_status(OrderStatuses.CANCELED)

    assert f"Can't update status of {OrderStatuses.CANCELED.lower()} order" in str(
        exc_info.value
    )

    with pytest.raises(HTTPException) as exc_info:
        handle_update_order_status(OrderStatuses.DELIVERED)

    assert f"Can't update status of {OrderStatuses.DELIVERED.lower()} order" in str(
        exc_info.value
    )
