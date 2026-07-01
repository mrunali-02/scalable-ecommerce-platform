import json
import pika

from app.config import settings

_connection = None
_channel = None

def get_channel():
    global _connection, _channel
    if _connection is None or _connection.is_closed or _channel is None or _channel.is_closed:
        _connection = pika.BlockingConnection(
            pika.URLParameters(
                settings.RABBITMQ_URL
            )
        )
        _channel = _connection.channel()
        _channel.queue_declare(
            queue="notifications"
        )
    return _channel

def publish(
    message
):
    channel = get_channel()
    channel.basic_publish(
        exchange="",
        routing_key="notifications",
        body=json.dumps(message)
    )
