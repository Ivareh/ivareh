import uuid
from datetime import datetime

from sqlalchemy import UUID, DateTime, Integer, String
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
    width: Mapped[int] = mapped_column(Integer, nullable=False)
    height: Mapped[int] = mapped_column(Integer, nullable=False)
    captured_time: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )
