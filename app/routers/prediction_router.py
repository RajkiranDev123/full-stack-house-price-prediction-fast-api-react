from fastapi import APIRouter
from schemas.house_schema import HouseFeatures
from services import prediction_service

router = APIRouter(prefix="/predict")

@router.post("/")
def predict(data: HouseFeatures):
    return prediction_service.predict_price(data)