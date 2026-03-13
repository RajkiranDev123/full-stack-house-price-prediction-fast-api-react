from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import prediction_router

# routers is the name of a folder in your project that acts as a Python package (or namespace, if no __init__.py).
# It contains your route modules, like prediction_router.py
# A namespace package is a folder without __init__.py, introduced in Python 3.3+.
# prediction_router.py is the module (the .py file)

app = FastAPI()  # Creates your main FastAPI application instance.

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],  # Any website can call your API. ✅ Good for dev, ❌ not recommended in production.
    allow_credentials=True,  # Allows cookies/auth headers.
    allow_methods=["*"],  # All HTTP methods (GET, POST, PUT, DELETE).
    allow_headers=["*"],  # All request headers are allowed.
)

app.include_router(
    prediction_router.router
)  # “Take all the routes from this APIRouter object and add them to the main app.”
