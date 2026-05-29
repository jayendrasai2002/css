import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Clock, ChevronRight, ChevronLeft, Flag, AlertTriangle } from "lucide-react";
import ExamProctor from "@/components/ExamProctor";

interface Question {
  id: string;
  text: string;
  options: string[];
  explanation?: string;
}

interface ProctoringAlerts {
  noiseDetected: boolean;
  windowBlurred: boolean;
  fullScreenExited: boolean;
  suspiciousActivity: number;
  cameraBlocked: boolean;
}

interface ExamState {
  currentQuestion: number;
  answers: Record<string, string>;
  flagged: Set<string>;
  timeRemaining: number;
  submitted: boolean;
  showExplanation: boolean;
  examStarted: boolean;
  proctoringAlerts: ProctoringAlerts;
  suspiciousActivitiesCount: number;
}

const mockExamQuestions: Question[] = [
  {
    id: "1",
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    explanation: "Paris is the capital and most populous city of France. It is located in northern France on the Seine River."
  },
  {
    id: "2",
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    explanation: "Mars is often called the Red Planet because of its reddish appearance, caused by iron oxide on its surface."
  },
  {
    id: "3",
    text: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    explanation: "The Pacific Ocean is the largest and deepest of the world's oceanic divisions, covering about 46% of the world's ocean surface."
  },
  {
    id: "4",
    text: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    explanation: "William Shakespeare wrote 'Romeo and Juliet', one of the most famous love stories in literature, believed to be written between 1591-1596."
  },
  {
    id: "5",
    text: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    explanation: "Au is the chemical symbol for Gold, coming from its Latin name 'Aurum'. It is a highly valued precious metal."
  }
];

const correctAnswers: Record<string, string> = {
  "1": "Paris",
  "2": "Mars",
  "3": "Pacific Ocean",
  "4": "William Shakespeare",
  "5": "Au"
};

export default function ExamTaking() {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();

  const [state, setState] = useState<ExamState>({
    currentQuestion: 0,
    answers: {},
    flagged: new Set(),
    timeRemaining: 45 * 60,
    submitted: false,
    showExplanation: false,
    examStarted: false,
    proctoringAlerts: {
      noiseDetected: false,
      windowBlurred: false,
      fullScreenExited: false,
      suspiciousActivity: 0,
      cameraBlocked: false
    },
    suspiciousActivitiesCount: 0
  });

  // Timer
  useEffect(() => {
    if (state.submitted || state.timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setState(prev => ({
        ...prev,
        timeRemaining: Math.max(0, prev.timeRemaining - 1)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [state.submitted, state.timeRemaining]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (option: string) => {
    if (state.submitted) return;
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [mockExamQuestions[prev.currentQuestion].id]: option
      }
    }));
  };

  const toggleFlag = () => {
    const questionId = mockExamQuestions[state.currentQuestion].id;
    setState(prev => {
      const newFlagged = new Set(prev.flagged);
      if (newFlagged.has(questionId)) {
        newFlagged.delete(questionId);
      } else {
        newFlagged.add(questionId);
      }
      return { ...prev, flagged: newFlagged };
    });
  };

  const handleNext = () => {
    if (state.currentQuestion < mockExamQuestions.length - 1) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        showExplanation: false
      }));
    }
  };

  const handlePrev = () => {
    if (state.currentQuestion > 0) {
      setState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
        showExplanation: false
      }));
    }
  };

  const handleSubmit = () => {
    setState(prev => ({ ...prev, submitted: true }));
  };

  const calculateScore = () => {
    let correct = 0;
    Object.entries(state.answers).forEach(([questionId, answer]) => {
      if (correctAnswers[questionId] === answer) {
        correct++;
      }
    });
    return {
      correct,
      total: mockExamQuestions.length,
      percentage: Math.round((correct / mockExamQuestions.length) * 100)
    };
  };

  const handleProctoringAlert = (alerts: ProctoringAlerts) => {
    setState(prev => {
      const newCount = alerts.suspiciousActivity > prev.proctoringAlerts.suspiciousActivity
        ? prev.suspiciousActivitiesCount + 1
        : prev.suspiciousActivitiesCount;

      // Terminate exam if too many suspicious activities
      if (newCount > 5) {
        alert("⚠️ EXAM TERMINATED\n\nMultiple suspicious activities detected. You are not allowed to retake this exam. Your attempt has been recorded.");
        navigate("/exams");
        return prev;
      }

      return {
        ...prev,
        proctoringAlerts: alerts,
        suspiciousActivitiesCount: newCount
      };
    });
  };

  const question = mockExamQuestions[state.currentQuestion];
  const isAnswered = state.answers[question.id] !== undefined;
  const currentAnswer = state.answers[question.id];
  const isFlagged = state.flagged.has(question.id);

  // Exam startup screen
  if (!state.examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="text-center mb-8">
              <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
              <h1 className="text-4xl font-bold text-foreground mb-4">
                Exam Rules & Proctoring
              </h1>
              <p className="text-lg text-muted-foreground">
                Please read and accept the terms before starting
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-300 rounded-2xl p-6 mb-8">
              <h2 className="font-bold text-orange-900 mb-4 text-lg">⚠️ Important: Anti-Cheating Measures</h2>
              <ul className="space-y-3 text-orange-900 text-sm">
                <li className="flex gap-3">
                  <span className="font-bold">•</span>
                  <span><strong>Camera & Microphone Required:</strong> Your exam will be monitored with live camera and audio feed</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">•</span>
                  <span><strong>Fullscreen Mode:</strong> Exam must run in fullscreen. Leaving will trigger warnings</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">•</span>
                  <span><strong>Window Monitoring:</strong> Switching windows or tabs is detected and recorded</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">•</span>
                  <span><strong>Noise Detection:</strong> Unusual noise will be flagged and recorded</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">•</span>
                  <span><strong>One Attempt Only:</strong> You have only ONE chance to take this exam</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold">•</span>
                  <span><strong>Termination:</strong> More than 5 suspicious activities will end your exam permanently</span>
                </li>
              </ul>
            </div>

            <div className="bg-red-50 border border-red-300 rounded-2xl p-6 mb-8">
              <h2 className="font-bold text-red-900 mb-4">🚫 Prohibited Activities</h2>
              <ul className="space-y-2 text-red-900 text-sm">
                <li>❌ Using external devices or looking away from screen</li>
                <li>❌ Opening other browser tabs or windows</li>
                <li>❌ Covering or disabling camera</li>
                <li>❌ Removing headphones or suspicious audio patterns</li>
                <li>❌ Taking screenshots or recording the exam</li>
                <li>❌ Collaborating with others during the exam</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-300 rounded-2xl p-6 mb-8">
              <p className="text-blue-900 text-sm">
                <strong>By clicking "Start Exam", you:</strong><br/>
                ✓ Acknowledge you have read and understood these terms<br/>
                ✓ Agree to be monitored during the entire exam<br/>
                ✓ Accept that suspicious activities will result in exam termination<br/>
                ✓ Understand this is a ONE-TIME ONLY attempt
              </p>
            </div>

            <button
              onClick={() => setState(prev => ({ ...prev, examStarted: true }))}
              className="w-full py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-bold rounded-xl hover:opacity-90 transition-opacity text-lg"
            >
              I Accept & Start Exam Now
            </button>

            <button
              onClick={() => navigate("/exams")}
              className="w-full mt-4 py-4 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 transition-colors text-lg"
            >
              Back to Exams
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state.submitted) {
    const score = calculateScore();
    const passed = score.percentage >= 70;

    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="text-center mb-8">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
                passed
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}>
                <span className={`text-4xl font-bold ${
                  passed
                    ? "text-green-600"
                    : "text-red-600"
                }`}>
                  {score.percentage}%
                </span>
              </div>

              <h1 className="text-3xl font-bold text-foreground mb-2">
                {passed ? "Congratulations! 🎉" : "Keep Practicing"}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                You scored {score.correct} out of {score.total} questions correctly
              </p>

              {passed && (
                <p className="text-lg font-semibold text-green-600 mb-8">
                  You passed the exam!
                </p>
              )}
            </div>

            <div className="bg-muted p-6 rounded-lg mb-8">
              <h2 className="font-bold text-foreground mb-4">Review Your Answers</h2>
              <div className="space-y-3">
                {mockExamQuestions.map((q) => {
                  const userAnswer = state.answers[q.id];
                  const isCorrect = userAnswer === correctAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-lg ${
                        isCorrect
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-foreground mb-2">
                            Question {q.id}: {q.text}
                          </p>
                          <div className="text-sm">
                            <p className={isCorrect ? "text-green-700" : "text-red-700"}>
                              Your answer: {userAnswer || "Not answered"}
                            </p>
                            {!isCorrect && (
                              <p className="text-green-700 mt-1">
                                Correct answer: {correctAnswers[q.id]}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ml-2 ${
                          isCorrect
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}>
                          {isCorrect ? "✓" : "✗"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate("/exams")}
                className="flex-1 px-6 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary/5 transition-colors"
              >
                Back to Exams
              </button>
              <button
                disabled
                className="flex-1 px-6 py-3 bg-gray-300 text-gray-600 font-bold rounded-lg cursor-not-allowed"
                title="This exam can only be taken once. Retakes are not allowed."
              >
                ❌ Cannot Retake (One Attempt Only)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Exam #{examId}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                state.timeRemaining < 300
                  ? "bg-red-100 text-red-800"
                  : "bg-primary/10 text-primary"
              }`}>
                <Clock className="w-5 h-5" />
                <span className="font-bold text-lg">
                  {formatTime(state.timeRemaining)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Proctoring Monitor */}
        <div className="mb-8">
          <ExamProctor
            enabled={true}
            onProctorAlert={handleProctoringAlert}
          />
        </div>

        {/* Suspicious Activity Alert */}
        {state.suspiciousActivitiesCount > 2 && (
          <div className="mb-8 p-6 bg-red-50 border-2 border-red-500 rounded-2xl">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-red-900 mb-2">⚠️ Multiple Suspicious Activities Detected</h3>
                <p className="text-red-800 text-sm mb-2">
                  You have {state.suspiciousActivitiesCount} suspicious activities recorded.
                  {state.suspiciousActivitiesCount > 5 && " Your exam will be terminated if this continues."}
                </p>
                <p className="text-red-700 text-xs">
                  Please ensure you are in a quiet environment, keep your focus on the exam window, and maintain fullscreen mode.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Navigator */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border border-border">
              <h3 className="font-bold text-foreground mb-4">
                Question {state.currentQuestion + 1} of {mockExamQuestions.length}
              </h3>
              <div className="grid grid-cols-5 gap-2 mb-6">
                {mockExamQuestions.map((q, i) => (
                  <button
                    key={q.id}
                    onClick={() => setState(prev => ({ ...prev, currentQuestion: i, showExplanation: false }))}
                    className={`aspect-square text-xs font-bold rounded-lg transition-all ${
                      i === state.currentQuestion
                        ? "bg-primary text-white"
                        : state.answers[q.id]
                        ? "bg-green-100 text-green-800"
                        : "bg-muted text-foreground hover:bg-border"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-100 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-muted rounded"></div>
                  <span>Not answered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Question Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 border border-border">
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground flex-1 pr-4">
                  {question.text}
                </h2>
                <button
                  onClick={toggleFlag}
                  className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                    isFlagged
                      ? "bg-amber-100 text-amber-600"
                      : "bg-muted text-muted-foreground hover:bg-border"
                  }`}
                >
                  <Flag className="w-5 h-5" />
                </button>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    disabled={state.submitted}
                    className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                      currentAnswer === option
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    } ${state.submitted ? "cursor-not-allowed opacity-60" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                        currentAnswer === option
                          ? "border-primary bg-primary"
                          : "border-border"
                      }`}>
                        {currentAnswer === option && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <span className="font-medium text-foreground">
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Explanation (shown after submission) */}
              {state.submitted && (
                <div className={`p-4 rounded-lg mb-8 ${
                  currentAnswer === correctAnswers[question.id]
                    ? "bg-green-50 border border-green-200"
                    : "bg-blue-50 border border-blue-200"
                }`}>
                  <h4 className="font-bold text-foreground mb-2">Explanation</h4>
                  <p className="text-muted-foreground">
                    {question.explanation}
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-4">
                <button
                  onClick={handlePrev}
                  disabled={state.currentQuestion === 0}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-border text-foreground font-bold rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>

                <button
                  onClick={handleNext}
                  disabled={state.currentQuestion === mockExamQuestions.length - 1}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-border text-foreground font-bold rounded-lg hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </button>

                {state.currentQuestion === mockExamQuestions.length - 1 && (
                  <button
                    onClick={handleSubmit}
                    className="ml-auto px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Submit Exam
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
