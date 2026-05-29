# Xpay IT Exams - Anti-Cheating & Proctoring System

## Overview

The Xpay IT Exams platform includes comprehensive anti-cheating and proctoring features to ensure exam integrity and prevent academic dishonesty. The system uses AI-powered detection, camera monitoring, and behavioral analysis.

---

## 🎥 Core Proctoring Features

### 1. **Camera & Microphone Monitoring**

**Purpose:** Live visual and audio monitoring throughout the exam

**Implementation:**
- Requests camera access when exam starts
- Requests microphone access for audio monitoring
- Real-time video feed displayed during exam
- Continues recording throughout entire exam session

**What's Monitored:**
```
✓ Face and eye movement
✓ Environmental surroundings
✓ Audio noise patterns
✓ Suspicious sounds (copying, collaboration)
✓ Multiple people in frame
```

**User Consent:**
- Explicit permission required before exam starts
- Clear warning about monitoring on exam startup screen
- User must accept terms to proceed

---

### 2. **Fullscreen Mode Enforcement**

**Purpose:** Prevent access to other windows/tabs during exam

**Implementation:**
```javascript
document.documentElement.requestFullscreen()
```

**Detection:**
- Automatic request to enter fullscreen mode
- Detects if user exits fullscreen
- Records timestamp of fullscreen exit
- Triggers warning if fullscreen disabled

**Enforcement:**
- Visual warning displayed
- Suspicious activity count incremented
- Exam terminates after 5+ violations

---

### 3. **Window Focus Monitoring**

**Purpose:** Detect when user switches to another window/tab

**Implementation:**
- Monitors `window blur` events
- Detects when browser loses focus
- Tracks duration of focus loss
- Records all instances

**Alerts Triggered:**
- "Please keep focus on the exam window"
- Visual indicator in proctoring panel
- Suspicious activity count incremented

---

### 4. **Noise Detection**

**Purpose:** Detect unusual audio patterns that might indicate collaboration

**Implementation:**
```javascript
audioContext = new AudioContext()
analyser = audioContext.createAnalyser()
analyser.getByteFrequencyData(dataArray)
```

**Thresholds:**
- Average noise level > 80dB triggers alert
- Detects sustained loud noises
- Distinguishes between background and unusual noise

**What Triggers:**
- Conversation/discussion
- Background voices
- Sudden loud sounds
- Unusual acoustic patterns

---

### 5. **Suspicious Mouse Movement Detection**

**Purpose:** Identify erratic or unusual input patterns

**Implementation:**
```javascript
- Tracks mouse position on each movement
- Calculates distance traveled per movement
- Identifies jumps > 500px (unusual for normal interaction)
- Counts consecutive suspicious movements
```

**Triggers:**
- Extremely fast mouse movements
- Teleporting cursor across screen
- Patterns inconsistent with normal exam behavior
- More than 5 consecutive erratic movements

---

### 6. **One-Attempt Only Policy**

**Purpose:** Ensure students take the exam seriously and prevent repeated attempts

**Features:**
- First time: Full access to exam
- After submission: Retake button disabled
- Attempt count tracked in backend
- Cannot reset exam locally

**Implementation:**
```
Database stores:
- Attempt number
- Timestamp of attempt
- Final score
- Proctoring violations logged
- Can query to prevent re-attempts
```

---

### 7. **Activity Logging & Alerts**

**Purpose:** Create audit trail of suspicious activities

**Tracked Events:**
```
✓ Exam start time
✓ Exam end time
✓ Window blur events
✓ Fullscreen exits
✓ Noise detections
✓ Mouse movement anomalies
✓ Questions answered
✓ Time spent per question
✓ Flagged questions
✓ Final answers submitted
✓ Proctoring warnings issued
```

**Alert Severity Levels:**
```
🟡 Warning (Minor): Noise detected, brief window blur
🟠 Caution (Moderate): Repeated fullscreen exits, multiple alerts
🔴 Violation (Severe): Excessive suspicious activities, 6+ alerts
```

---

## ⚙️ Technical Architecture

### Component Structure

**File:** `client/components/ExamProctor.tsx`

```typescript
interface ProctoringAlerts {
  noiseDetected: boolean;        // Real-time noise level
  windowBlurred: boolean;         // Tab is inactive
  fullScreenExited: boolean;      // User left fullscreen
  suspiciousActivity: number;     // Total activity count
  cameraBlocked: boolean;         // Camera access denied
}

<ExamProctor 
  enabled={true}
  onProctorAlert={handleProctoringAlert}
/>
```

### State Management

**Exam State Tracking:**
```typescript
interface ExamState {
  examStarted: boolean;           // Exam has begun
  proctoringAlerts: ProctoringAlerts;  // Current alerts
  suspiciousActivitiesCount: number;   // Total violation count
  submitted: boolean;             // Exam completed
  // ... other exam state
}
```

### Alert Handling

```typescript
const handleProctoringAlert = (alerts: ProctoringAlerts) => {
  // Check threshold
  if (newCount > 5) {
    // Terminate exam
    alert("EXAM TERMINATED\nMultiple suspicious activities detected.");
    navigate("/exams");
  }
}
```

---

## 🚨 Violation Thresholds & Penalties

### Suspension Triggers

| Activity | Single Incident | Multiple (3+) | Termination |
|----------|-----------------|---------------|-------------|
| Noise Detected | ⚠️ Warning | 🟠 Alert | 6+ incidents |
| Window Blur | ⚠️ Warning | 🟠 Alert | 6+ incidents |
| Fullscreen Exit | ⚠️ Warning | 🟠 Alert | 6+ incidents |
| Suspicious Mouse | ⚠️ Warning | 🟠 Alert | 6+ incidents |
| Combined Violations | 1 point | 3 points | 6+ total |

### Exam Termination

**Conditions for Automatic Termination:**
```
✗ 6 or more suspicious activities within single exam session
✗ Camera/microphone disabled or blocked
✗ Repeated fullscreen violations (5+ exits)
✗ Excessive noise patterns suggesting collaboration
```

**After Termination:**
```
❌ Cannot retake exam
❌ Attempt marked as "TERMINATED - CHEATING SUSPECTED"
❌ Full audit log preserved
❌ Flagged for manual review
```

---

## 📋 Startup Screen & Consent

### Pre-Exam Agreement

Users must accept terms before exam begins:

**Requirements Disclosed:**
```
1. Camera & Microphone Required
   - Live monitoring during exam
   - Recording of video and audio
   - May be reviewed later

2. Fullscreen Mode Mandatory
   - Exam runs in fullscreen only
   - Leaving triggers warnings
   - Multiple exits = termination

3. Window Monitoring Active
   - Switching windows detected
   - Recorded and counted
   - 6+ violations = exam end

4. Noise Detection Enabled
   - Audio monitored continuously
   - Unusual noise flagged
   - Collaboration detection

5. One Attempt Only
   - Cannot retake exam
   - Single chance to pass
   - No reset options

6. Termination Risk
   - >5 suspicious activities = auto-end
   - May be permanently disqualified
   - Attempt not scored
```

---

## 🎯 User Interface Components

### 1. Exam Startup Screen

```
┌─────────────────────────────────┐
│   ⚠️ EXAM RULES & PROCTORING   │
├─────────────────────────────────┤
│ ⚠️ Important Anti-Cheating      │
│ • Camera & Microphone Required  │
│ • Fullscreen Mode Mandatory     │
│ • Window Monitoring Active      │
│ • Noise Detection Enabled       │
│ • One Attempt Only              │
│ • 6+ Suspicious = Termination   │
├─────────────────────────────────┤
│ 🚫 Prohibited Activities        │
│ ❌ External devices             │
│ ❌ Opening other windows        │
│ ❌ Camera disabled              │
│ ❌ Suspicious audio             │
│ ❌ Screenshots                  │
│ ❌ Collaboration                │
├─────────────────────────────────┤
│ [I Accept & Start Exam] [Back]  │
└─────────────────────────────────┘
```

### 2. Live Proctoring Panel

```
┌──────────────────────────────────────┐
│ 👁️ EXAM MONITORING ACTIVE            │
│              [LIVE PROCTORING]        │
├──────────────────────────────────────┤
│ [  Camera Feed Video  ]              │
│ 40px × 40px × 40px × 40px           │
├──────────────────────────────────────┤
│ 📷 Camera ON | 🎙️ Mic OK |           │
│ 🎯 Focused | ⚠️ Alerts: 2            │
├──────────────────────────────────────┤
│ 🔔 Unusual noise detected           │
│ 🔔 Please keep focus on exam        │
├──────────────────────────────────────┤
│ ⚠️ 100% Secure & Encrypted          │
│ Enterprise-grade security            │
└──────────────────────────────────────┘
```

### 3. Violation Warning

```
┌──────────────────────────────────────┐
│ 🟠 Multiple Suspicious Activities    │
├──────────────────────────────────────┤
│ You have 3 suspicious activities     │
│ recorded. Your exam will be          │
│ terminated if this continues.        │
│                                      │
│ Please ensure:                       │
│ • Quiet environment                  │
│ • Keep focus on exam window          │
│ • Maintain fullscreen mode           │
└──────────────────────────────────────┘
```

---

## 🔐 Privacy & Data Security

### Data Collected

During exam, the platform collects:
```
Personal Data:
✓ Full name
✓ Email address
✓ Exam ID and timestamp

Behavioral Data:
✓ Camera/video feed
✓ Microphone/audio feed
✓ Mouse and keyboard inputs
✓ Window switching events
✓ Proctoring violations

Exam Data:
✓ Questions answered
✓ Time per question
✓ Final answers
✓ Score
✓ Flag events
```

### Data Protection

```
✓ Encrypted transmission (HTTPS)
✓ Encrypted storage (AES-256)
✓ Access logs maintained
✓ Regular backups
✓ GDPR compliant deletion
✓ 90-day retention (after exam completion)
```

### User Rights

```
Users can:
✓ Request data export
✓ Ask for deletion (after grace period)
✓ Review proctoring logs
✓ Appeal exam termination
✓ Request manual review

Users cannot:
✗ Disable monitoring mid-exam
✗ Delete recordings
✗ Request data deletion during exam
```

---

## 🛠️ Implementation Details

### Browser APIs Used

```javascript
// Camera Access
navigator.mediaDevices.getUserMedia({ video: true })

// Microphone Access
navigator.mediaDevices.getUserMedia({ audio: true })

// Audio Analysis
audioContext = new AudioContext()
analyser = audioContext.createAnalyser()

// Fullscreen
document.documentElement.requestFullscreen()
document.addEventListener('fullscreenchange', ...)

// Window Focus
window.addEventListener('blur', ...)
window.addEventListener('focus', ...)

// Mouse Tracking
window.addEventListener('mousemove', ...)
```

### Supported Browsers

```
✓ Chrome/Edge 86+
✓ Firefox 82+
✓ Safari 14+
✓ Android Chrome 86+
✓ iOS Safari 14+

Requirements:
✓ HTTPS only (for security APIs)
✓ Camera/Microphone permissions
✓ JavaScript enabled
✓ WebRTC support
✓ Web Audio API support
```

---

## 📊 Reporting & Analytics

### Admin Dashboard Features

```
Exam Statistics:
- Total attempts
- Average score
- Pass/fail rate
- Termination rate
- Cheating detection rate

Per-Student Reports:
- Exam completion time
- Proctoring violations
- Suspicious activity count
- Recommended action
- Manual review flag

Audit Trail:
- Complete event log
- Timestamp for each event
- Suspicious activity moments
- Video/audio links
- Manual review notes
```

### Proctoring Logs

Each exam generates logs with:

```json
{
  "examId": "exam_123",
  "studentId": "user_456",
  "startTime": "2024-05-29T10:00:00Z",
  "endTime": "2024-05-29T11:30:00Z",
  "totalSuspiciousActivities": 3,
  "violations": [
    {
      "type": "window_blur",
      "timestamp": "10:05:32",
      "duration": "3s"
    },
    {
      "type": "noise_detected",
      "timestamp": "10:15:45",
      "level": 85
    },
    {
      "type": "fullscreen_exit",
      "timestamp": "10:45:12",
      "duration": "5s"
    }
  ],
  "status": "COMPLETED",
  "score": 85,
  "passed": true,
  "flagged": false
}
```

---

## ❌ Disqualification & Appeals

### Automatic Disqualification

Student is automatically disqualified if:
```
1. 6+ suspicious activities in single exam
2. Camera/audio disabled/blocked
3. Repeated fullscreen violations
4. Evidence of collaboration detected
5. Exam content shared externally
```

### Manual Review

Cases flagged for manual review:
```
• Borderline violation counts (4-5)
• Unusual but explainable activities
• Technical issues affecting monitoring
• Appeals and disputes
```

### Appeal Process

Students can appeal within 7 days:
```
1. Submit appeal form with exam ID
2. Provide explanation for activities
3. Request manual review of logs
4. Provide additional context/evidence
5. Await decision (48 hours)
```

---

## 🎓 Best Practices for Students

### Before Exam

```
✓ Test camera and microphone
✓ Ensure good lighting
✓ Clear your desk
✓ Close unnecessary applications
✓ Mute phone notifications
✓ Ensure stable internet
✓ Use headphones for questions
```

### During Exam

```
✓ Sit properly facing camera
✓ Keep eyes on screen
✓ Maintain quiet environment
✓ Don't look away from exam
✓ Keep desk in camera view
✓ Use keyboard/mouse only
✓ Don't pause/minimize window
```

### After Exam

```
✓ Don't share exam content
✓ Wait for official results
✓ Review feedback
✓ Request manual review if flagged
✓ Don't attempt retake
```

---

## 📞 Support & Troubleshooting

### Camera/Microphone Issues

**Problem:** Camera not accessible
```
Solution:
1. Check browser permissions
2. Allow camera in System Settings
3. Restart browser
4. Use different browser
5. Check antivirus blocking
```

**Problem:** Microphone too loud/quiet
```
Solution:
1. Adjust system volume
2. Check microphone settings
3. Test in system settings
4. Try different microphone
```

### Fullscreen Issues

**Problem:** Can't enter fullscreen
```
Solution:
1. Refresh page
2. Check browser extensions
3. Disable browser extensions
4. Try different browser
5. Check OS fullscreen settings
```

### Network Issues

**Problem:** Connection interrupted
```
Solution:
1. Check internet speed
2. Use wired connection
3. Move closer to router
4. Reduce network congestion
5. Contact support
```

---

## 🔄 Future Enhancements

Planned features:
```
[ ] AI face recognition
[ ] Gaze detection (eye tracking)
[ ] Keyboard analytics
[ ] Background environment verification
[ ] ID verification integration
[ ] Biometric authentication
[ ] Blockchain exam certificate
[ ] Multi-camera monitoring
[ ] Behavioral baseline analysis
[ ] Real-time AI proctoring
```

---

## 📝 Terms & Conditions

By taking an exam on Xpay IT Exams platform:

```
✓ You consent to monitoring
✓ You accept automatic termination
✓ You acknowledge one-attempt policy
✓ You agree to data collection
✓ You understand disqualification risk
✓ You waive retake requests
✓ You accept audit and review
```

---

**Last Updated:** May 2024
**Version:** 1.0
**Security Level:** Enterprise Grade
**Compliance:** GDPR, CCPA Ready
