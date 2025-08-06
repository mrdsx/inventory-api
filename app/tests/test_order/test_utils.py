import pytest
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from unittest.mock import AsyncMock, MagicMock


from order import (
    build_order_public_schema,
    get_order_items_total_cost,
    handle_update_order_status,
    Order,
    OrderPublicSchema,
    OrderStatus,
)
from order_item import OrderItemSchema
from supplier import Supplier
from tests.test_order.constants import (
    MOCK_ORDER_DATE,
    MOCK_ORDER_ID,
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

    assert isinstance(order_public_schema, OrderPublicSchema)
    assert order_public_schema.id == mock_order.id
    assert order_public_schema.supplier_name == mock_supplier.name
    assert order_public_schema.date == MOCK_ORDER_DATE
    assert order_public_schema.status == OrderStatus.IN_TRANSIT


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

    total_cost = await get_order_items_total_cost([])
    assert total_cost == 0


def test_handle_update_order_status():
    with pytest.raises(HTTPException) as exc_info:
        handle_update_order_status(OrderStatus.CANCELED)

    assert (
        f"Can't update status of {OrderStatus.CANCELED.lower()} order"
        in exc_info.value.detail
    )

    with pytest.raises(HTTPException) as exc_info:
        handle_update_order_status(OrderStatus.DELIVERED)

    assert (
        f"Can't update status of {OrderStatus.DELIVERED.lower()} order"
        in exc_info.value.detail
    )
