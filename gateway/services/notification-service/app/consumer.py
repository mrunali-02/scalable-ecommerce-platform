import json
import pika

from sqlalchemy.orm import Session

from app.config import settings
from app.database import SessionLocal

from app.schemas import NotificationCreate
from app.services.notification_service import NotificationService


def callback(ch, method, properties, body):

    data = json.loads(body)

    db: Session = SessionLocal()

    try:

        notification = NotificationCreate(
            user_id=data["user_id"],
            type=data["type"],
            subject=data["subject"],
            message=data["message"]
        )

        service = NotificationService(db)

        service.send(notification)

        ch.basic_ack(
            delivery_tag=method.delivery_tag
        )

    except Exception as e:

        print(e)

    finally:

        db.close()


import time

def start_consumer():
    print("Waiting for RabbitMQ to start...")
    while True:
        try:
            connection = pika.BlockingConnection(
                pika.URLParameters(
                    settings.RABBITMQ_URL
                )
            )
            break
        except pika.exceptions.AMQPConnectionError:
            print("RabbitMQ connection failed. Retrying in 5 seconds...")
            time.sleep(5)

    channel = connection.channel()

    channel.queue_declare(
        queue="notifications"
    )

    channel.basic_consume(

        queue="notifications",

        on_message_callback=callback

    )

    print()

    print("=" * 60)

    print("RabbitMQ Consumer Started...")

    print("=" * 60)

    print()

    channel.start_consuming()
