import React, { useState, useRef, useEffect } from "react";
import {
  Camera,
  Pause,
  Send,
  RefreshCcw,
  Play,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const questions = [
  "How have you been feeling lately?",
  "Can you describe any recent changes in your sleep patterns?",
  "Have you noticed any changes in your appetite or eating habits?",
  "How would you rate your stress level on a scale of 1 to 10?",
  "Have you been able to enjoy activities that usually bring you pleasure?",
];

const mockPreviousSessions = [
  {
    id: 1,
    date: "2023-06-01",
    status: "Completed",
    result: "Mild anxiety detected",
    details: "jkashjkdahsjkagflhagdhfd  anngahdgfhd",
  },
  {
    id: 2,
    date: "2023-05-15",
    status: "Completed",
    result: "No significant issues detected",
    details: "kjksdjksdueabdns c jjskdgkeuganssjkshadjkasd",
  },
  {
    id: 3,
    date: "2023-04-30",
    status: "In Progress",
    result: "Pending analysis",
    details: "dsjkdhjksadkjgs sjkdjkasgdue",
  },
];

export default function MentalHealthPage() {
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [responses, setResponses] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [videoRef.current, streamRef.current]);

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      return stream;
    } catch (err) {
      console.error("Error accessing the camera:", err);
      setError(
        "Failed to access camera and microphone. Please ensure you've granted the necessary permissions."
      );
      throw err;
    }
  };

  const startRecording = () => {
    if (!streamRef.current) {
      setError("No media stream available. Please refresh and try again.");
      return;
    }
    setRecordedChunks([]);
    try {
      mediaRecorderRef.current = new MediaRecorder(streamRef.current);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setError(null);
    } catch (err) {
      console.error("Error starting recording:", err);
      setError("Failed to start recording. Please try again.");
    }
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
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
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

  const handleStartSession = async () => {
    try {
      const stream = await setupCamera();
      streamRef.current = stream;
      setIsSessionStarted(true);
    } catch (err) {
      console.error("Error starting session:", err);
      setError(
        "Failed to start session. Please check your camera and microphone permissions."
      );
    }
  };

  const handleRestartSession = () => {
    navigate("/mental-health");
  };

  const handleFinalSubmit = () => {
    console.log("Submitting responses to backend:", responses);
    setIsSubmitted(true);
  };

  const handleViewSessionDetails = (session) => {
    setSelectedSession(session);
  };

  if (selectedSession) {
    return (
      <SessionDetails
        session={selectedSession}
        onBack={() => setSelectedSession(null)}
      />
    );
  }

  if (!isSessionStarted) {
    return (
      <SessionsOverview
        onStartNewSession={handleStartSession}
        onViewDetails={handleViewSessionDetails}
      />
    );
  }

  if (isCompleted) {
    return (
      <CompletionScreen
        responses={responses}
        onRestart={handleRestartSession}
        onSubmit={handleFinalSubmit}
        isSubmitted={isSubmitted}
      />
    );
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

            <div className="aspect-w-16 aspect-h-9 mb-4 bg-gray-200 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="object-cover w-full h-full"
              />
            </div>

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  disabled={!streamRef.current}
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

function SessionsOverview({ onStartNewSession, onViewDetails }) {
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState(null);

  const handleStart = async () => {
    setIsStarting(true);
    setError(null);
    try {
      await onStartNewSession();
    } catch (err) {
      setError(
        "Failed to start session. Please check your camera and microphone permissions."
      );
    }
    setIsStarting(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Mental Health Sessions
        </h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Previous Sessions
            </h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Result
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPreviousSessions.map((session) => (
                  <tr key={session.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {session.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {session.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {session.result}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => onViewDetails(session)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={handleStart}
            disabled={isStarting}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isStarting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Starting...
              </>
            ) : (
              <>
                <Play className="w-5 h-5 mr-2" />
                Start New Session
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function CompletionScreen({ responses, onRestart, onSubmit, isSubmitted }) {
  const navigate = useNavigate();

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Thank You!
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                We will analyze your responses and get your results as soon as
                possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Assessment Complete
        </h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Review Your Responses
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Please review your recorded responses below. You can restart the
              session if needed, or submit your responses for analysis.
            </p>

            <div className="space-y-6">
              {responses.map((response, index) => (
                <div key={index} className="mb-4">
                  <p className="font-medium text-gray-900 mb-2">
                    {response.question}
                  </p>
                  <video
                    src={response.videoUrl}
                    controls
                    className="w-full max-w-md mx-auto rounded-lg"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => navigate("/mental-health")}
                className="flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <RefreshCcw className="w-5 h-5 mr-2" />
                Restart Session
              </button>
              <button
                onClick={onSubmit}
                className="flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Responses
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SessionDetails({ session, onBack }) {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
        >
          <ChevronRight className="w-5 h-5 mr-1 transform rotate-180" />
          Back to Sessions
        </button>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Session Details
            </h2>
            <div className="space-y-4">
              <p>
                <strong>Date:</strong> {session.date}
              </p>
              <p>
                <strong>Status:</strong> {session.status}
              </p>
              <p>
                <strong>Result:</strong> {session.result}
              </p>
              <p>
                <strong>Details:</strong> {session.details}
              </p>
              {/* Add more details as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
