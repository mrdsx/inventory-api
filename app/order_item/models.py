from pydantic import NonNegativeFloat
from sqlalchemy import Float, ForeignKey, Integer, String
from database import Base
from sqlalchemy.orm import Mapped, mapped_column


# TODO: EXTRACT 1000 from OrderItem and Product into constant
class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    order_id: Mapped[int] = mapped_column(
        Integer, ForeignKey("orders.id", ondelete="CASCADE"), nullable=False
    )
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String(1000), nullable=False)
    category: Mapped[str] = mapped_column(String, nullable=False)
    cost: Mapped[NonNegativeFloat] = mapped_column(Float, nullable=False)
    quantity: Mapped[int] = mapped_column(Integer, nullable=False)
