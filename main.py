from fastapi import FastAPI
from datetime import datetime
import uvicorn

app = FastAPI()


@app.get("/")
def root():
    return {
        "api": "Inventory API Backend",
        "status": "running",
        "timestamp": str(datetime.now()) + "Z",
    }


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=3000)
