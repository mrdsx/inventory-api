from fastapi import FastAPI
from datetime import datetime
import uvicorn

from routes.suppliers import router as suppliers_router

app = FastAPI()


@app.get("/")
def root():
    return {
        "api": "Inventory API Backend",
        "status": "running",
        "timestamp": str(datetime.now()) + "Z",
    }


app.include_router(suppliers_router)


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=3000)
