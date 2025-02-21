from fastcrud import crud_router

from app.api.deps import get_db
from app.core.models.models import Image as model_Image
from app.core.schemas.image import (
    ImageCreate,
    ImageUpdate,
)

router = crud_router(
    session=get_db,
    model=model_Image,
    create_schema=ImageCreate,
    update_schema=ImageUpdate,
    path="/images",
    tags=["images"],
)
