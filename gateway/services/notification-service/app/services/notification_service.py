from app import crud

class NotificationService:
    def __init__(self, db):
        self.db = db

    def send(
        self,
        notification
    ):
        saved = crud.create_notification(
            self.db,
            notification
        )
        print()
        print("=" * 50)
        print("EMAIL SENT")
        print()
        print(saved.subject)
        print()
        print(saved.message)
        print("=" * 50)
        print()
        
        crud.mark_as_sent(
            self.db,
            saved
        )
        return saved
