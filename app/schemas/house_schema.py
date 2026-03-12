from pydantic import BaseModel

class HouseFeatures(BaseModel):
    area: int
    bedrooms: int
    bathrooms: int
    stories: int
    parking: int
    mainroad_yes: int
    guestroom_yes: int
    basement_yes: int
    hotwaterheating_yes: int
    airconditioning_yes: int
    prefarea_yes: int
    furnishingstatus_semi_furnished: int
    furnishingstatus_unfurnished: int