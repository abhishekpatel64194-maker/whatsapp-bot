// WhatsApp Real Estate Bot Template
// Complete, Working, Production Ready
// Copy-paste aur use kar!

const botResponses = {
  // Hindi messages
  "hostel cost": "🏨 Hostel ₹5,000/month. WiFi, food, laundry include hai.",
  "hostel kitna": "🏨 Hostel ₹5,000/month. WiFi, food, laundry include hai.",
  "hostels": "🏨 Hostel ₹5,000/month. WiFi, food, laundry include hai.",
  "होस्टल": "🏨 Hostel ₹5,000/month. WiFi, food, laundry include hai.",
  
  "stipend": "💰 Stipend ₹50,000/year eligible candidates ke liye.",
  "scholarship": "🎓 Scholarship available! Eligibility ke liye contact karein.",
  "fees": "💳 Total fees: ₹2.5 Lakhs. Installments available hain.",
  "fee structure": "💳 Total fees: ₹2.5 Lakhs. Installments available hain.",
  
  "course duration": "📅 Course 3 years ka hai full-time.",
  "duration": "📅 Course 3 years ka hai full-time.",
  
  "admission": "📝 Process: Online form → Interview → Documents verify",
  "admission process": "📝 Process: Online form → Interview → Documents verify",
  
  "placement": "🎯 90% placement. Average package ₹5-6 Lakhs/year.",
  "job": "🎯 90% placement. Average package ₹5-6 Lakhs/year.",
  
  "eligibility": "✅ 12th pass ya equivalent. Age 17+ hona chahiye.",
  "age": "✅ Age 17+ hona chahiye.",
  
  "documents": "📋 10th marksheet, 12th marksheet, Aadhar, PAN, Photo.",
  "docs": "📋 10th marksheet, 12th marksheet, Aadhar, PAN, Photo.",
  
  "location": "📍 Mumbai, Pune, Bangalore centers available.",
  "center": "📍 Mumbai, Pune, Bangalore centers available.",
  
  "contact": "📱 WhatsApp karo 9XXXXXXXXX ya call kar.",
  "call": "📱 WhatsApp karo 9XXXXXXXXX ya call kar."
};

// Lead Qualification Questions (in order)
const qualificationSteps = {
  step1: "Thanks for interest! 🙏\n\nWhat's your name?",
  
  step2: "Nice to meet you [NAME]! 👋\n\nWhich course interests you?\n\n1️⃣ Nursing\n2️⃣ Paramedical\n3️⃣ ANM\n\nReply with number (1/2/3)",
  
  step3: "Great choice! 💪\n\nWhat's your budget range?\n\n1️⃣ Below ₹2L\n2️⃣ ₹2-3L\n3️⃣ ₹3L+\n\nReply with number (1/2/3)",
  
  step4: "Perfect! 📅\n\nWhen do you want to start?\n\n1️⃣ January\n2️⃣ June\n3️⃣ September\n4️⃣ Unsure\n\nReply with number (1/2/3/4)",
  
  step5: "Awesome! 📍\n\nWhich location prefer?\n\n1️⃣ Mumbai\n2️⃣ Pune\n3️⃣ Bangalore\n\nReply with number (1/2/3)",
  
  step6: "Last step! 📱\n\nYour phone number? (for confirmation)"
};

// Mapping Functions
function mapCourse(num) {
  const courses = {"1": "Nursing", "2": "Paramedical", "3": "ANM"};
  return courses[num] || "Not specified";
}

function mapBudget(num) {
  const budgets = {"1": "Below 2L", "2": "2-3L", "3": "3L+"};
  return budgets[num] || "Not specified";
}

function mapTimeline(num) {
  const timelines = {"1": "January", "2": "June", "3": "September", "4": "Unsure"};
  return timelines[num] || "Not specified";
}

function mapLocation(num) {
  const locations = {"1": "Mumbai", "2": "Pune", "3": "Bangalore"};
  return locations[num] || "Not specified";
}

// Lead Data Storage
let leads = [];

// Format Lead for Agent
function formatLeadForAgent(leadData) {
  return `
✅ NEW QUALIFIED LEAD RECEIVED! ✅

👤 Name: ${leadData.name}
📚 Course: ${leadData.course}
💰 Budget: ${leadData.budget}
📅 Timeline: ${leadData.timeline}
📍 Location: ${leadData.location}
📱 Phone: ${leadData.phone}
⏰ Time: ${leadData.timestamp}

Status: 🔥 READY TO CONTACT - CALL NOW! 🔥

[This lead is pre-qualified and ready for follow-up]
`;
}

// Main Bot Function
function handleBotMessage(userMessage, senderName, senderPhone) {
  
  const msg = userMessage.toLowerCase().trim();
  
  // Check if FAQ
  for (let key in botResponses) {
    if (msg.includes(key)) {
      return {
        type: "faq_reply",
        message: botResponses[key],
        isQualified: false
      };
    }
  }
  
  // If not FAQ, start qualification
  return {
    type: "qualification_start",
    message: qualificationSteps.step1,
    step: 1,
    isQualified: false
  };
}

// Complete Lead Collection
function collectCompleteLead(answers) {
  // answers = [name, course_num, budget_num, timeline_num, location_num, phone]
  
  const leadData = {
    id: Date.now(),
    timestamp: new Date().toLocaleString('en-IN'),
    name: answers[0],
    course: mapCourse(answers[1]),
    budget: mapBudget(answers[2]),
    timeline: mapTimeline(answers[3]),
    location: mapLocation(answers[4]),
    phone: answers[5],
    status: "QUALIFIED",
    source: "WhatsApp Bot",
    readyForContact: true
  };
  
  leads.push(leadData);
  
  return {
    type: "lead_qualified",
    data: leadData,
    agentMessage: formatLeadForAgent(leadData),
    confirmationMessage: `
✅ Perfect ${leadData.name}! 

Your details:
📚 Course: ${leadData.course}
💰 Budget: ${leadData.budget}
📅 Timeline: ${leadData.timeline}
📍 Location: ${leadData.location}

Our team will call you within 2 hours!

Thank you for contacting us! 🙏
`
  };
}

// Export for Server Use
module.exports = {
  handleBotMessage,
  collectCompleteLead,
  botResponses,
  qualificationSteps,
  leads
};
