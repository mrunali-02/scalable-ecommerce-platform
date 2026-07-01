from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.health import router as health_router
from app.config import settings
import httpx

app = FastAPI(
    title="API Gateway"
)

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)

# Route prefix mappings to service URLs
ROUTE_MAP = {
    "/auth": settings.USER_SERVICE,
    "/users": settings.USER_SERVICE,
    "/products": settings.PRODUCT_SERVICE,
    "/cart": settings.CART_SERVICE,
    "/orders": settings.ORDER_SERVICE,
    "/payments": settings.PAYMENT_SERVICE,
}

@app.get("/")
def root():
    return {
        "message": "API Gateway Running"
    }

@app.api_route("/{path_name:path}", methods=["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"])
async def route_proxy(request: Request, path_name: str):
    # Find matching target service URL based on path prefix
    target_service = None
    for prefix, service_url in ROUTE_MAP.items():
        if request.url.path.startswith(prefix):
            target_service = service_url
            break

    if not target_service:
        return JSONResponse(status_code=404, content={"message": "Path not found in API Gateway"})

    # Build the microservice URL
    url = f"{target_service}/{path_name}"
    if request.url.query:
        url += f"?{request.url.query}"

    body = await request.body()
    headers = dict(request.headers)
    
    # Remove host header to avoid target server host-matching mismatches
    headers.pop("host", None)

    try:
        async with httpx.AsyncClient() as client:
            resp = await client.request(
                method=request.method,
                url=url,
                content=body,
                headers=headers,
                timeout=30.0
            )
            
            # Form response with headers from microservice (stripping Content-Length to let server compute it)
            resp_headers = dict(resp.headers)
            resp_headers.pop("content-length", None)
            
            return Response(
                content=resp.content,
                status_code=resp.status_code,
                headers=resp_headers
            )
    except httpx.HTTPError as exc:
        return JSONResponse(
            status_code=502,
            content={"message": f"Service connection error: {str(exc)}"}
        )

