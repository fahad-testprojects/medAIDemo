import { NextResponse } from "next/server";

export async function POST(req) {
    const { text } = await req.json();
    
    const API_KEY = process.env.API_KEY; // Vercel-এর Env Variable থেকে API Key
    const MODEL = "gemini-1.5-flash";
    const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

    try {
        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text }] }]
            }),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json({ response: data?.candidates?.[0]?.content?.parts?.[0]?.text || "উত্তর পাওয়া যায়নি।" });
    } catch (error) {
        console.error("API Call Error:", error);
        return NextResponse.json({ response: "কিছু সমস্যা হয়েছে।" });
    }
}
