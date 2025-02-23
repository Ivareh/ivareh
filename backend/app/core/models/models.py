import uuid

from sqlalchemy import (
    UUID,
    String,
)
from sqlalchemy.orm import Mapped, mapped_column

from app.core.models.database import Base


class Image(Base):
    __tablename__ = "images"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), default=uuid.uuid4, primary_key=True
    )
    category: Mapped[str] = mapped_column(String, nullable=False)
    url: Mapped[str] = mapped_column(String, nullable=False)
    title: Mapped[str | None] = mapped_column(String, unique=True)
