import os

services_dir = r"c:\Projects\scalable-ecommerce-platform\gateway\services"

port_map = {
    "5432": "postgres",
    "8000": "user-service",
    "8001": "product-service",
    "8002": "cart-service",
    "8003": "order-service",
    "8004": "payment-service",
    "8005": "notification-service"
}

for root, _, files in os.walk(services_dir):
    for file in files:
        if file == ".env":
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            for port, srv in port_map.items():
                content = content.replace(f"localhost:{port}", f"{srv}:{port}")
            
            with open(filepath, 'w') as f:
                f.write(content)
print("Done")
