# 🛡️ PhishGuard – Cyber Intelligence Command Center

**Intelligent Phishing URL Detection and Risk Analysis System**  
*VTU 7th Semester &bull; Information Network and Security (INS) Mini Project*

---

## 🌟 Executive Overview
PhishGuard is an enterprise-grade cybersecurity SaaS dashboard designed to detect, analyze, and neutralize deceptive URL vectors before user interaction. Combining a zero-execution heuristic detection engine with global threat intelligence feeds, PhishGuard provides actionable, explainable risk scoring without ever browsing or executing untrusted URLs.

### 🎨 Visual Concept: Cyber Intelligence Command Center
- **Theme:** Deep Midnight Navy (`#060b18`), Electric Cyan (`#00f0ff`), Teal, and Violet glassmorphism
- **Safety:** Pure static lexical and structural analysis — zero network redirection or drive-by hazard
- **Explainability:** 0–100 calibrated risk index with individual rule weights and defensive recommendations

---

## 🚀 Key Modules & Capabilities

1. **Cyber Command Dashboard**
   - Live telemetry KPI cards (Total Scans, Safe Sites, Suspicious Links, Confirmed Phishing)
   - Quick Heuristic Intercept input for immediate link evaluation
   - Threat distribution proportional breakdown
   - 7-day scanning volume temporal chart
   - Recent threats real-time alert feed

2. **Explainable Risk URL Scanner**
   - Circular Risk Score Gauge (0–100 scale)
   - Tri-verdict classification: **Safe**, **Suspicious**, or **Phishing**
   - Deep Heuristic Rule Breakdown showing individual weights and risk contributions
   - Presets for 1-click viva testing (Safe, Suspicious, Phishing)
   - Actionable incident response recommendations
   - Printable executive report generation

3. **QR Code Security Scanner (Quishing Defense)**
   - Upload any QR code image (PNG, JPG, JPEG)
   - Decodes encoded URLs safely without opening or visiting them
   - Pushes extracted links directly through the deep heuristic engine

4. **Bulk URL Scanner & CSV Feeds**
   - Paste multiple URLs simultaneously
   - Drag-and-drop CSV upload with automatic URL extraction
   - Export scan verdicts and risk weights to downloadable CSV files
   - Batch report printing for audits

5. **Threat Intelligence Correlation**
   - Dual-engine architecture: Independent Heuristic Engine + Google Safe Browsing v4
   - Side-by-side engine comparison test
   - Graceful fallback when API keys are unconfigured (ensures 100% offline demo readiness)

6. **Persistent Scan History**
   - Audit trail backed by MongoDB with automatic in-memory fallback
   - Filter by verdict (Safe, Suspicious, Phishing), search by URL, sort by score/date
   - One-click CSV audit log export

7. **Risk Analytics & Telemetry**
   - Aggregated volume and attack interception rate
   - Top-triggered heuristic rule frequency vectors
   - Temporal velocity trends and proportional ratio visualization

8. **Security Awareness Academy**
   - Interactive 5-question Phishing Assessment
   - Tests knowledge on deceptive TLDs, `@` URI syntax tricks, Quishing, homograph brand spoofing, and drive-by hazards
   - Instant scoring, explanations, and retake functionality

9. **Executive PDF Reports**
   - High-fidelity printable cybersecurity dossier
   - Formatted risk metadata, triggered rules, threat indicators, and defensive actions

---

## ⚙️ Local Setup & Execution

### Prerequisites
- **Python 3.10+**
- **Node.js 18+** & npm
- *(Optional)* MongoDB (system automatically uses resilient in-memory storage if MongoDB is offline)

---

### Step 1: Backend Setup (Terminal 1)
```bash
cd backend

# Create and activate virtual environment (Windows)
python -m venv myenv
myenv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask API server (starts on http://localhost:5000)
python app.py
```

*(Optional)* To configure Google Safe Browsing, create `backend/.env`:
```env
GOOGLE_SAFE_BROWSING_KEY=your_api_key_here
MONGO_URI=mongodb://localhost:27017/phishguard
```
*Note: If no API key is provided, PhishGuard runs seamlessly using its autonomous heuristic engine.*

---

### Step 2: Frontend Setup (Terminal 2)
```bash
cd frontend

# Install packages
npm install

# Start Vite development server
npm run dev
```

Open your browser at: **`http://localhost:5173`**

---

## 🧪 Quick Test Samples (For Demonstration & Viva)

| Test Sample | Target URL | Expected Verdict | Triggered Indicators |
| :--- | :--- | :--- | :--- |
| **Safe Site** | `https://github.com/torvalds/linux` | **Safe (0/100)** | Zero rules triggered |
| **Suspicious Link** | `https://secure-login.portal-update.xyz/account` | **Suspicious (30/100)** | Suspicious TLD (.xyz) + Path keyword |
| **Phishing Link** | `http://192.168.1.50/paypaI-security-verify.top/login@victim.com` | **Phishing (90/100)** | Raw IP host + Brand spoofing + Suspicious TLD + '@' redirect |

---

## 🏛️ Academic Information
- **Project:** PhishGuard – Intelligent Phishing URL Detection and Risk Analysis System
- **Curriculum:** VTU 7th Semester &bull; Information Network and Security (INS) Mini Project
- **Architecture:** Decoupled React 19 Frontend + Python Flask REST Microservice + MongoDB / In-Memory Audit Ledger
