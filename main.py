from datetime import datetime
import uvicorn
from fastapi import FastAPI

from supplier.routes import router as router_suppliers


app = FastAPI()


@app.get("/")
def root():
    return {
        "api": "Inventory API Backend",
        "status": "running",
        "timestamp": str(datetime.now()) + "Z",
    }


app.include_router(router_suppliers)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=3000)
