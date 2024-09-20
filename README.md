# AudiHealth
Detecting Voice Disorders with Advanced Neural Modeling

**Link:** http://voice-pathology-detection.s3-website.ap-south-1.amazonaws.com/


# About the Project
Voice disorders, or pathologies, can significantly impact an individual's ability to communicate effectively. Early detection of these conditions is crucial for timely intervention and treatment. This project focuses on developing a web-based application that uses deep learning to detect voice pathologies using speech signal data.

## Project Overview
This application combines the power of a **Liquid State Machine (LSM) model** with a ReactJS frontend, seamlessly integrated using Flask. The LSM model, a type of spiking neural network, is particularly effective in processing temporal data like voice signals. By analyzing various acoustic features of voice recordings, the application can accurately identify potential pathologies.

## Key Features
- The LSM model processes speech signal data to detect anomalies that may indicate a voice disorder.
- A dynamic and responsive user interface built with ReactJS, allowing users to easily upload voice recordings and view results.
- The Python-based Flask framework serves as the bridge between the LSM model and the frontend, ensuring smooth communication and data handling.
- Along with the predicted pathology, the application displays the spectrogram of the audio, providing a visual representation of the voice signal’s frequency content.
- Designed with the end-user in mind, the application provides a simple and intuitive interface for uploading voice files and receiving instant feedback.

## Dataset
The model was trained and tested on a comprehensive [Saarbruecken Voice Database](https://stimmdb.coli.uni-saarland.de/index.php4#target) of voice recordings, labeled with various types of voice disorders. We have trained the current model on 2 types of voice pathology, Vocal Polyp and Laryngitis and on Healthy voice. This dataset enabled the model to learn to distinguish between healthy and pathological voice patterns with high accuracy.


# Installation
To use this project perform the following tasks

Make sure you are using python 3.9.6 or better (https://www.python.org/downloads/release/python-396/)

Clone the repository using
```
git clone https://github.com/sahilbrid/voice-pathology-detection.git
```

Navigate to the project directory
```
cd voice-pathology-detection
```

Install the required python packages
```
pip install -r requirements.txt
```

Install the required frontend dependencies
```
npm install
```

Run the Flask application
```
cd ..
python app.py
```

Start the React frontend
```
cd frontend
npm run dev
```


# Usage
Once the application (app.py) file is running

- Open your browser and go to http://localhost:5173/

  It will open the landing page

  ![image](https://github.com/user-attachments/assets/4a18781b-e8e7-426d-af97-f2250ab18a25)

  It should look something like this

- Now go to the AudiChecker section. Here you can upload the audio file in .wav format that you want to check

  ![image](https://github.com/user-attachments/assets/4f26adfc-04d5-434f-851d-19589531e83d)

- After uploading the audio, click on diagnose button

  ![image](https://github.com/user-attachments/assets/21a745d2-99f5-40bf-ac62-3bcf53e7a9dc)

  The predicted pathology of the audio along with its spectrogram will be displayed.


# Technology Used
- **Frontend**: React, CSS
- **Backend**: Python, Flask
- **Machine Learning**: Scikit-learn, Tensorflow, Librosa, Pandas, Numpy
- **Deployment**: AWS S3, AWS EC2


# Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.
