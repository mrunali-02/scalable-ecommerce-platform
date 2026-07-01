from datetime import datetime
from pydantic import BaseModel

class NotificationCreate(BaseModel):
    user_id: int
    type: str
    subject: str
    message: str

class NotificationResponse(BaseModel):
    id: int
    user_id: int
    type: str
    subject: str
    message: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
