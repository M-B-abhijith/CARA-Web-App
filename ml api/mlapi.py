from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib
import pandas as pd
from collections import OrderedDict
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:3000"}})

# Load the saved model and preprocessing objects
model = joblib.load('xgb_model2.pkl')
pca = joblib.load('pca2.pkl')
scaler = joblib.load('scaler2.pkl')
label_encoder_target = joblib.load('label_encoder2.pkl')  # LabelEncoder for target

# Define dataset columns (initial order from training CSV)
dataset_columns = [
    "Acedamic percentage in Operating Systems", "percentage in Algorithms", "Percentage in Programming Concepts",
    "Percentage in Software Engineering", "Percentage in Computer Networks", "Percentage in Electronics Subjects",
    "Percentage in Computer Architecture", "Percentage in Mathematics", "Percentage in Communication skills",
    "Hours working per day", "Logical quotient rating", "hackathons", "coding skills rating",
    "public speaking points", "can work long time before system?", "self-learning capability?",
    "Extra-courses did", "certifications", "workshops", "talenttests taken?", "olympiads",
    "reading and writing skills", "memory capability score", "Interested subjects",
    "interested career area ", "Job/Higher Studies?", "Type of company want to settle in?",
    "Taken inputs from seniors or elders", "interested in games", "Interested Type of Books",
    "Salary Range Expected", "In a Realtionship?", "Gentle or Tuff behaviour?",
    "Management or Technical", "Salary/work", "hard/smart worker", "worked in teams ever?",
    "Introvert"
]

default_values = {
    "Acedamic percentage in Operating Systems": 69, "percentage in Algorithms": 63,
    "Percentage in Programming Concepts": 78, "Percentage in Software Engineering": 87,
    "Percentage in Computer Networks": 94, "Percentage in Electronics Subjects": 94,
    "Percentage in Computer Architecture": 87, "Percentage in Mathematics": 84,
    "Percentage in Communication skills": 61, "Hours working per day": 9,
    "Logical quotient rating": 4, "hackathons": 0, "coding skills rating": 4,
    "public speaking points": 8, "can work long time before system?": "yes",
    "self-learning capability?": "yes", "Extra-courses did": "yes",
    "certifications": "shell programming", "workshops": "cloud computing",
    "talenttests taken?": "no", "olympiads": "yes", "reading and writing skills": "excellent",
    "memory capability score": "excellent", "Interested subjects": "cloud computing",
    "interested career area ": "system developer", "Job/Higher Studies?": "higherstudies",
    "Type of company want to settle in?": "Web Services",
    "Taken inputs from seniors or elders": "no", "interested in games": "no",
    "Interested Type of Books": "Prayer books", "Salary Range Expected": "salary",
    "In a Realtionship?": "no", "Gentle or Tuff behaviour?": "stubborn",
    "Management or Technical": "Management", "Salary/work": "salary",
    "hard/smart worker": "hard worker", "worked in teams ever?": "yes",
    "Introvert": "no"
}

# Map shorthand input keys to full column names
input_key_mapping = {
    'os': 'Acedamic percentage in Operating Systems',
    'algo': 'percentage in Algorithms',
    'prog': 'Percentage in Programming Concepts',
    'se': 'Percentage in Software Engineering',
    'cn': 'Percentage in Computer Networks',
    'es': 'Percentage in Electronics Subjects',
    'ca': 'Percentage in Computer Architecture',
    'math': 'Percentage in Mathematics',
    'comm': 'Percentage in Communication skills',
    'Can_work_long_time_before_system?': 'can work long time before system?',
    'Self-learning_capability?': 'self-learning capability?',
    'Extra-courses_did': 'Extra-courses did',
    'Certifications': 'certifications',
    'Workshops': 'workshops',
    'Talenttests_taken?': 'talenttests taken?',
    'Olympiads': 'olympiads',
    'Reading_and_writing_skills': 'reading and writing skills',
    'Memory_capability_score': 'memory capability score',
    'Interested_subjects': 'Interested subjects',
    'Interested_career_area': 'interested career area ',
    'Job/Higher_Studies?': 'Job/Higher Studies?',
    'Type_of_company_want_to_settle_in?': 'Type of company want to settle in?',
    'Taken_inputs_from_seniors_or_elders': 'Taken inputs from seniors or elders',
    'Interested_in_games': 'interested in games',
    'Interested_Type_of_Books': 'Interested Type of Books',
    'Salary_Range_Expected': 'Salary Range Expected',
    'In_a_Relationship?': 'In a Realtionship?',
    'Gentle_or_Tuff_behaviour?': 'Gentle or Tuff behaviour?',
    'Management_or_Technical': 'Management or Technical',
    'Salary/work': 'Salary/work',
    'Hard/smart_worker': 'hard/smart worker',
    'Worked_in_teams_ever?': 'worked in teams ever?',
    'Introvert': 'Introvert'
}

def preprocess_input(data):
    print("Inside preprocess_input function")
    
    # Map the input data keys to the dataset column names
    mapped_data = {}
    for input_key, col_name in input_key_mapping.items():
        if input_key in data:
            mapped_data[col_name] = data[input_key]
    
    # Fill missing values with defaults, maintain order
    complete_data = OrderedDict((col, mapped_data.get(col, default_values[col])) for col in dataset_columns)

    print("The complete data is:", complete_data)

    # Convert to DataFrame
    df = pd.DataFrame([complete_data], columns=dataset_columns)

    # Convert numerical columns to numeric type explicitly
    numerical_cols = [
        "Acedamic percentage in Operating Systems", "percentage in Algorithms", "Percentage in Programming Concepts",
        "Percentage in Software Engineering", "Percentage in Computer Networks", "Percentage in Electronics Subjects",
        "Percentage in Computer Architecture", "Percentage in Mathematics", "Percentage in Communication skills",
        "Hours working per day", "Logical quotient rating", "hackathons", "coding skills rating",
        "public speaking points"
    ]
    for col in numerical_cols:
        df[col] = pd.to_numeric(df[col], errors='coerce')

    print("The data frame is", df)

    # Define categorical columns
    categorical_cols = [
        'can work long time before system?', 'self-learning capability?', 'Extra-courses did',
        'certifications', 'workshops', 'talenttests taken?', 'olympiads', 'reading and writing skills',
        'memory capability score', 'Interested subjects', 'interested career area ',
        'Job/Higher Studies?', 'Type of company want to settle in?', 'Taken inputs from seniors or elders',
        'interested in games', 'Interested Type of Books', 'Salary Range Expected', 'In a Realtionship?',
        'Gentle or Tuff behaviour?', 'Management or Technical', 'Salary/work', 'hard/smart worker',
        'worked in teams ever?', 'Introvert'
    ]

    # Encode categorical columns (simulating training encoding)
    for col in categorical_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))

    print("DataFrame after encoding:", df)

    # Reorder columns to match the order expected by scaler
    expected_order = scaler.feature_names_in_
    df = df[expected_order]

    print("DataFrame after reordering columns:", df)

    # Scale all features
    df_scaled = scaler.transform(df)

    # Apply PCA
    data_pca = pca.transform(df_scaled)

    print("Shape after PCA:", data_pca.shape)

    return data_pca

@app.route('/')
def home():
    return "ML API is running!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        print("\ndata from client:", data)

        # Preprocess input
        processed_data = preprocess_input(data)

        print("\nprocessed_data is:\n", processed_data)

        # Get probabilities for all classes
        probabilities = model.predict_proba(processed_data)[0]

        # Get top N predictions
        top_n = int(data.get('top_n', 3))
        sorted_indices = np.argsort(probabilities)[::-1][:top_n]
        
        # Decode predictions using the label encoder for the target
        top_predictions = label_encoder_target.inverse_transform(sorted_indices)

        top_probabilities = probabilities[sorted_indices].round(3).tolist()

        response = {
            'predicted_roles': top_predictions.tolist(),
            'probabilities': top_probabilities
        }


        print("\nthe response is :\n",response)

        return jsonify(response)

    except Exception as e:
        print("Error:", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(host='0.0.0.0', port=5001, debug=True)