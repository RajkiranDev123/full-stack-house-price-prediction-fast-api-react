from fastapi import APIRouter
from schemas.house_schema import HouseFeatures
from services import prediction_service

router = APIRouter(prefix="/predict")  # router is the instance/object of APIRouter.
# Creates a router with a URL prefix /predict.
# Any route you add to this router will be relative to /predict.
# @router.post("/") → /predict/  # @router.get("/status") → /predict/status


@router.post("/")
def predict(data: HouseFeatures):
    return prediction_service.predict_price(data)


# router : container for multiple Route objects
# route  : single endpoint with path, HTTP method, handler function, etc.


# @router.post("/")
# def predict(data: HouseFeatures):
#     return prediction_service.predict_price(data)

# This entire function + decorator defines one route.
