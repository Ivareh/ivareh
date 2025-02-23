from collections.abc import AsyncGenerator
from typing import Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import session


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with session() as s:
        yield s


SessionDep = Annotated[AsyncSession, Depends(get_db)]
