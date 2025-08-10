from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column

from constants import TableName
from database import Base


class Supplier(Base):
    __table_args__ = {"extend_existing": True}
    __tablename__ = TableName.SUPPLIERS.value

    id: Mapped[int] = mapped_column(
        Integer, primary_key=True, unique=True, autoincrement=True
    )
    name: Mapped[str] = mapped_column(String, primary_key=True, unique=True)
    contact_email: Mapped[str] = mapped_column(String, nullable=False)
