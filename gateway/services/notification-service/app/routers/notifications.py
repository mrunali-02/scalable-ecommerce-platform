from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas import (
    NotificationCreate,
    NotificationResponse
)
from app.services.notification_service import (
    NotificationService
)

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)

@router.post(
    "/send",
    response_model=NotificationResponse
)
def send_notification(
    notification: NotificationCreate,
    db: Session = Depends(get_db)
):
    service = NotificationService(db)
    return service.send(
        notification
    )
