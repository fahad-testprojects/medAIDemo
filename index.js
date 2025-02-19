// AI-এর প্রশ্ন পাঠানো এবং উত্তর ফেচ করার ফাংশন
async function fetchAIResponse(query) {
    try {
        const response = await fetch("https://med-ai-demo.vercel.app/api", { // তোমার Vercel URL
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: query })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.response || "দুঃখিত, আমি উত্তর দিতে পারছি না।";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "দুঃখিত, কিছু সমস্যা হয়েছে।";
    }
}

// ইউজারের ইনপুট ও এন্টার প্রেস হ্যান্ডলিং
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        const input = document.getElementById('userInput');
        const userText = input.value.trim();
        if (!userText) return;

        const output = document.getElementById('output');
        output.innerHTML += `<div>> ${userText}</div>`;
        input.value = '';
        output.scrollTop = output.scrollHeight;

        setTimeout(async () => {
            output.innerHTML += `<div>> স্বাস্থ্য সহকারী: আপনার প্রশ্ন প্রক্রিয়া করা হচ্ছে...</div>`;
            output.scrollTop = output.scrollHeight;

            const aiResponse = await fetchAIResponse(userText);
            output.innerHTML += `<div>> স্বাস্থ্য সহকারী: ${aiResponse}</div>`;
            output.scrollTop = output.scrollHeight;
        }, 1000);
    }
}

// ইউজার ইনপুটের জন্য ইভেন্ট লিসেনার অ্যাড করা
document.getElementById('userInput').addEventListener('keypress', handleKeyPress);
