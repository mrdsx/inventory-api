import pytest
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from unittest.mock import AsyncMock, MagicMock

from app.constants import ProductResponse
from app.models import Order, OrderItem, Product
from app.services import find_product_by_id, save_products
from tests.constants import (
    EXISTING_PRODUCT_ID,
    MOCK_ORDER_ID,
    MOCK_ORDER_ITEM_COST,
    MOCK_ORDER_ITEM_QUANTITY,
    MOCK_SUPPLIER_ID,
    NOT_EXISTING_PRODUCT_ID,
)


@pytest.mark.asyncio
async def test_find_product_by_id():
    mock_session = AsyncMock(spec=AsyncSession)

    # ! Test for error
    mock_result = MagicMock()
    mock_result.scalar.return_value = None
    mock_session.execute.return_value = mock_result

    with pytest.raises(HTTPException) as exc_info:
        await find_product_by_id(NOT_EXISTING_PRODUCT_ID, mock_session)

    assert exc_info.value.status_code == status.HTTP_404_NOT_FOUND
    assert ProductResponse.product_not_found in exc_info.value.detail

    # * Test for success
    mock_result.scalar.return_value = Product(id=EXISTING_PRODUCT_ID)
    db_product = await find_product_by_id(EXISTING_PRODUCT_ID, mock_session)

    assert isinstance(db_product, Product)
    assert db_product.id == EXISTING_PRODUCT_ID


@pytest.mark.asyncio
async def test_save_products():
    mock_session = AsyncMock(spec=AsyncSession)

    mock_order = Order(id=MOCK_ORDER_ID, supplier_id=MOCK_SUPPLIER_ID)
    mock_order_items = [
        OrderItem(
            name="Order Item Name",
            description="",
            category="",
            cost=MOCK_ORDER_ITEM_COST,
            quantity=MOCK_ORDER_ITEM_QUANTITY,
        )
    ]

    await save_products(mock_order, mock_order_items, mock_session)

    mock_session.commit.assert_awaited_once()
    mock_session.refresh.assert_awaited_once_with(mock_order)
