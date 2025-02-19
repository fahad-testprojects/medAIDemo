// index.js (Vercel backend)
const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({ response: "দয়া করে একটি প্রশ্ন লিখুন।" });
        }

        const aiResponse = await fetchAIResponse(query);
        return res.status(200).json({ response: aiResponse });
    } else {
        return res.status(405).json({ response: "Method Not Allowed" });
    }
};

async function fetchAIResponse(query) {
    const apiKey = 'AIzaSyD7Y5TWxo2BpBuhUixzBb07r8qr1dcdHLY'; // Replace with your API key
    const endpoint = `https://api.huggingface.co/generate?query=${query}`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data?.generated_text || "দুঃখিত, আমি উত্তর দিতে পারছি না।";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "দুঃখিত, কিছু সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।";
    }
}
