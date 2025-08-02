from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from models.suppliers import Base

DATABASE_URL = "sqlite:///app/db/notes/notes.db"
engine = create_engine(DATABASE_URL)

Base.metadata.create_all(engine)

Session = sessionmaker(engine)
session = Session()


async def save_supplier():
    pass
