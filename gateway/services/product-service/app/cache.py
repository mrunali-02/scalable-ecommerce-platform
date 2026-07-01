import json
import redis

from app.config import settings

redis_client = redis.Redis.from_url(
    settings.REDIS_URL,
    decode_responses=True
)


def get_cache(key: str):
    data = redis_client.get(key)
    if data:
        return json.loads(data)
    return None


def set_cache(
    key: str,
    value,
    expiration: int = 300
):
    redis_client.setex(
        key,
        expiration,
        json.dumps(value)
    )


def delete_cache(key: str):
    redis_client.delete(key)
