from fastapi import APIRouter

from app.api.routes import images, utils

api_router = APIRouter()
api_router.include_router(images.image_router)
api_router.include_router(utils.router)
