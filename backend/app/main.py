import uvicorn
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import router_orders, router_inventory_items, router_suppliers


app = FastAPI(
    title="Inventory API",
    description="A backend API for managing product inventory, suppliers, and stock levels.",
)

origins = ["http://localhost:3000", "localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "api": "Inventory API Backend",
        "status": "running",
        "timestamp": str(datetime.now()) + "Z",
    }


app.include_router(router_orders)
app.include_router(router_inventory_items)
app.include_router(router_suppliers)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=3000)
