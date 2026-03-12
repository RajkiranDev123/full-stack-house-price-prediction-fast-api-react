


import pickle
import pandas as pd

with open("models/linear_regression_model.pkl", "rb") as f:
    model = pickle.load(f)

def predict_price(data):
    df = pd.DataFrame([data.dict()])

    # fix column name to match training
    df.rename(columns={
        "furnishingstatus_semi_furnished": "furnishingstatus_semi-furnished"
    }, inplace=True)

    prediction = model.predict(df)

    return {"predicted_price": float(prediction[0])}