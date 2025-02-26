from datetime import datetime, timedelta, timezone

from azure.storage.blob import ContainerSasPermissions, generate_container_sas
from fastapi import APIRouter

from app.core.config import settings

router = APIRouter(prefix="/utils", tags=["utils"])


@router.get("/health-check/")
async def health_check() -> bool:
    return True


@router.get("/container-sas-token/")
async def get_container_sas() -> str:
    return generate_container_sas(
        account_name=settings.AZURITE_ACCOUNT_NAME,
        container_name="images",
        account_key=settings.AZURITE_ACCOUNT_KEY,
        permission=ContainerSasPermissions(read=True),
        expiry=datetime.now(timezone.utc) + timedelta(hours=1),
    )
