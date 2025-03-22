from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# Load the saved model and preprocessing objects
model = joblib.load('xgb_model2.pkl')
pca = joblib.load('pca2.pkl')
scaler = joblib.load('scaler2.pkl')
label_encoders = joblib.load('label_encoder2.pkl')

# Preprocessing function
def preprocess_input(data):
    df = pd.DataFrame([data])
    
    # Encode categorical features
    for col, le in label_encoders.items():
        if col in df.columns:
            df[col] = le.transform(df[col])

    # Normalize numerical features
    numerical_cols = df.select_dtypes(include=['int64', 'float64']).columns
    df[numerical_cols] = scaler.transform(df[numerical_cols])

    # Apply PCA
    data_pca = pca.transform(df)
    
    return data_pca

@app.route('/')
def home():
    return "ML API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("\ndata from cara is:",data)
        input_data = data['input_features']
        print("\nReceived input data:", input_data)
        

        # Preprocess input
        processed_data = preprocess_input(input_data)

        # Get probabilities for all classes
        probabilities = model.predict_proba(processed_data)[0]

        # Get top N predictions
        top_n = int(data.get('top_n', 3))
        sorted_indices = np.argsort(probabilities)[::-1][:top_n]
        top_predictions = label_encoders['Suggested Job Role'].inverse_transform(sorted_indices)
        top_probabilities = probabilities[sorted_indices].round(3).tolist()

        response = {
            'predicted_roles': top_predictions.tolist(),
            'probabilities': top_probabilities
        }

        return jsonify(response)

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(host='0.0.0.0', port=5001, debug=True)
