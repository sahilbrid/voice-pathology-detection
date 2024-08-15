import React, { useState, useRef } from 'react';
import '../styles/Audichecker.css';

import logo from '../assets/logo.png';
import upload from '../assets/upload.png';
import record from '../assets/record.png';
import AudioLogo from '../assets/AudioLogo.png';
import uploadicon from '../assets/uploadicon.jpg';
import LH from '../assets/local_hospital.png';
import { Link } from 'react-router-dom';

const MacBookPro141 = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [key, setKey] = useState(0);
  const mediaRecorder = useRef(null);
  const [plotPath, setPlotPath] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    console.log(file);
    if (file && file.type === 'audio/wav') {
      setAudioFile(e.target.files[0]);
      setKey((prevKey) => prevKey + 1);
    } else {
      alert('Please upload a WAV file');
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks = [];
      mediaRecorder.current.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioFile(blob);
      };
      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  const handlePrediction = async () => {
    if (audioFile) {
      setLoading(true);

      const formData = new FormData();
      formData.append('audio', audioFile);

      try {
        const response = await fetch('http://13.235.0.240/audio', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setPredictions(result);
          setPlotPath(result.PlotPath);
        } else {
          console.error('Prediction failed');
        }
      } catch (error) {
        console.error('Error during prediction:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownload = () => {
    if (audioFile) {
      const url = URL.createObjectURL(audioFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'recorded_audio.wav';
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="macbook-pro-14-2">
      <div className="macbook-pro-14-2-child" />
      <div className="menu1">
        <Link to="/home" className="home1">
          Home
        </Link>
        <Link to="/audichecker" className="audichecker1">
          AudiChecker
        </Link>
      </div>
      <img className="logo-icon2" alt="" src={logo} />
      <div className="audihealth">AudiHealth</div>
      <div className="frame-parent">
        <div className="group-container">
          <div className="rectangle-parent">
            <div className="group-child" />
            <img className="logo-icon3" alt="" src={AudioLogo} />
          </div>
          <div className="audichecker2">AudiChecker</div>
        </div>
        <div className="group-div">
          <div className="group-wrapper">
            <div className="group-wrapper">
              <div className="group-wrapper">
                <div className="group-item" />
              </div>
            </div>
            <div className="group-parent2">
              <div className="group-frame">
                <div className="group-frame">
                  <div className="group-frame">
                    <div className="group-inner" />
                    <input
                      type="file"
                      name="audio"
                      accept=".wav"
                      className="InputMP3"
                      onChange={handleFileChange}
                      required
                    />
                  </div>
                </div>
                <div className="upload-parent">
                  <img className="upload-icon1" alt="" src={upload} />
                  <div className="record-audio">
                    {/* {`
                    ${audioFile ? audioFile.name : 'Upload Audio'}
                    `} */}
                    Upload Audio
                  </div>
                </div>
              </div>
              {/* <div className="or">or</div> */}
            </div>
          </div>
          <div className="group-child2" />
        </div>
        <div className="rectangle-group">
          <div className="group-child3" />
          {/* <div
            className={`diagnose${isRecording ? ' diagnose-active' : ''}`}
            onClick={isRecording ? stopRecording : null}
          >
            {isRecording ? 'Stop Recording' : 'Diagnose'}
          </div> */}
          <button
            className={`diagnose${isRecording ? ' diagnose-active' : ''}`}
            onClick={handlePrediction}
            disabled={loading}
          >
            {loading ? 'Diagnosing...' : 'Diagnose'}
          </button>
        </div>
      </div>
      <div>
        {predictions && (
          <div className="Predictions">
            <h2>Diagnosis:</h2>
            <p>{predictions.Prediction}</p>
            {/* <p>{predictions.Prediction == 'Laryngitis'} </p> */}
          </div>
        )}
      </div>

      {/* Display uploaded file name and provide playback options */}
      {audioFile && (
        <div className="audio-player">
          <p>Uploaded audio file: {audioFile.name}</p>
          <audio key={key} controls>
            <source src={URL.createObjectURL(audioFile)} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <div>
        {plotPath && (
          <div className="graph-container">
            <img
              src={`http://13.235.0.240/plot/${encodeURIComponent(plotPath)}`}
              alt="Prediction Plot"
              className="prediction-plot"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MacBookPro141;
