from datetime import datetime
from sqlalchemy import DateTime, Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from constants import OrderStatus, TableName
from database import Base


class Order(Base):
    __table_args__ = {"extend_existing": True}
    __tablename__ = TableName.ORDERS.value

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    date: Mapped[datetime] = mapped_column(
        DateTime, nullable=False, default=datetime.now()
    )
    status: Mapped[str] = mapped_column(
        String, nullable=False, default=OrderStatus.IN_TRANSIT
    )
