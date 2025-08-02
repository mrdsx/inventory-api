from sqlalchemy.orm import Mapped, mapped_column

from database import Base


class DB_Supplier(Base):
    __tablename__ = "suppliers"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(nullable=False)
    contact_email: Mapped[str] = mapped_column(nullable=False)
