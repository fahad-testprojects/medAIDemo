const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // শুধুমাত্র POST মেথড গ্রহণ
  if (req.method !== 'POST') {
    return res.status(405).json({ response: "Method Not Allowed" });
  }

  // Request Body পার্স করা (যদি string হয়)
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ response: "Invalid JSON" });
    }
  }

  const { query } = body;
  console.log("Received query:", query);

  if (!query) {
    return res.status(400).json({ response: "দয়া করে একটি প্রশ্ন লিখুন।" });
  }

  try {
    const aiResponse = await fetchAIResponse(query);
    return res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return res.status(500).json({ response: "দুঃখিত, সার্ভারে সমস্যা হচ্ছে।" });
  }
};

async function fetchAIResponse(query) {
  const apiKey = "AIzaSyBG6iI4RMjcErB4oDPOIfS7JI92uCupYdc"; // এখানে তোমার আসল API Key বসাও
  const model = "gemini-1.5-flash";
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: query }] }]
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Google API response:", data);
    
    // Gemini API রেসপন্স থেকে সঠিক টেক্সট বের করা
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "দুঃখিত, আমি উত্তর দিতে পারছি না।";
  } catch (error) {
    console.error("Error in fetchAIResponse:", error);
    return "দুঃখিত, কিছু সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।";
  }
}
