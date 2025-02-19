async function fetchAIResponse(query) {
    try {
        const response = await fetch("https://med-ai-demo.vercel.app/api", { // তোমার Vercel লিংক
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
