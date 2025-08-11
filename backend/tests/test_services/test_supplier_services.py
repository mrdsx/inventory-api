import pytest
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from unittest.mock import AsyncMock, MagicMock

from app.constants import SupplierResponseMsg
from app.models import Supplier
from app.services import find_supplier_by_id, find_supplier_by_name
from tests.constants import (
    EXISTING_SUPPLIER_ID,
    EXISTING_SUPPLIER_NAME,
    NOT_EXISTING_SUPPLIER_ID,
    NOT_EXISTING_SUPPLIER_NAME,
)


@pytest.mark.asyncio
async def test_find_supplier_by_id():
    mock_session = AsyncMock(spec=AsyncSession)

    # ! Test for error
    mock_result = MagicMock()
    mock_result.scalar.return_value = None
    mock_session.execute.return_value = mock_result

    with pytest.raises(HTTPException) as exc_info:
        await find_supplier_by_id(NOT_EXISTING_SUPPLIER_ID, mock_session)

    assert exc_info.value.status_code == status.HTTP_404_NOT_FOUND
    assert SupplierResponseMsg.supplier_not_found in exc_info.value.detail

    # * Test for success
    mock_result.scalar.return_value = Supplier(id=EXISTING_SUPPLIER_ID)
    db_supplier = await find_supplier_by_id(EXISTING_SUPPLIER_ID, mock_session)

    assert isinstance(db_supplier, Supplier)
    assert db_supplier.id == EXISTING_SUPPLIER_ID


@pytest.mark.asyncio
async def test_find_supplier_by_name():
    mock_session = AsyncMock(spec=AsyncSession)

    # ! Test for error
    mock_result = MagicMock()
    mock_result.scalar.return_value = None
    mock_session.execute.return_value = mock_result

    with pytest.raises(HTTPException) as exc_info:
        await find_supplier_by_name(NOT_EXISTING_SUPPLIER_NAME, mock_session)

    assert exc_info.value.status_code == status.HTTP_404_NOT_FOUND
    assert SupplierResponseMsg.supplier_not_found in exc_info.value.detail

    # * Test for success
    mock_result.scalar.return_value = Supplier(id=EXISTING_SUPPLIER_NAME)
    db_supplier = await find_supplier_by_name(EXISTING_SUPPLIER_NAME, mock_session)

    assert isinstance(db_supplier, Supplier)
    assert db_supplier.id == EXISTING_SUPPLIER_NAME
