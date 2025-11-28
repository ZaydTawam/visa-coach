import tensorflow as tf
import pickle
from keras_preprocessing.sequence import pad_sequences
from flask import Flask, request, jsonify
from flask_cors import CORS

loaded_model = tf.keras.models.load_model('sentiment_model.h5')
with open('tokenizer.pickle', 'rb') as handle:
    loaded_tokenizer = pickle.load(handle)

def predict_uncertainty(text, model=loaded_model, tokenizer=loaded_tokenizer, max_length=100):
    sequence = tokenizer.texts_to_sequences([text])
    padded = pad_sequences(sequence, maxlen=max_length, padding='post')
    
    prediction = model.predict(padded)[0][0]
    
    certainty_score = float(prediction)    
    is_uncertain = certainty_score < 0.5
    
    if (is_uncertain):
        print("uncertain")

    return is_uncertain

app = Flask(__name__)
CORS(app)

@app.route('/confidence', methods=['POST'])
def confidence():
    try:
        data = request.json
        text = data['text']
        
        is_uncertain = predict_uncertainty(text, loaded_model, loaded_tokenizer)
        
        return jsonify({"uncertain": is_uncertain})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=5000, debug=True)