"use client";

import { useState } from "react";

// Define the Question Type
type QuestionType = {
  id: number;
  category: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: string;
  explanation: string;
};

// The 30 finalized standardized questions
const allQuestions: QuestionType[] = [
  { id: 1, category: "Misrepresentation", question_text: "How should you accurately describe the QNET business opportunity to a prospect?", option_a: "As a salaried job where they will be an employee of QNET.", option_b: "As an independent direct selling opportunity where income is based on individual performance and effort.", option_c: "As a passive investment scheme that yields guaranteed returns.", option_d: "As a franchise ownership under the QI Group.", correct_answer: "B", explanation: "As an independent direct selling opportunity where income is based on individual performance and effort." },
  { id: 2, category: "Misrepresentation", question_text: "Is it permissible to guarantee a prospect that they will make a specific amount of money if they join the business of QNET?", option_a: "Yes, if you are confident in their work ethic.", option_b: "Yes, as long as you put the guarantee in writing.", option_c: "No, making income projections or guarantees is strictly prohibited.", option_d: "No, unless they purchase the most expensive product package.", correct_answer: "C", explanation: "No, making income projections or guarantees is strictly prohibited." },
  { id: 3, category: "Misrepresentation", question_text: "Can you use your earned commission history (Q Account) as a marketing tool to entice prospects?", option_a: "Yes, it proves the business works.", option_b: "Yes, but only if you blur out your personal details.", option_c: "No, personal commission earnings must be treated as private and confidential.", option_d: "Yes, but only in private, one-on-one meetings.", correct_answer: "C", explanation: "No, personal commission earnings must be treated as private and confidential." },
  { id: 4, category: "Misrepresentation", question_text: "Presenting the QNET business as a 'get-rich-quick' scheme is:", option_a: "Allowed if the prospect is looking for fast money.", option_b: "Strictly forbidden and is a violation of Qnet’s P&P, Code Of Ethic & Red Lines.", option_c: "Allowed as long as you provide a written disclaimer.", option_d: "Encouraged to build excitement during the initial presentation.", correct_answer: "B", explanation: "Strictly forbidden and is a violation of Qnet’s P&P, Code Of Ethic & Red Lines." },
  { id: 5, category: "Misrepresentation", question_text: "What term should you avoid using when describing a distributor's role to a prospect?", option_a: "Independent Distributor", option_b: "Network Marketer", option_c: "Employee", option_d: "Direct Seller", correct_answer: "C", explanation: "Employee" },
  { id: 6, category: "Misrepresentation", question_text: "Can you represent yourself as an employee of QNET?", option_a: "Yes, if you have reached a high rank like Diamond Star.", option_b: "No, you are an independent distributor and must not claim to be an employee of Qnet.", option_c: "Yes, when dealing with government officials.", option_d: "No, unless you are conducting business outside your home country.", correct_answer: "B", explanation: "No, you are an independent distributor and must not claim to be an employee of Qnet." },
  { id: 7, category: "Misrepresentation", question_text: "Is it acceptable to impersonate an employee of RYTHM Foundation to prospect someone?", option_a: "Yes, because RYTHM Foundation is part of the QI Group.", option_b: "No, misusing QNET’s identity and affiliates by impersonating as an employee is a strict Red Lines violation.", option_c: "Yes, if the prospect is interested in charity work.", option_d: "No, unless you explicitly state you are a volunteer.", correct_answer: "B", explanation: "No, misusing QNET’s identity and affiliates by impersonating as an employee is a strict Red Lines violation." },
  { id: 8, category: "Misrepresentation", question_text: "If you make a prediction about a prospect's potential earnings, what must it reflect?", option_a: "The maximum possible earnings under perfect conditions.", option_b: "The earnings of the top earners in the company.", option_c: "What an average person carrying on the business would achieve and the effort required under normal circumstances.", option_d: "Your own personal earnings.", correct_answer: "C", explanation: "What an average person carrying on the business would achieve and the effort required under normal circumstances." },
  { id: 9, category: "Misrepresentation", question_text: "Using terms like 'fixed income', 'guaranteed returns', or 'sure profit' is:", option_a: "Standard practice in direct selling.", option_b: "Acceptable if the prospect asks for guarantees.", option_c: "Strictly prohibited as it misrepresents the business model.", option_d: "Acceptable if you are speaking to family members.", correct_answer: "C", explanation: "Strictly prohibited as it misrepresents the business model." },
  
  { id: 10, category: "Misappropriation", question_text: "A downline gives you money to purchase Product A, but you decide to buy Product B because it has the same Business Volume (BV). Is this allowed?", option_a: "Yes, as long as the products are of the same financial value.", option_b: "No, you must purchase exactly what the ID requested. Substituting products without explicit prior approval is a violation.", option_c: "Yes, if you think Product B is better for their business.", option_d: "Yes, but only if you inform them after the purchase.", correct_answer: "B", explanation: "No, you must purchase exactly what the ID requested. Substituting products without explicit prior approval is a violation." },
  { id: 11, category: "Misappropriation", question_text: "What is the rule regarding money given by a prospect or downline for product purchases?", option_a: "You can use it to pay for your own product purchases as long as you pay them back later.", option_b: "It must be used exclusively for the intended product purchase; misusing these funds is a severe violation.", option_c: "You can hold it in your personal bank account until you place a bulk order.", option_d: "You can use a portion of it for marketing expenses as long as you buy the product.", correct_answer: "B", explanation: "It must be used exclusively for the intended product purchase; misusing these funds is a severe violation." },
  { id: 12, category: "Misappropriation", question_text: "If a downline requests a refund for a product purchase and the company issues the refund to your account, what must you do?", option_a: "Keep the money as a service fee for handling their account.", option_b: "Use the money to purchase other products for your downline.", option_c: "Immediately return the refunded amount to the downline.", option_d: "Hold the money until the downline reaches a certain rank.", correct_answer: "C", explanation: "Immediately return the refunded amount to the downline." },
  { id: 13, category: "Misappropriation", question_text: "Can you collect 'deposits' or 'advances' from prospects for future, unspecified product purchases?", option_a: "No, collecting advances or deposits is a violation of QNET Red Lines.", option_b: "Yes, if you issue a personal receipt.", option_c: "Yes, as long as the amount is under $100.", option_d: "No, unless the prospect is a close relative.", correct_answer: "A", explanation: "No, collecting advances or deposits is a violation of QNET Red Lines." },
  { id: 14, category: "Misappropriation", question_text: "Upon completing a product purchase for a downline, what is your obligation to them?", option_a: "Keep the products until they have completed their training.", option_b: "Provide them with the purchase receipts and inform them on how to collect the product.", option_c: "Open the products and use them together.", option_d: "Register the products under your own name for safety.", correct_answer: "B", explanation: "Provide them with the purchase receipts and inform them on how to collect the product." },
  { id: 15, category: "Misappropriation", question_text: "If a downline gives you their Virtual Office login details to place an order, can you use their Q Account funds for your own purposes?", option_a: "Yes, if they gave you their password.", option_b: "No, stealing or misusing money/funds from a downline’s Q Account is strictly prohibited.", option_c: "Yes, as long as you leave a small balance.", option_d: "No, unless you have a verbal agreement.", correct_answer: "B", explanation: "No, stealing or misusing money/funds from a downline’s Q Account is strictly prohibited." },
  { id: 16, category: "Misappropriation", question_text: "What happens if you take money from a prospect under false pretenses (e.g., promising a job or investment)?", option_a: "It is acceptable if you eventually sign them up as a distributor.", option_b: "It is considered cheating/swindling and is a severe violation.", option_c: "It is a minor offense and only requires a warning.", option_d: "It is allowed if the prospect is not a resident of your country.", correct_answer: "B", explanation: "It is considered cheating/swindling and is a severe violation." },
  { id: 17, category: "Misappropriation", question_text: "Can you purchase products for an ID without their explicit prior approval?", option_a: "Yes, if you are their direct upline.", option_b: "Yes, if it helps them maintain their rank.", option_c: "No, purchasing products for an ID without their explicit prior approval is a Qnet Red Lines violation.", option_d: "Yes, if you use your own money.", correct_answer: "C", explanation: "No, purchasing products for an ID without their explicit prior approval is a Qnet Red Lines violation." },
  
  { id: 18, category: "Minors", question_text: "What is the age requirement to become a QNET Independent Distributor?", option_a: "16 years old with parental consent.", option_b: "You must be of legal age in the state, territory, or country of your domicile.", option_c: "15 years old if you have a valid government ID.", option_d: "18 years old globally, regardless of local laws.", correct_answer: "B", explanation: "You must be of legal age in the state, territory, or country of your domicile." },
  { id: 19, category: "Minors", question_text: "Is it permissible to register a minor using their parent’s or guardian’s ID without the parent's knowledge?", option_a: "Yes, if the minor has the money for the registration.", option_b: "Yes, if the parent is already a distributor in your downline.", option_c: "No, registering minors or anyone without legal capacity is strictly prohibited.", option_d: "No, unless the minor promises to tell their parents later.", correct_answer: "C", explanation: "No, registering minors or anyone without legal capacity is strictly prohibited." },
  { id: 20, category: "Minors", question_text: "What should you do if a prospect is unable to provide proof of legal age during the registration process?", option_a: "Register them anyway and ask for proof later.", option_b: "Register them under a family member's name.", option_c: "Refuse to register them until they can provide valid proof of legal age.", option_d: "Register them but withhold their products.", correct_answer: "C", explanation: "Refuse to register them until they can provide valid proof of legal age." },
  { id: 21, category: "Minors", question_text: "Registering a minor into the QNET business is considered:", option_a: "A strategic way to build a long-term downline.", option_b: "A serious breach of Qnet’s P&P and Code of Ethics.", option_c: "Acceptable in countries where child labor laws are relaxed.", option_d: "A minor administrative error.", correct_answer: "B", explanation: "A serious breach of Qnet’s P&P and Code of Ethics." },
  
  { id: 22, category: "Poaching", question_text: "What is 'Cross-Lining' or 'Poaching' in the context of QNET?", option_a: "Selling products to customers in a different country.", option_b: "Attending training events hosted by another team.", option_c: "Attempting to refer or switch another Distributor from a different line of referralship into your own.", option_d: "Using social media to find new prospects.", correct_answer: "C", explanation: "Attempting to refer or switch another Distributor from a different line of referralship into your own." },
  { id: 23, category: "Poaching", question_text: "Can you encourage a distributor from another team to leave their upline and join your line of referralship?", option_a: "Yes, if they are unhappy with their current upline.", option_b: "Yes, if you offer them a better position in your team.", option_c: "No, inducing or encouraging another ID to change their line of referralship is strictly prohibited.", option_d: "Yes, as long as they pay a new registration fee.", correct_answer: "C", explanation: "No, inducing or encouraging another ID to change their line of referralship is strictly prohibited." },
  { id: 24, category: "Poaching", question_text: "What is the policy regarding promoting or touting for another network marketing or direct selling company while you are a QNET Independent Distributor?", option_a: "It is allowed as long as the other company is not a direct competitor to QNET.", option_b: "It is allowed if you keep your QNET business and the other business completely separate.", option_c: "It is strictly prohibited. Distributors must not promote any competitive services, products, or business programmes, nor tout for another MLM company.", option_d: "It is allowed on your personal social media, but not at QNET events.", correct_answer: "C", explanation: "It is strictly prohibited. Distributors must not promote any competitive services, products, or business programmes, nor tout for another MLM company." },
  { id: 25, category: "Poaching", question_text: "At QNET-sponsored functions or on Company property, what is prohibited?", option_a: "Taking photos with leaders.", option_b: "Selling your own business tools.", option_c: "Soliciting any person to join any other network marketing company or involving the sale of products of any other network marketing company.", option_d: "Speaking to distributors from other lines of referralship.", correct_answer: "C", explanation: "Soliciting any person to join any other network marketing company or involving the sale of products of any other network marketing company." },
  { id: 26, category: "Poaching", question_text: "Using QNET’s sponsored functions, literatures, or materials to support Cross-Lining or Poaching is:", option_a: "Acceptable if the literature is publicly available.", option_b: "Allowed if you are trying to help a struggling distributor.", option_c: "Strictly prohibited and a violation of the Qnet’s Code of Ethics.", option_d: "Allowed if you do not use the QNET logo.", correct_answer: "C", explanation: "Strictly prohibited and a violation of the Qnet’s Code of Ethics." },
  
  { id: 27, category: "Cross-Border", question_text: "Is it permissible to lure prospects across borders or house them, restricting their movement to force them to conduct the QNET business?", option_a: "Yes, if they owe you money for their travel expenses.", option_b: "No, this is a severe violation of human rights, ethical conduct, and Qnet P&P.", option_c: "Yes, as long as they are provided with food and shelter.", option_d: "No, unless the prospect signs a 1-year contract with the upline.", correct_answer: "B", explanation: "No, this is a severe violation of human rights, ethical conduct, and Qnet P&P." },
  { id: 28, category: "Cross-Border", question_text: "Can a leader or upline confiscate the passports or travel documents of prospects or downlines who have been transferred cross-border for business purposes?", option_a: "Yes, to ensure they do not run away before paying their registration fee.", option_b: "Yes, if the upline is officially holding their Q Account details.", option_c: "No, confiscating personal identification or travel documents is illegal and strictly prohibited.", option_d: "No, unless local law enforcement grants explicit permission.", correct_answer: "C", explanation: "No, confiscating personal identification or travel documents is illegal and strictly prohibited." },
  
  { id: 29, category: "Account Access", question_text: "Is it permissible for an upline to log into a downline's Virtual Office (VO) or access their Q Account using the downline's credentials without their explicit consent?", option_a: "Yes, if the upline is helping the downline build their business.", option_b: "Yes, as long as the upline does not withdraw any funds.", option_c: "No, holding, changing, or accessing a downline's usernames, passwords, and accounts without prior written approval is a strict Red Line violation.", option_d: "Yes, if the downline is a minor or lacks technical knowledge.", correct_answer: "C", explanation: "No, holding, changing, or accessing a downline's usernames, passwords, and accounts without prior written approval is a strict Red Line violation." },
  { id: 30, category: "Account Access", question_text: "What is the policy regarding a 3rd party (such as an upline or office leader) placing orders, making product collections, or withdrawing commissions from a downline's Q Account on their behalf?", option_a: "It is allowed if the downline is busy or traveling.", option_b: "It is allowed as long as the 3rd party provides a receipt to the downline later.", option_c: "It is strictly prohibited; placing unauthorized orders, collecting products, or accessing commissions on behalf of an ID without ID's explicit prior approval violates QNET Red Lines.", option_d: "It is allowed if the 3rd party is the direct referrer and holds a leadership rank.", correct_answer: "C", explanation: "It is strictly prohibited; placing unauthorized orders, collecting products, or accessing commissions on behalf of an ID without ID's explicit prior approval violates QNET Red Lines." }
];

export default function Home() {
  const [questions] = useState<QuestionType[]>(allQuestions);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [region, setRegion] = useState<"Global" | "Vihaan">("Global");
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    recipientEmail: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionSelect = (qId: number) => {
    if (selectedQuestions.includes(qId)) {
      setSelectedQuestions(selectedQuestions.filter((id) => id !== qId));
    } else if (selectedQuestions.length < 10) {
      setSelectedQuestions([...selectedQuestions, qId]);
    } else {
      alert("You can only select 10 questions.");
    }
  };

  // Helper function to replace terms for Vihaan live in the UI and the HTML
  const localize = (text: string) => {
    if (region !== "Vihaan") return text;
    return text
      .replace(/QNET/g, "Vihaan")
      .replace(/Qnet/g, "Vihaan")
      .replace(/Q Account/g, "CPA");
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
          <p>${index + 1}. ${localize(q.question_text)}</p>
          <label><input type="radio" name="q${index + 1}" value="A"> A) ${localize(q.option_a)}</label>
          <label><input type="radio" name="q${index + 1}" value="B"> B) ${localize(q.option_b)}</label>
          <label><input type="radio" name="q${index + 1}" value="C"> C) ${localize(q.option_c)}</label>
          <label><input type="radio" name="q${index + 1}" value="D"> D) ${localize(q.option_d)}</label>
        </div>
      `;
    });

    // 2. Build Correct Answers Object for JS
    let correctAnswersObj: Record<string, string> = {};
    selectedQs.forEach((q, index) => {
      correctAnswersObj[`q${index + 1}`] = q.correct_answer;
    });

    // 3. Build Correct Answers Display for Fail Screen
    let answersDisplay = "<ol>";
    selectedQs.forEach((q, index) => {
      const correctOption = `option_${q.correct_answer.toLowerCase()}` as keyof QuestionType;
      answersDisplay += `<li><strong>${q.correct_answer}) ${localize(q[correctOption])}</strong> — ${localize(q.explanation)}</li>`;
    });
    answersDisplay += "</ol>";

    // 4. Construct Full HTML Template
    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${localize("Qnet")} Policies & Procedures (P&P) Refresher Module</title>
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
  h2.section-title { color: #1a3a6c; border-bottom: 2px solid #e0e6ed; padding-bottom: 10px; margin: 30px 0 15px; font-size: 1.4em; }
  .section { margin-bottom: 35px; }
  .section p { margin-bottom: 12px; }
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
    <h1>${localize("Qnet")} Policies &amp; Procedures (P&amp;P) Refresher Module</h1>
    <div class="subtitle">Network Integrity Department</div>
  </header>
  <div class="content">
    <div class="intro">
      <p>Dear <strong>${formData.name}</strong> (<strong>${formData.id}</strong>),</p>
      <p>Welcome. You have been assigned this mandatory training module by the Network Integrity Department in response to a complaint filed against you. Please complete the compliance quiz below to confirm your understanding of ${localize("QNET")}'s Policies &amp; Procedures.</p>
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
              <label for="confirmCheck">I confirm that I have read, understood, and will comply with the ${localize("QNET")} P&amp;P and Code of Ethics at all times.</label>
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
  <footer>© ${localize("QNET")} Network Integrity Department | Confidential — For Distributor Training Purposes Only</footer>
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
        var subject = "${localize("QNET")} P&P Refresher (" + id + ") [COMPLETION LOG - TOKEN: " + token + "]";
        var body = "Dear Network Integrity Team,\\n\\nI, " + name + " (Distributor ID: " + id + "), hereby confirm that I have successfully completed the ${localize("Qnet")} P&P & Red Lines Refresher.\\n\\nRegards,\\n" + name + "\\nDistributor ID: " + id;
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

    // Draft Email to Distributor
    const emailSubject = "Mandatory Compliance Training Assignment - " + localize("QNET") + " P&P Refresher";
    const emailBody = `Dear ${formData.name} (${formData.id}),\n\nYou have been assigned a mandatory training module by the Network Integrity Department in response to a complaint filed against you.\n\nPlease find the attached training module file (${formData.id}_training.html). Download and open it in your web browser to complete the compliance quiz.\n\nYou must score 100% to pass. Upon passing, follow the instructions on the screen to generate and send the completion email to Network Integrity.\n\nNote: Replying directly to this email will not be accepted as completion. You must use the button inside the module to send an email containing a Unique Completion Token.\n\nRegards,\nNetwork Integrity Department`;
    
    // Hardcode CC to network.integrity@qnet.net
    const mailtoLink = `mailto:${formData.recipientEmail}?cc=network.integrity@qnet.net&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Slight delay to ensure file download starts before opening email client
    setTimeout(() => {
      window.location.href = mailtoLink;
    }, 500);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#1a3a6c" }}>QNET Refresher Module Generator</h1>
      
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <h3 style={{ borderBottom: "2px solid #e0e6ed", paddingBottom: "10px" }}>Select Business Unit</h3>
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button 
            onClick={() => setRegion('Global')} 
            style={{ flex: 1, padding: "10px", background: region === 'Global' ? "#1a3a6c" : "#f0f4f8", color: region === 'Global' ? "#fff" : "#333", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
          >
            QNET (Global)
          </button>
          <button 
            onClick={() => setRegion('Vihaan')} 
            style={{ flex: 1, padding: "10px", background: region === 'Vihaan' ? "#1a3a6c" : "#f0f4f8", color: region === 'Vihaan' ? "#fff" : "#333", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
          >
            Vihaan (India)
          </button>
        </div>

        <h3 style={{ borderBottom: "2px solid #e0e6ed", paddingBottom: "10px" }}>Distributor Details</h3>
        <input name="name" placeholder="Distributor Name" onChange={handleChange} style={{ width: "100%", marginBottom: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
        <input name="id" placeholder="Distributor ID" onChange={handleChange} style={{ width: "100%", marginBottom: "10px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />
        <input name="recipientEmail" placeholder="Distributor Email (To)" onChange={handleChange} style={{ width: "100%", marginBottom: "20px", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }} />

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
                <span><strong>[{q.category}]</strong> {localize(q.question_text)}</span>
              </label>
            </div>
          ))}
        </div>

        <button onClick={generateHTML} style={{ background: "#27ae60", color: "white", padding: "15px 30px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px", fontWeight: "bold" }}>
          Generate, Download & Draft Email ({region})
        </button>
      </div>
    </div>
  );
}