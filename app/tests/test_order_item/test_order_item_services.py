import pytest
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from unittest.mock import AsyncMock, MagicMock

from order import Order
from order_item import (
    find_order_item_by_id,
    OrderItem,
    OrderItemPayload,
    ResponseMsg,
    save_order_items,
)
from tests.constants import (
    MOCK_ORDER_ID,
    MOCK_ORDER_ITEM_COST,
    MOCK_ORDER_ITEM_ID,
    MOCK_ORDER_ITEM_QUANTITY,
)


@pytest.mark.asyncio
async def test_find_order_item_by_id():
    mock_session = AsyncMock(spec=AsyncSession)

    # ! Test for error
    mock_result = MagicMock()
    mock_result.scalar.return_value = None
    mock_session.execute.return_value = mock_result

    with pytest.raises(HTTPException) as exc_info:
        await find_order_item_by_id(MOCK_ORDER_ITEM_ID, MOCK_ORDER_ID, mock_session)

    assert exc_info.value.status_code == status.HTTP_404_NOT_FOUND
    assert ResponseMsg.order_item_not_found in exc_info.value.detail

    # * Test for success
    mock_result.scalar.return_value = OrderItem(id=MOCK_ORDER_ITEM_ID)
    order_item = await find_order_item_by_id(
        MOCK_ORDER_ITEM_ID, MOCK_ORDER_ID, mock_session
    )
    assert isinstance(order_item, OrderItem)
    assert order_item.id == MOCK_ORDER_ITEM_ID


@pytest.mark.asyncio
async def test_save_order_items():
    mock_session = AsyncMock(spec=AsyncSession)

    mock_order = Order(id=MOCK_ORDER_ID)
    mock_order_items = [
        OrderItemPayload(
            name="Order Item",
            description="",
            category="",
            cost=MOCK_ORDER_ITEM_COST,
            quantity=MOCK_ORDER_ITEM_QUANTITY,
        )
    ]

    await save_order_items(mock_order, mock_order_items, mock_session)
