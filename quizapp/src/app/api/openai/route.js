// Import necessary modules
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import pdfParse from "pdf-parse";
import { z } from "zod";

// Initialize OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request) {
  try {
    // Parse the incoming request to extract the PDF file
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Extract text from the PDF file
    const pdfBuffer = await file.arrayBuffer();
    const pdfText = await pdfParse(Buffer.from(pdfBuffer));

    //Define response format
    const format = z.object({
      questions: z.array(
        z.object({
          prompt: z.string(),
          answers: z.array(z.string()),
          goodAnswer: z.number(),
          explanation: z.string(),
        })
      ),
    });

    // Interact with the ChatGPT API to generate questions
    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `Generate multiple-choice questions from the text that was generated from the PDF file. There should be 4 choices for each question, placed in a random order, only one of them is correct. In the returned array, the correct answer should be indicated by the index of the correct answer using the goodAnswer field.`,
        },
        { role: "user", content: pdfText.text },
      ],
      response_format: zodResponseFormat(format, "question_bank"),
    });

    console.log(completion);

    return NextResponse.json(completion);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
