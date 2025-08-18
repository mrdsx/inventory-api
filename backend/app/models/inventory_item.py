from pydantic import NonNegativeFloat
from sqlalchemy import Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from constants import (
    INVENTORY_ITEM_DESCRIPTION_LENGTH,
    INVENTORY_ITEM_SKU_LENGTH,
    TableName,
)
from database import Base


class Product(Base):
    __table_args__ = {"extend_existing": True}
    __tablename__ = TableName.PRODUCTS.value

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, unique=True, autoincrement=True
    )
    sku: Mapped[str] = mapped_column(
        String(INVENTORY_ITEM_SKU_LENGTH), primary_key=True, unique=True
    )
    order_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableName.ORDERS.value}.id"), nullable=False
    )
    supplier_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableName.SUPPLIERS.value}.id"), nullable=False
    )
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(
        String(INVENTORY_ITEM_DESCRIPTION_LENGTH), nullable=False
    )
    category: Mapped[str] = mapped_column(String, nullable=False)
    cost: Mapped[NonNegativeFloat] = mapped_column(Float, nullable=False)
    price: Mapped[NonNegativeFloat] = mapped_column(Float, nullable=False)
