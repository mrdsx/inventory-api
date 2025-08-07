import uvicorn
from datetime import datetime
from fastapi import FastAPI

from order import router_orders
from product import router_products
from supplier import router_suppliers


app = FastAPI()


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
