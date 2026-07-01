from app import models

def create_notification(
    db,
    notification
):
    item = models.Notification(
        user_id=notification.user_id,
        type=notification.type,
        subject=notification.subject,
        message=notification.message,
        status="PENDING"
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item

def mark_as_sent(
    db,
    notification
):
    notification.status = "SENT"
    db.commit()
    db.refresh(notification)
    return notification
