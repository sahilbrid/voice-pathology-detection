from flask import Flask, render_template, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import os
import pandas as pd
import numpy as np
from model import *
import matplotlib.pyplot as plt

app = Flask(__name__)
CORS(app)

@app.route('/audio', methods=['POST', 'GET'])
def audio():
    if request.method == 'POST':
        print(request.files)
        
        # Check if the 'file' key is in request.files
        if 'audio' in request.files:
            audio_file = request.files['audio']
            
            if audio_file.filename == '':
                return jsonify({"error": "No file selected"})
                
            if audio_file:
                # Save the uploaded file to a temporary location
                temp_path = 'temp.wav'
                # audio_file.save(temp_path)
                audio_file.save(temp_path)

                predicted_class_label, allocated_probabilities = predict_with_interpretable_probabilities(temp_path)
                plt_path = f'{audio_file.filename} plot.png'
                plt.savefig(plt_path)

                if predicted_class_label == 'Laryngitis':
                    result = {
                            "Prediction": 'You are at an' + ' ' + allocated_probabilities + ' ' 'risk of having' + ' ' + predicted_class_label,
                            "PlotPath": plt_path
                        }
                elif predicted_class_label == 'Healthy':
                    result = {
                            "Prediction": 'Your voice is' + ' ' + predicted_class_label,
                            "PlotPath": plt_path
                        }
                elif predicted_class_label == 'Vocal Polyp':
                    result = {
                            "Prediction": 'You are at an' + ' ' + allocated_probabilities + ' ' 'risk of having' + ' ' + predicted_class_label,
                            "PlotPath": plt_path
                        }
                
                # result = {
                #     "Prediction": prediction
                # }
                os.remove(temp_path)
                print(result)
                return jsonify(result)
            else:
                return jsonify({"error": "Feature extraction failed for the uploaded audio file."})
        else:
            return jsonify({"error": "No audio key found in the request."})
    else:
        return jsonify({"error": "Unsupported method"})
    

@app.route('/plot/<path:plot_path>', methods=['GET'])
def plot(plot_path):
    return send_file(plot_path, mimetype='image/png')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)