import pytest
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from unittest.mock import AsyncMock, MagicMock


from app.constants import OrderResponseMsg, OrderStatus
from app.models import Order, Supplier
from app.schemas import OrderItemSchema
from app.utils import (
    build_order_public_schema,
    format_date_from_iso_format,
    get_order_items_total_cost,
    handle_update_order_status,
)
from tests.constants import (
    MOCK_ORDER_DATE,
    MOCK_ORDER_ID,
    MOCK_ORDER_ITEM_COST,
    MOCK_ORDER_ITEM_ID,
    MOCK_ORDER_ITEM_QUANTITY,
)


@pytest.mark.asyncio
async def test_build_order_public_schema():
    mock_session = AsyncMock(spec=AsyncSession)

    mock_order = Order(
        id=MOCK_ORDER_ID, date=MOCK_ORDER_DATE, status=OrderStatus.IN_TRANSIT
    )
    mock_supplier = Supplier(name="Test Supplier")

    mock_result = MagicMock()
    mock_result.scalars.all.return_value = []
    mock_session.execute.return_value = mock_result

    order_public_schema = await build_order_public_schema(
        mock_order, mock_supplier, mock_session
    )

    assert order_public_schema.id == mock_order.id
    assert order_public_schema.supplier_name == mock_supplier.name
    assert order_public_schema.date == format_date_from_iso_format(MOCK_ORDER_DATE)
    assert order_public_schema.status == OrderStatus.IN_TRANSIT


@pytest.mark.asyncio
async def test_get_order_items_total_cost():
    order_items = [
        OrderItemSchema(
            id=MOCK_ORDER_ITEM_ID,
            order_id=MOCK_ORDER_ID,
            name="Test Order Item",
            description="",
            category="",
            cost=MOCK_ORDER_ITEM_COST,
            quantity=MOCK_ORDER_ITEM_QUANTITY,
        )
    ]

    total_cost = await get_order_items_total_cost(order_items)
    assert total_cost == MOCK_ORDER_ITEM_COST * MOCK_ORDER_ITEM_QUANTITY

    total_cost = await get_order_items_total_cost([])
    assert total_cost == 0


def test_handle_update_order_status():
    with pytest.raises(HTTPException) as exc_info:
        handle_update_order_status(OrderStatus.CANCELED)

    assert OrderResponseMsg.canceled_order_status_not_updated in exc_info.value.detail

    with pytest.raises(HTTPException) as exc_info:
        handle_update_order_status(OrderStatus.DELIVERED)

    assert OrderResponseMsg.delivered_order_status_not_updated in exc_info.value.detail
