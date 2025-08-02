from sqlalchemy import Column, Integer, String

from database import Base


class DB_Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    contact_email = Column(String, nullable=False)
