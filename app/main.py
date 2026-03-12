from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import prediction_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router.router)