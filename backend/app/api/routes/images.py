from typing import Annotated

from fastapi import Depends, HTTPException, Query
from fastcrud import FastCRUD, crud_router
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db
from app.core.models.models import Image as model_Image
from app.core.schemas.api import FilterParams
from app.core.schemas.image import (
    ImageCreate,
    ImagePublic,
    ImageUpdate,
)
from app.exceptions import DBObjAlreadyExistsError, IvarehAPIError

image_crud = FastCRUD(model_Image)

router = crud_router(
    session=get_db,
    model=model_Image,
    create_schema=ImageCreate,
    update_schema=ImageUpdate,
    crud=image_crud,
    path="/images",
    tags=["images"],
    included_methods=["create", "read", "update", "delete"],
    endpoint_names={
        "create": "",
        "read": "",
        "update": "",
        "delete": "",
    },
)


@router.post(
    "/upsert_multi_images", response_model=list[ImagePublic] | None, tags=["images"]
)
async def upsert_multiple_images(
    images: list[ImageCreate], db: AsyncSession = Depends(get_db)
) -> list[ImagePublic] | None:
    """Upsert multiple images at once"""
    try:
        imgs = await image_crud.upsert_multi(
            db=db,
            instances=images,
            schema_to_select=ImagePublic,
            return_as_model=True,
            commit=True,
        )
        if imgs is None:
            raise HTTPException(status_code=422, detail="No images provided")
        return imgs["data"]
    except Exception as e:
        reason = str(e.args[0])
        if "duplicate key value violates unique constraint" in reason:
            raise DBObjAlreadyExistsError(
                model_table_name="images", function_name=upsert_multiple_images.__name__
            )
        else:
            raise IvarehAPIError(detail=reason)


@router.get(
    "/get_multi_images", response_model=list[ImagePublic] | None, tags=["images"]
)
async def get_multi_images(
    filter_params: Annotated[FilterParams, Query()], db: AsyncSession = Depends(get_db)
) -> list[ImagePublic] | None:
    """Read multiple images at once"""
    try:
        imgs = await image_crud.get_multi(
            db,
            offset=filter_params.offset,
            limit=filter_params.limit,
            sort_columns=filter_params.sort_columns,
            sort_orders=filter_params.sort_orders,
            schema_to_select=ImagePublic,
            return_as_model=True,
        )

        return imgs["data"]  # type: ignore

    except Exception as e:
        reason = str(e.args[0])
        if "duplicate key value violates unique constraint" in reason:
            raise DBObjAlreadyExistsError(
                model_table_name="images", function_name=upsert_multiple_images.__name__
            )
        else:
            raise IvarehAPIError(detail=reason)
