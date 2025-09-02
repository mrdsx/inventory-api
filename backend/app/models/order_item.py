from pydantic import NonNegativeFloat
from sqlalchemy import Float, ForeignKey, Integer, String
from database import Base
from sqlalchemy.orm import Mapped, mapped_column

from constants import ORDER_ITEM_DESCRIPTION_LENGTH, TableName


class OrderItem(Base):
    __table_args__ = {"extend_existing": True}
    __tablename__ = TableName.ORDER_ITEMS.value

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey(f"{TableName.ORDERS.value}.id", ondelete="CASCADE"),
        nullable=False,
    )
    supplier_id: Mapped[int] = mapped_column(
        Integer, ForeignKey(f"{TableName.SUPPLIERS.value}.id"), nullable=False
    )
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(
        String(ORDER_ITEM_DESCRIPTION_LENGTH), nullable=False
    )
    category: Mapped[str] = mapped_column(String, nullable=False)
    cost: Mapped[NonNegativeFloat] = mapped_column(Float, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
