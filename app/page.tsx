"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client (Replace with your actual keys later)
const supabaseUrl = "https://your-project.supabase.co";
const supabaseKey = "your-anon-key";
const supabase = createClient(supabaseUrl, supabaseKey);

// Fallback questions (used if Supabase isn't configured yet)
const fallbackQuestions = [
  { id: 1, category: "Misrepresentation", question_text: "How should you accurately describe the QNET business?", option_a: "A salaried job", option_b: "An independent direct selling opportunity", option_c: "A passive investment", option_d: "A franchise", correct_answer: "B", explanation: "It is an independent direct selling opportunity." },
  { id: 2, category: "Misappropriation", question_text: "Can you substitute a product chosen by a downline with another of equal value?", option_a: "Yes, if same value", option_b: "No, must purchase exactly what was requested", option_c: "Yes, if better for them", option_d: "Yes, if informed after", correct_answer: "B", explanation: "Substituting products without explicit prior approval is a violation." },
  { id: 3, category: "Minors", question_text: "Can a minor hold a TC in trust until they turn 18?", option_a: "Yes, if upline manages", option_b: "No, cannot be held by a minor", option_c: "Yes, but no commissions", option_d: "Yes, with birth cert", correct_answer: "B", explanation: "Registering minors is strictly prohibited." }
];

export default function Home() {
  const [questions, setQuestions] = useState(fallbackQuestions);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    caseSummary: "",
    policyRef: "",
    section1Title: "Section 1: Product Authorization & Explicit Prior Approval",
    section1Text: "When a prospect or downline provides funds for a specific QNET product, you are acting in a position of trust. You must purchase exactly the product they have chosen and requested.",
    redLines1: "Do NOT purchase products for an IR without explicit prior approval.\nDo NOT place an order or make unauthorized product collection on behalf of an IR."
  });

  // Fetch questions from Supabase on load (if configured)
  useEffect(() => {
    if (supabaseUrl !== "https://your-project.supabase.co") {
      async function fetchQuestions() {
        const { data, error } = await supabase.from("refresher_questions").select("*");
        if (data && data.length > 0) setQuestions(data);
      }
      fetchQuestions();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionSelect = (qId) => {
    if (selectedQuestions.includes(qId)) {
      setSelectedQuestions(selectedQuestions.filter((id) => id !== qId));
    } else if (selectedQuestions.length < 10) {
      setSelectedQuestions([...selectedQuestions, qId]);
    } else {
      alert("You can only select 10 questions.");
    }
  };

  const generateHTML = () => {
    if (selectedQuestions.length !== 10) {
      alert("Please select exactly 10 questions.");
      return;
    }

    const selectedQs = questions.filter((q) => selectedQuestions.includes(q.id));

    // 1. Build Quiz HTML
    let quizHTML = "";
    selectedQs.forEach((q, index) => {
      quizHTML += `
        <div class="question">
          <p>${index + 1}. ${q.question_text}</p>
          <label><input type="radio" name="q${index + 1}" value="A"> A) ${q.option_a}</label>
          <label><input type="radio" name="q${index + 1}" value="B"> B) ${q.option_b}</label>
          <label><input type="radio" name="q${index + 1}" value="C"> C) ${q.option_c}</label>
          <label><input type="radio" name="q${index + 1}" value="D"> D) ${q.option_d}</label>
        </div>
      `;
    });

    // 2. Build Correct Answers Object for JS
    let correctAnswersObj = {};
    selectedQs.forEach((q, index) => {
      correctAnswersObj[`q${index + 1}`] = q.correct_answer;
    });

    // 3. Build Correct Answers Display for Fail Screen
    let answersDisplay = "<ol>";
    selectedQs.forEach((q, index) => {
      answersDisplay += `<li><strong>${q.correct_answer}) ${q["option_" + q.correct_answer.toLowerCase()]}</strong> — ${q.explanation}</li>`;
    });
    answersDisplay += "</ol>";

    // 4. Build Red Lines List
    let redLinesList = formData.redLines1.split("\n").filter(l => l.trim() !== "").map(line => `<li>${line}</li>`).join("");

    // 5. Construct Full HTML Template
    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Qnet Policies & Procedures (P&P) Refresher Module</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #2c3e50; background: #f4f6f9; padding: 20px; }
  .container { max-width: 900px; margin: 0 auto; background: #fff; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); overflow: hidden; }
  header { background: linear-gradient(135deg, #1a3a6c 0%, #0d213d 100%); color: #fff; padding: 30px 40px; text-align: center; }
  header h1 { font-size: 1.8em; margin-bottom: 8px; }
  header .subtitle { font-size: 0.95em; opacity: 0.9; }
  .content { padding: 40px; }
  .intro { background: #eef3fb; border-left: 5px solid #1a3a6c; padding: 20px; border-radius: 6px; margin-bottom: 25px; }
  .intro p { margin-bottom: 12px; }
  .resource-note { font-style: italic; color: #555; background: #fafafa; padding: 12px 16px; border: 1px dashed #ccc; border-radius: 6px; margin-bottom: 30px; font-size: 0.92em; }
  h2.section-title { color: #1a3a6c; border-bottom: 2px solid #e0e6ed; padding-bottom: 10px; margin: 30px 0 15px; font-size: 1.4em; }
  .section { margin-bottom: 35px; }
  .section p { margin-bottom: 12px; }
  .red-lines-btn { background: #c0392b; color: #fff; border: none; padding: 12px 22px; border-radius: 6px; cursor: pointer; font-size: 0.98em; font-weight: 600; margin: 12px 0; }
  .red-lines-btn:hover { background: #962d22; }
  .red-lines-content { display: none; background: #fdecea; border: 1px solid #f5c6cb; border-left: 5px solid #c0392b; padding: 18px 22px; border-radius: 6px; margin-top: 10px; }
  .red-lines-content h4 { color: #c0392b; margin-bottom: 10px; font-size: 1.05em; }
  .red-lines-content ul { list-style: none; padding-left: 0; }
  .red-lines-content ul li { padding: 6px 0 6px 28px; position: relative; border-bottom: 1px solid #f8d7da; font-size: 0.95em; }
  .red-lines-content ul li:last-child { border-bottom: none; }
  .red-lines-content ul li::before { content: "✗"; position: absolute; left: 4px; color: #c0392b; font-weight: bold; font-size: 1.1em; }
  .policy-ref { background: #f0f4f8; border: 1px solid #d6dee8; padding: 10px 14px; border-radius: 5px; margin-top: 12px; font-size: 0.88em; color: #34495e; }
  .quiz-section { background: #fafbfc; padding: 25px; border-radius: 8px; border: 1px solid #e0e6ed; margin-top: 30px; }
  .quiz-section h2 { color: #1a3a6c; margin-bottom: 8px; }
  .quiz-instructions { font-size: 0.9em; color: #7f8c8d; margin-bottom: 20px; }
  .question { background: #fff; padding: 16px 18px; border: 1px solid #e5ebf0; border-radius: 6px; margin-bottom: 15px; }
  .question p { font-weight: 600; margin-bottom: 10px; color: #2c3e50; }
  .question label { display: block; padding: 8px 12px; margin: 4px 0; border-radius: 4px; cursor: pointer; font-size: 0.95em; }
  .question label:hover { background: #f0f4f8; }
  .question input[type="radio"] { margin-right: 10px; }
  .submit-btn { background: #1a3a6c; color: #fff; border: none; padding: 14px 30px; border-radius: 6px; cursor: pointer; font-size: 1em; font-weight: 600; margin-top: 15px; }
  .submit-btn:hover { background: #0d213d; }
  .submit-btn:disabled { background: #95a5a6; cursor: not-allowed; }
  .result-box { padding: 25px; border-radius: 8px; margin-top: 20px; display: none; }
  .fail-box { background: #fdecea; border: 2px solid #c0392b; color: #c0392b; }
  .pass-box { background: #e8f5e9; border: 2px solid #27ae60; color: #1e7e34; }
  .result-box h3 { font-size: 1.3em; margin-bottom: 12px; }
  .fail-box .score { font-size: 1.5em; font-weight: bold; margin: 10px 0; }
  .correct-answers { background: #fff; padding: 15px; border-radius: 5px; margin: 15px 0; color: #2c3e50; }
  .correct-answers h4 { color: #c0392b; margin-bottom: 10px; }
  .correct-answers ol { margin-left: 20px; }
  .try-again-link { display: inline-block; margin-top: 10px; color: #c0392b; text-decoration: underline; cursor: pointer; font-weight: 600; }
  .warning-box { background: #fff9e6; border: 2px solid #f1c40f; padding: 20px; border-radius: 8px; margin-top: 20px; color: #7d6608; }
  .warning-box h3 { color: #b7950b; margin-bottom: 12px; }
  .step { background: #fff; padding: 15px; border-radius: 5px; margin: 12px 0; border-left: 4px solid #f1c40f; }
  .step strong { color: #1a3a6c; }
  .confirmation-row { margin: 12px 0; display: flex; align-items: center; gap: 10px; }
  .email-form { margin-top: 15px; }
  .email-form input[type="text"] { width: 100%; padding: 10px; margin: 6px 0; border: 1px solid #ccc; border-radius: 4px; background: #f0f4f8; color: #555; }
  .token-box { background: #e8f4f8; border: 2px dashed #1a3a6c; padding: 10px; text-align: center; margin: 15px 0; border-radius: 6px; }
  .token-box span { font-weight: bold; font-size: 1.4em; letter-spacing: 3px; color: #1a3a6c; }
  .email-btn { background: #27ae60; color: #fff; border: none; padding: 12px 22px; border-radius: 6px; cursor: not-allowed; font-size: 0.98em; font-weight: 600; margin-top: 10px; opacity: 0.5; pointer-events: none; text-decoration: none; display: inline-block; }
  .email-btn.active { opacity: 1; pointer-events: auto; cursor: pointer; }
  footer { text-align: center; padding: 20px; color: #7f8c8d; font-size: 0.85em; border-top: 1px solid #e0e6ed; }
</style>
</head>
<body>
<div class="container">
  <header>
    <h1>Qnet Policies &amp; Procedures (P&amp;P) Refresher Module</h1>
    <div class="subtitle">Network Integrity Department</div>
  </header>
  <div class="content">
    <div class="intro">
      <p>Dear <strong>${formData.name}</strong> (<strong>${formData.id}</strong>),</p>
      <p>Welcome. You have been assigned this mandatory training module by the Network Integrity Department in response to a complaint filed against you. ${formData.caseSummary}</p>
    </div>
    <div class="resource-note">Note: Please refer to the attached QNET Policies &amp; Procedures (P&amp;P) &amp; Qnet Code Of Ethics document for full details.</div>
    <div class="section">
      <h2 class="section-title">${formData.section1Title}</h2>
      <p>${formData.section1Text}</p>
      <button class="red-lines-btn" data-target="rl1">⚠ Click to see the Red Lines</button>
      <div class="red-lines-content" id="rl1">
        <h4>Red Lines — What NOT to Do:</h4>
        <ul>${redLinesList}</ul>
      </div>
      <div class="policy-ref"><strong>Policy Reference:</strong> ${formData.policyRef}</div>
    </div>
    <div class="quiz-section">
      <h2>Compliance Quiz</h2>
      <p class="quiz-instructions">Please answer all 10 questions. You must score <strong>100%</strong> to pass this module.</p>
      <form id="quizForm">
        ${quizHTML}
        <button type="submit" class="submit-btn" id="submitBtn" disabled>Submit Quiz</button>
      </form>
      <div class="result-box fail-box" id="failScreen">
        <h3>❌ Quiz Not Passed</h3>
        <p>You did not achieve the required score of 100%.</p>
        <div class="score" id="failScore">Your Score: 0 / 10</div>
        <div class="correct-answers">
          <h4>Correct Answers:</h4>
          ${answersDisplay}
        </div>
        <a class="try-again-link" id="resetLink">↻ Click here to try again</a>
      </div>
      <div class="result-box pass-box" id="passScreen">
        <h3>✅ Quiz Passed!</h3>
        <p>To finalize your compliance acknowledgement, please complete the <strong>TWO-STEP completion process</strong> below.</p>
        <div class="warning-box">
          <h3>⚠ TWO-STEP COMPLETION PROCESS — Mandatory</h3>
          <div class="step">
            <p><strong>Step 1: Generate &amp; Send the Completion Email</strong></p>
            <div class="confirmation-row">
              <input type="checkbox" id="confirmCheck">
              <label for="confirmCheck">I confirm that I have read, understood, and will comply with the QNET P&amp;P and Code of Ethics at all times.</label>
            </div>
            <div class="email-form">
              <label>Distributor Name:</label>
              <input type="text" id="distName" value="${formData.name}" readonly>
              <label>Distributor ID:</label>
              <input type="text" id="distID" value="${formData.id}" readonly>
              <div class="token-box" id="tokenBox" style="display:none;">
                Your Completion Token: <span id="tokenDisplay"></span>
              </div>
              <a class="email-btn" id="emailBtn" href="#">📧 Click here to generate the completion email</a>
            </div>
          </div>
          <div class="step">
            <p><strong>Step 2: Send the auto generated module completion email</strong></p>
            <p>Go to the module completion confirmation email that is automatically generated and click "SEND" / "SEND EMAIL". This step is essential to notify Network Integrity Department (NID) that you've completed the refresher module.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer>© QNET Network Integrity Department | Confidential — For Distributor Training Purposes Only</footer>
</div>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    var correctAnswers = ${JSON.stringify(correctAnswersObj)};
    var quizForm = document.getElementById('quizForm');
    var submitBtn = document.getElementById('submitBtn');
    quizForm.addEventListener('change', function() {
      var allAnswered = true;
      for (var i = 1; i <= 10; i++) {
        if (!quizForm.querySelector('input[name="q' + i + '"]:checked')) allAnswered = false;
      }
      submitBtn.disabled = !allAnswered;
    });
    quizForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var score = 0;
      for (var i = 1; i <= 10; i++) {
        var checked = quizForm.querySelector('input[name="q' + i + '"]:checked');
        if (checked && checked.value === correctAnswers['q' + i]) score++;
      }
      document.getElementById('failScore').innerText = "Your Score: " + score + " / 10";
      if (score === 10) {
        document.getElementById('failScreen').style.display = 'none';
        document.getElementById('passScreen').style.display = 'block';
        document.getElementById('passScreen').scrollIntoView({ behavior: 'smooth' });
      } else {
        document.getElementById('failScreen').style.display = 'block';
        document.getElementById('passScreen').style.display = 'none';
        document.getElementById('failScreen').scrollIntoView({ behavior: 'smooth' });
      }
    });
    function generateToken() {
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var token = '';
      for (var i = 0; i < 6; i++) { token += chars.charAt(Math.floor(Math.random() * chars.length)); }
      return token;
    }
    var checkbox = document.getElementById('confirmCheck');
    var emailBtn = document.getElementById('emailBtn');
    var tokenBox = document.getElementById('tokenBox');
    var tokenDisplay = document.getElementById('tokenDisplay');
    checkbox.addEventListener('change', function() {
      if (checkbox.checked) {
        var token = generateToken();
        tokenDisplay.innerText = token;
        tokenBox.style.display = 'block';
        var name = document.getElementById('distName').value;
        var id = document.getElementById('distID').value;
        var subject = "[COMPLETION LOG - TOKEN: " + token + "] " + id + " QNET P&P Refresher";
        var body = "Dear Network Integrity Team,\\n\\nI, " + name + " (Distributor ID: " + id + "), hereby confirm that I have successfully completed the Qnet P&P & Red Lines Refresher.\\n\\nRegards,\\n" + name + "\\nDistributor ID: " + id;
        var mailtoLink = "mailto:network.integrity@qnet.net?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        emailBtn.href = mailtoLink;
        emailBtn.classList.add('active');
      } else {
        emailBtn.classList.remove('active');
        emailBtn.href = '#';
        tokenBox.style.display = 'none';
      }
    });
    document.getElementById('resetLink').addEventListener('click', function() {
      var radios = quizForm.querySelectorAll('input[type="radio"]');
      radios.forEach(function(r) { r.checked = false; });
      document.getElementById('failScreen').style.display = 'none';
      document.getElementById('passScreen').style.display = 'none';
      submitBtn.disabled = true;
      if (checkbox) checkbox.checked = false;
      if (emailBtn) { emailBtn.classList.remove('active'); emailBtn.href = '#'; }
      if (tokenBox) tokenBox.style.display = 'none';
      document.querySelector('.quiz-section').scrollIntoView({ behavior: 'smooth' });
    });
  });
<\/script>
</body>
</html>`;

    // Download the HTML file
    const blob = new Blob([htmlTemplate], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${formData.id}_training.html`;
    link.click();
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#1a3a6c" }}>QNET Refresher Module Generator</h1>
      
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <h3 style={{ borderBottom: "2px solid #e0e6ed", paddingBottom: "10px" }}>Distributor Details</h3>
        <input name="name" placeholder="Distributor Name" onChange={handleChange} style={{ width: "100%", marginBottom: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
        <input name="id" placeholder="Distributor ID" onChange={handleChange} style={{ width: "100%", marginBottom: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
        <textarea name="caseSummary" placeholder="Case Summary / Violation Description" onChange={handleChange} style={{ width: "100%", marginBottom: "10px", padding: "8px", height: "80px", borderRadius: "4px", border: "1px solid #ccc" }} />
        
        <h3 style={{ borderBottom: "2px solid #e0e6ed", paddingBottom: "10px", marginTop: "20px" }}>Training Content</h3>
        <input name="section1Title" value={formData.section1Title} onChange={handleChange} style={{ width: "100%", marginBottom: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
        <textarea name="section1Text" value={formData.section1Text} onChange={handleChange} style={{ width: "100%", marginBottom: "10px", padding: "8px", height: "100px", borderRadius: "4px", border: "1px solid #ccc" }} />
        <textarea name="redLines1" value={formData.redLines1} onChange={handleChange} placeholder="Red Lines (Press Enter after each line)" style={{ width: "100%", marginBottom: "10px", padding: "8px", height: "100px", borderRadius: "4px", border: "1px solid #ccc" }} />
        <input name="policyRef" placeholder="Policy References (e.g., P&P 4.06)" onChange={handleChange} style={{ width: "100%", marginBottom: "20px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />

        <h3 style={{ borderBottom: "2px solid #e0e6ed", paddingBottom: "10px" }}>Select 10 Questions ({selectedQuestions.length}/10 selected)</h3>
        <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", marginBottom: "20px", borderRadius: "4px" }}>
          {questions.map((q) => (
            <div key={q.id} style={{ marginBottom: "10px", paddingBottom: "10px", borderBottom: "1px solid #eee" }}>
              <label style={{ display: "flex", alignItems: "flex-start" }}>
                <input
                  type="checkbox"
                  checked={selectedQuestions.includes(q.id)}
                  onChange={() => handleQuestionSelect(q.id)}
                  disabled={!selectedQuestions.includes(q.id) && selectedQuestions.length >= 10}
                  style={{ marginRight: "10px", marginTop: "5px" }}
                />
                <span><strong>[{q.category}]</strong> {q.question_text}</span>
              </label>
            </div>
          ))}
        </div>

        <button onClick={generateHTML} style={{ background: "#27ae60", color: "white", padding: "15px 30px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>
          Generate & Download HTML Module
        </button>
      </div>
    </div>
  );
}