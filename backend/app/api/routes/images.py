from typing import Any

from fastapi import Depends, HTTPException
from fastcrud import FastCRUD, crud_router
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.core.models.models import Image as model_Image
from app.core.schemas.image import (
    ImageCreate,
    ImagePublic,
    ImageUpdate,
)

image_crud = FastCRUD(model_Image)

router = crud_router(
    session=get_db,
    model=model_Image,
    create_schema=ImageCreate,
    update_schema=ImageUpdate,
    crud=image_crud,
    path="/images",
    tags=["images"],
    included_methods=["create", "read", "read_multi", "update", "delete"],
    endpoint_names={
        "create": "",
        "read": "",
        "update": "",
        "delete": "",
        "db_delete": "",
        "read_multi": "",
        "read_paginated": "",
    },
)


@router.post(
    "/upsert_multi_images", response_model=list[ImagePublic] | None, tags=["images"]
)
async def upsert_multiple_images(
    images: list[ImageCreate], db: AsyncSession = Depends(get_db)
) -> dict[str, Any] | None:
    """Upsert multiple images at once"""
    try:
        imgs = await image_crud.upsert_multi(
            db=db,
            instances=images,
            schema_to_select=ImagePublic,
            return_as_model=True,
        )
        if not imgs:
            raise ValueError("No images provided")
        return imgs["data"]
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error processing images: {e}"
        ) from e
