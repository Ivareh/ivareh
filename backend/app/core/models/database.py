from sqlalchemy.ext.asyncio import AsyncAttrs, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings

engine = create_async_engine(str(settings.SQLALCHEMY_DATABASE_URI))

SessionLocal = async_sessionmaker(
    autocommit=False, autoflush=False, bind=engine, autobegin=False
)


class Base(AsyncAttrs, DeclarativeBase):
    pass
