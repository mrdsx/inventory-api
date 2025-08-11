import uvicorn
from datetime import datetime
from fastapi import FastAPI

from routes import router_orders, router_products, router_suppliers


app = FastAPI(
    title="Inventory API",
    description="A backend API for managing product inventory, suppliers, and stock levels.",
)


@app.get("/")
def root():
    return {
        "api": "Inventory API Backend",
        "status": "running",
        "timestamp": str(datetime.now()) + "Z",
    }


app.include_router(router_orders)
app.include_router(router_products)
app.include_router(router_suppliers)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=3000)
