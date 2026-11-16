# 🛡️ PHISHGUARD – COMPLETE PROJECT GUIDE, DOCUMENTATION & REPORT MATERIALS
**Intelligent Phishing URL Detection and Risk Analysis System**  
*VTU 7th Semester • Information Network and Security (INS) Mini Project*

---

## 📌 TABLE OF CONTENTS FOR REPORT

```text
                            TABLE OF CONTENTS

SL No.                                                        Page No

        ABSTRACT ................................................. I

1.      INTRODUCTION ............................................. 1
        1.1 Overview ............................................. 1
        1.2 Problem Statement & Objectives ....................... 1

2.      THEORY ................................................... 2
        2.1 Phishing Attack Vectors & Quishing ................... 2
        2.2 Heuristic Detection vs Blacklisting .................. 4

3.      SYSTEM DESIGN ............................................ 7
        3.1 System Architecture .................................. 7
        3.2 Heuristic Rules & Weight Matrix ...................... 8

4.      IMPLEMENTATION ........................................... 9
        4.1 Backend Engine (Flask & MongoDB) ..................... 9
        4.2 Frontend Dashboard (React) ........................... 10
        4.3 QR Code & Bulk Scanner Modules ....................... 11

5.      RESULTS .................................................. 12
        5.1 Test Cases & Detection Verdicts ...................... 12
        5.2 Dual-Engine Performance Analysis ..................... 16

6.      ADVANTAGES ............................................... 21

7.      LIMITATIONS .............................................. 22

8.      FUTURE SCOPE ............................................. 23

9.      CONCLUSION ............................................... 24

10.     REFERENCES ............................................... 25

11.     PROJECT REPOSITORY ....................................... 26
```

---

## 📝 COMPILED REPORT CONTENT SECTIONS

### ABSTRACT
Phishing attacks and social engineering campaigns remain among the most prevalent vectors for credential theft, financial fraud, and unauthorized perimeter intrusion. Conventional defense mechanisms rely heavily on static blacklist feeds, which fail against newly crafted zero-day phishing links and novel evasion techniques such as QR code phishing (Quishing), lookalike homograph brand spoofing, and excessive subdomain masking. To address these vulnerabilities, this project presents **PhishGuard**, an intelligent, proactive phishing URL detection and risk analysis system. Designed as a zero-execution framework, PhishGuard statically inspects target links without navigating to or executing untrusted code, eliminating drive-by download risks. The core engine deploys a ten-rule lexical and structural heuristic weight matrix to evaluate suspicious indicators—including raw IP hosts, deceptive brand impersonation, abused top-level domains (TLDs), and URI credential trickery—yielding an explainable risk index scaled from 0 to 100 alongside classified verdicts of Safe, Suspicious, or Phishing. To bridge novel and historical threat detection, the system implements a dual-engine architecture correlating autonomous heuristics with live Google Safe Browsing v4 threat feeds. Built on a decoupled stack featuring a modern React frontend dashboard, a lightweight Python Flask RESTful microservice, and MongoDB for persistent audit telemetry, PhishGuard supports single URL inspection, bulk CSV processing, safe QR code extraction, interactive cybersecurity awareness, and automated executive PDF report compilation. Empirical evaluations demonstrate sub-second latency with high precision in isolating simulated and real-world phishing vectors, presenting an effective, explainable layer of defense for modern network security.

**Keywords:** Phishing Detection, Network Security, Heuristic Analysis, Zero-Day Detection, Google Safe Browsing, Explainable Security, QR Phishing (Quishing), Risk Assessment.

---

### CHAPTER 1: INTRODUCTION

#### 1.1 Overview
In the contemporary digital era, the widespread adoption of cloud computing, online banking, and enterprise web applications has fundamentally transformed communication and commerce. However, this ubiquitous reliance on digital systems has significantly amplified the cyber-threat landscape. Among diverse attack vectors, social engineering—predominantly executed through **phishing**—remains the leading entry point exploited by adversaries to orchestrate corporate data breaches, financial fraud, and credential theft. By impersonating trusted organizations, financial institutions, and enterprise portals, attackers manipulate human trust to intercept sensitive credentials and personal data.

Conventional perimeter security solutions and secure email gateways rely primarily on **reactive blacklist databases**. While effective against known, established malicious sites, static blacklists exhibit an unavoidable latency gap of several hours to days between the initial launch of an attack and its public indexation. Cybercriminals actively exploit this window by deploying short-lived, **zero-day phishing links** that are discarded before detection occurs. Furthermore, adversaries increasingly employ advanced evasion techniques—including brand typosquatting, raw IP hosting, disposable top-level domains (TLDs), excessive subdomain nesting, and **Quishing (QR code phishing)**—which effortlessly bypass traditional text-based security filters.

To address these vulnerabilities, **PhishGuard** is developed as an intelligent, zero-execution phishing URL detection and risk analysis system. Designed on a proactive security paradigm, PhishGuard statically inspects target links without navigating to or executing untrusted code, completely eliminating drive-by malware infection risks. The platform combines a calibrated **ten-rule heuristic feature weight matrix** with live **Google Safe Browsing v4** threat intelligence feeds to deliver an explainable risk score (0–100) and categorized verdicts (Safe, Suspicious, or Phishing). Featuring automated QR code decoding, bulk CSV feed processing, and audit-ready report compilation, PhishGuard provides a robust, transparent, and multi-layered defense system against modern web-based deception.

#### 1.2 Problem Statement
Conventional reactive blacklists fail to detect short-lived zero-day phishing attacks during their initial launch window, while modern adversaries evade filters using brand typosquatting, raw IP hosts, and optical QR codes. Furthermore, existing scanners lack transparent risk explainability and safe zero-execution guarantees. Hence, there is a critical need for an automated, proactive heuristic framework that accurately identifies, weights, and explains deceptive URL threats in real time.

---

### CHAPTER 2: THEORY

#### 2.1 PHISHING ATTACK VECTORS & QUISHING
Phishing is a deceptive social engineering technique in which an adversary masquerades as a trusted entity to manipulate victims into revealing confidential credentials, session tokens, personal identity details, or financial data. Modern threat actors leverage sophisticated structural and lexical manipulation within URLs to bypass perimeter firewalls and deceive human cognitive verification. The primary URL-based phishing vectors include:

1. **Typosquatting and Homograph Spoofing:** Attackers register lookalike domain names that visually mimic legitimate brands by exploiting typographical errors or subtle character substitutions (e.g., substituting the lowercase letter `l` with a capital `I` or digit `1`, such as `paypaI.com` or `goog1e.com`).
2. **Subdomain Masking and Brand Stacking:** Attackers create deep subdomain hierarchies on an inexpensive domain (e.g., `chase.com.security-update.xyz`). Unsuspecting users observe the trusted brand name at the start of the address without realizing the authoritative root domain is actually `security-update.xyz`.
3. **URL Shortening and Redirection Obfuscation:** By passing malicious links through public URL shortening services (such as Bitly, TinyURL, or t.co), attackers conceal the true destination domain, token parameters, and suspicious top-level domains.
4. **URI Authentication Redirection (`@` Symbol Trick):** Based on standard URI syntax (RFC 3986), any text preceding an `@` symbol in a URL is interpreted by web protocols as user authentication credentials rather than the destination host (e.g., `http://paypal.com@attacker-server.com/signin`).
5. **Raw IP Address Hosting:** Threat actors directly host credential-harvesting landing pages on raw IPv4 addresses (e.g., `http://192.168.1.100/auth`) rather than registering domain names, evading WHOIS and domain reputation checks.

**Quishing (QR Code Phishing)** is an emerging social engineering attack vector where threat actors embed malicious, credential-harvesting URLs inside optical 2D Quick Response (QR) barcodes instead of conventional plain-text hyperlinks. Traditional secure email gateways and perimeter filters are primarily engineered to parse textual content and standard HTML `<a>` tags. Consequently, because an encoded URL is stored purely as a graphical pixel matrix, traditional security filters treat the QR code as an innocuous image attachment, allowing the hidden phishing payload to bypass perimeter inspection undetected.

Threat actors commonly distribute these fraudulent QR codes through spear-phishing emails, spoofed multi-factor authentication (MFA) reset alerts, and digital PDF invoices. Once delivered, victims are prompted to scan the code using personal smartphones or mobile devices. This creates a severe security blindspot because mobile endpoints frequently operate outside corporate firewalls, VPNs, and endpoint detection and response (EDR) controls, directly exposing users to credential-harvesting portals and unauthorized account takeovers.

#### 2.2 HEURISTIC DETECTION VS BLACKLISTING
In modern cybersecurity, automated phishing identification systems rely on two fundamental detection paradigms: **reactive blacklist-based verification** and **proactive heuristic-based feature evaluation**.

**Comparison Matrix: Blacklist vs Heuristic Detection**

| Evaluation Parameter | Blacklist-Based Detection | Heuristic-Based Detection (PhishGuard) |
| :--- | :--- | :--- |
| **Detection Nature** | Reactive (Post-attack discovery) | Proactive (Real-time lexical inspection) |
| **Zero-Day Threat Defense** | Ineffective (Blind during initial attack hours) | Highly Effective (Identifies novel structural patterns) |
| **Verification Basis** | Centralized reputation databases | Lexical, structural, and semantic rule weights |
| **False Positive Rate** | Near zero | Low (Subject to rule calibration) |
| **Evaluation Latency** | Network lookup dependent | Sub-second local execution (< 15 ms) |
| **Execution Safety** | Safe (Database lookup) | Safe (Static, zero-execution parsing) |
| **Explainability** | Opaque (Binary blocked / unblocked) | High (Transparent rule weights and evidence) |

---

### CHAPTER 5: RESULTS & VIVA Q&A GUIDE

#### How to Explain the Dual-Engine Result:
- **Question:** *"Why does the left card show 'PHISHING (5/10)' while Google Safe Browsing shows '0 Threat Matches' for `paypal-login-verify.example.com`?"*
- **Answer:** *"Google Safe Browsing is a reactive global blacklist that only indexes domains that have already been reported, analyzed, and crawled. Because `example.com` is a simulated test domain, it has never been reported to Google. However, PhishGuard's proactive heuristic engine analyzes the anatomy of the URL in real time—detecting brand spoofing (+3), credential path keywords (+1), and hyphenated domain structure (+1)—intercepting the novel zero-day attack before it ever appears on global blacklists."*

#### Screenshots to Attach in Word Report:
1. **Figure 5.1:** `URL Scanner` on `https://github.com` (Safe 0/100)
2. **Figure 5.2:** `URL Scanner` on `https://secure-login.portal-update.xyz/account` (Suspicious 30/100)
3. **Figure 5.3:** `URL Scanner` on `http://192.168.1.50/paypaI-security-verify.top/login@victim.com` (Phishing 90/100)
4. **Figure 5.4:** `QR Code Scanner` uploading a QR image and showing safe extracted URL.
5. **Figure 5.5:** `Bulk Scanner` showing batch results table.
6. **Figure 5.6:** `Threat Intelligence` dual engine comparison card.
7. **Figure 5.7:** `Analytics` dashboard charts and rule trigger frequencies.
8. **Figure 5.8:** `Reports` printable executive PDF dossier.

---

## 🚀 EXECUTION COMMANDS (HOW TO RUN)

### Terminal 1 – Backend (Flask API)
```powershell
cd C:\PhishGuard\backend
myenv\Scripts\activate
python app.py
```
> Starts on `http://127.0.0.1:5000`.

### Terminal 2 – Frontend (React + Vite)
```powershell
cd C:\PhishGuard\frontend
npm run dev
```
> Opens on `http://localhost:5173`.
