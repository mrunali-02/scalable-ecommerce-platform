import httpx

async def proxy_request(
    url,
    method,
    body=None,
    headers=None
):
    async with httpx.AsyncClient() as client:
        response = await client.request(
            method,
            url,
            json=body,
            headers=headers
        )
        return response
