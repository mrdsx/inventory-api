from datetime import datetime
from sqlalchemy import ForeignKey, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column

from database import Base
from .constants import OrderStatus


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    supplier_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("suppliers.id"),
        nullable=False,
    )
    date: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=datetime.now()
    )
    status: Mapped[str] = mapped_column(nullable=False, default=OrderStatus.IN_TRANSIT)
