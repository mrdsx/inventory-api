from pydantic import NonNegativeFloat
from sqlalchemy import Float, ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class Product(Base):
    __table_args__ = {"extend_existing": True}
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, unique=True, autoincrement=True
    )
    sku: Mapped[str] = mapped_column(String(30), primary_key=True, unique=True)
    order_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("orders.id"), nullable=False
    )
    supplier_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("suppliers.id"), nullable=False
    )
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String(1000), nullable=False)
    category: Mapped[str] = mapped_column(String, nullable=False)
    cost: Mapped[NonNegativeFloat] = mapped_column(Float, nullable=False)
    price: Mapped[NonNegativeFloat] = mapped_column(Float, nullable=False)
