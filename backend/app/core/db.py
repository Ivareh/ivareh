from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from app.core.config import settings

engine = create_async_engine(str(settings.SQLALCHEMY_DATABASE_URI))

session = async_sessionmaker(engine)
