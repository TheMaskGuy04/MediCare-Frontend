import React, { useState, useRef, useEffect } from "react";
import { Camera, Pause, Send, RefreshCcw } from "lucide-react";

const questions = [
  "How have you been feeling lately?",
  "Can you describe any recent changes in your sleep patterns?",
  "Have you noticed any changes in your appetite or eating habits?",
  "How would you rate your stress level on a scale of 1 to 10?",
  "Have you been able to enjoy activities that usually bring you pleasure?",
];

export default function MentalHealthPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [responses, setResponses] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        streamRef.current = stream;
      } catch (err) {
        console.error("Error accessing the camera:", err);
      }
    }
    setupCamera();

    return () => {
      // Cleanup function to stop the stream when component unmounts
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    // Stop the stream when assessment is completed
    if (isCompleted && streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  }, [isCompleted]);

  const startRecording = () => {
    setRecordedChunks([]);
    const stream = videoRef.current.srcObject;
    mediaRecorderRef.current = new MediaRecorder(stream);

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => [...prev, event.data]);
      }
    };

    mediaRecorderRef.current.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleSubmit = () => {
    stopRecording();
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    setResponses([
      ...responses,
      { question: questions[currentQuestion], videoUrl: url },
    ]);
    setRecordedChunks([]);
    handleNextQuestion();
  };

  const handleRestart = async () => {
    setIsCompleted(false);
    setCurrentQuestion(0);
    setResponses([]);
    // Re-initialize the camera
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  if (isCompleted) {
    return <CompletionScreen responses={responses} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Mental Health Assessment
        </h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Question {currentQuestion + 1}:
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {questions[currentQuestion]}
            </p>

            <div className="aspect-w-16 aspect-h-9 mb-4">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="rounded-lg"
              />
            </div>

            <div className="flex justify-center space-x-4">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Start Recording
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  <Pause className="w-5 h-5 mr-2" />
                  Stop Recording
                </button>
              )}

              <button
                onClick={handleSubmit}
                disabled={recordedChunks.length === 0}
                className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Answer
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-2">
            Progress: {currentQuestion + 1} / {questions.length}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompletionScreen({ responses, onRestart }) {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Assessment Complete
        </h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Thank you for completing the assessment!
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Your responses have been recorded and will be analyzed by our AI
              system. A mental health professional will review the results and
              provide personalized feedback soon.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Your Responses:
            </h3>
            {responses.map((response, index) => (
              <div key={index} className="mb-4">
                <p className="font-medium text-gray-900">{response.question}</p>
                <video
                  src={response.videoUrl}
                  controls
                  className="mt-2 rounded-lg w-full"
                />
              </div>
            ))}

            <button
              onClick={onRestart}
              className="mt-6 flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <RefreshCcw className="w-5 h-5 mr-2" />
              Start New Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
