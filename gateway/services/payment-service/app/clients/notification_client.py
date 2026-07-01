import httpx
from fastapi import HTTPException
from app.config import settings

def send_notification(
    user_id: int,
    subject: str,
    message: str,
    notification_type: str
):
    response = httpx.post(
        f"{settings.NOTIFICATION_SERVICE_URL}/notifications/send",
        json={
            "user_id": user_id,
            "type": notification_type,
            "subject": subject,
            "message": message
        }
    )

    if response.status_code != 200:
        raise HTTPException(
            status_code=500,
            detail="Notification Service unavailable"
        )
    return response.json()
