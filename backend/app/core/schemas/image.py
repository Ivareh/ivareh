import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict


# Shared properties
class _BaseImage(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    title: str | None = None
    category: str
    url: str
    width: int
    height: int
    captured_time: datetime


class ImageCreate(_BaseImage):
    pass


class ImageUpdate(_BaseImage):
    pass


class ImagePublic(_BaseImage):
    id: uuid.UUID
