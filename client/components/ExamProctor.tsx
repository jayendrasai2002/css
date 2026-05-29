import { useState, useEffect, useRef } from "react";
import { Camera, AlertTriangle, Eye, Volume2, Maximize2 } from "lucide-react";

interface ProctoringAlerts {
  noiseDetected: boolean;
  windowBlurred: boolean;
  fullScreenExited: boolean;
  suspiciousActivity: number;
  cameraBlocked: boolean;
}

interface ExamProctoringProps {
  onProctorAlert?: (alert: ProctoringAlerts) => void;
  enabled?: boolean;
}

export default function ExamProctor({ onProctorAlert, enabled = true }: ExamProctoringProps) {
  const [alerts, setAlerts] = useState<ProctoringAlerts>({
    noiseDetected: false,
    windowBlurred: false,
    fullScreenExited: false,
    suspiciousActivity: 0,
    cameraBlocked: false
  });

  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Initialize camera and microphone
  useEffect(() => {
    if (!enabled) return;

    const initMedia = async () => {
      try {
        // Request camera permission
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setCameraActive(true);
        }

        // Request audio permission for noise detection
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(audioStream);
        microphone.connect(analyser);

        audioContextRef.current = audioContext;
        analyserRef.current = analyser;
        setMicActive(true);
      } catch (error) {
        console.warn("Camera/Microphone access denied:", error);
        setAlerts(prev => ({ ...prev, cameraBlocked: true }));
      }
    };

    initMedia();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
      }
    };
  }, [enabled]);

  // Monitor noise levels
  useEffect(() => {
    if (!analyserRef.current) return;

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    const checkNoise = () => {
      analyserRef.current?.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b) / dataArray.length;

      if (average > 80) {
        setAlerts(prev => ({ ...prev, noiseDetected: true }));
      } else {
        setAlerts(prev => ({ ...prev, noiseDetected: false }));
      }

      requestAnimationFrame(checkNoise);
    };

    checkNoise();
  }, []);

  // Monitor window focus and fullscreen
  useEffect(() => {
    if (!enabled) return;

    const handleBlur = () => {
      setAlerts(prev => ({ ...prev, windowBlurred: true, suspiciousActivity: prev.suspiciousActivity + 1 }));
    };

    const handleFocus = () => {
      setAlerts(prev => ({ ...prev, windowBlurred: false }));
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setAlerts(prev => ({ ...prev, fullScreenExited: true, suspiciousActivity: prev.suspiciousActivity + 1 }));
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    // Request fullscreen
    setTimeout(() => {
      document.documentElement.requestFullscreen().catch(() => {
        console.warn("Fullscreen request denied");
      });
    }, 1000);

    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [enabled]);

  // Detect suspicious mouse movements
  useEffect(() => {
    if (!enabled) return;

    let lastX = 0;
    let lastY = 0;
    let suspiciousMoves = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const distance = Math.sqrt(Math.pow(e.clientX - lastX, 2) + Math.pow(e.clientY - lastY, 2));

      // Detect unusual movement patterns (too fast or erratic)
      if (distance > 500) {
        suspiciousMoves++;
        if (suspiciousMoves > 5) {
          setAlerts(prev => ({ ...prev, suspiciousActivity: prev.suspiciousActivity + 1 }));
          suspiciousMoves = 0;
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [enabled]);

  // Report proctoring status
  useEffect(() => {
    if (onProctorAlert) {
      onProctorAlert(alerts);
    }
  }, [alerts, onProctorAlert]);

  if (!enabled) return null;

  return (
    <div className="space-y-4">
      {/* Proctoring Status Bar */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Eye className="w-5 h-5 text-primary" />
            Exam Monitoring Active
          </h3>
          <span className="text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
            LIVE PROCTORING
          </span>
        </div>

        {/* Camera Feed */}
        <div className="mb-4">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-32 bg-black rounded-lg object-cover border-2 border-primary/20"
          />
          {!cameraActive && (
            <div className="flex items-center justify-center h-32 bg-gray-100 rounded-lg border-2 border-red-300">
              <div className="text-center">
                <AlertTriangle className="w-6 h-6 text-red-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-red-600">Camera Not Available</p>
              </div>
            </div>
          )}
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-4 gap-2">
          <div className={`p-3 rounded-lg text-center ${cameraActive ? "bg-green-100" : "bg-red-100"}`}>
            <Camera className={`w-5 h-5 mx-auto mb-1 ${cameraActive ? "text-green-600" : "text-red-600"}`} />
            <p className="text-xs font-semibold">{cameraActive ? "Camera ON" : "Camera OFF"}</p>
          </div>

          <div className={`p-3 rounded-lg text-center ${micActive && !alerts.noiseDetected ? "bg-green-100" : alerts.noiseDetected ? "bg-orange-100" : "bg-red-100"}`}>
            <Volume2 className={`w-5 h-5 mx-auto mb-1 ${micActive ? alerts.noiseDetected ? "text-orange-600" : "text-green-600" : "text-red-600"}`} />
            <p className="text-xs font-semibold">{alerts.noiseDetected ? "Noise!" : "Mic OK"}</p>
          </div>

          <div className={`p-3 rounded-lg text-center ${!alerts.windowBlurred ? "bg-green-100" : "bg-red-100"}`}>
            <Maximize2 className={`w-5 h-5 mx-auto mb-1 ${!alerts.windowBlurred ? "text-green-600" : "text-red-600"}`} />
            <p className="text-xs font-semibold">{alerts.windowBlurred ? "Tab Inactive" : "Focused"}</p>
          </div>

          <div className={`p-3 rounded-lg text-center ${alerts.suspiciousActivity === 0 ? "bg-green-100" : "bg-red-100"}`}>
            <AlertTriangle className={`w-5 h-5 mx-auto mb-1 ${alerts.suspiciousActivity === 0 ? "text-green-600" : "text-red-600"}`} />
            <p className="text-xs font-semibold">Alerts: {alerts.suspiciousActivity}</p>
          </div>
        </div>

        {/* Alert Messages */}
        {(alerts.noiseDetected || alerts.windowBlurred || alerts.fullScreenExited || alerts.suspiciousActivity > 0) && (
          <div className="mt-4 space-y-2">
            {alerts.noiseDetected && (
              <div className="bg-orange-100 border border-orange-300 text-orange-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Unusual noise detected
              </div>
            )}
            {alerts.windowBlurred && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Please keep focus on the exam window
              </div>
            )}
            {alerts.fullScreenExited && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Exam must be in fullscreen mode
              </div>
            )}
            {alerts.suspiciousActivity > 3 && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-2 rounded-lg text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Multiple suspicious activities detected. Exam may be terminated.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Warning Notice */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3">
        <p className="text-xs text-yellow-800">
          ⚠️ <strong>Important:</strong> This exam is proctored. Switching windows, unusual noise, or suspicious activities will be recorded and may result in disqualification.
        </p>
      </div>
    </div>
  );
}
