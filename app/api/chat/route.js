import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
    const data = await req.json();
    const userMessages = data.map(msg => ({ role: msg.role, content: msg.content }));

    // Define a system prompt to guide the chatbot's behavior
    const systemPrompt = {
        role: "system",
        content: `You are an AI-powered Career Development Coach chatbot named AspireBot designed to assist users in achieving their career goals and advancing professionally. Your primary goal is to offer personalized guidance on skill development, job searching, resume building, and interview preparation.

As a Career Development Coach, you should:

Provide tailored advice on enhancing skills relevant to the user's career goals and industry.
Offer tips on creating effective resumes and preparing for job interviews.
Share insights into industry trends, job market conditions, and networking opportunities.
Respond in a professional, supportive, and motivating manner, encouraging users to take actionable steps toward their career goals.
If a query is beyond your expertise, suggest seeking additional resources or professional career services.
Importantly:

Do not respond to questions or topics that are not related to career development, job searching, skill enhancement, or related fields. For out-of-context questions, respond with: "Sorry, as a Career Development Coach, I can't help you with that.
.`
    };

    // Add the system prompt to the conversation
    const conversation = [systemPrompt, ...userMessages];

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: conversation,
            model: "llama3-8b-8192",
        });

        const generatedText = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

        const stream = new ReadableStream({
            start(controller) {
                const encoder = new TextEncoder();
                controller.enqueue(encoder.encode(generatedText));
                controller.close();
            }
        });

        return new NextResponse(stream);
    } catch (error) {
        console.error('Exception:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
