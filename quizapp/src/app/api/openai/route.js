// Import necessary modules
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import {zodResponseFormat} from "openai/helpers/zod";

const options = {
  pdfBinary: "/opt/homebrew/bin/pdftotext", // or "/usr/local/bin/pdftotext"
};

export async function POST(request) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log("called");
  try {
    // Parse the incoming request to extract the PDF file
    const pdfText = await request.json();
    console.log(pdfText.text);

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
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You will be sent a text transcript of a PDF containing course notes by a student. Generate at least 20 multiple-choice questions from the text that was generated from the PDF file. They should be the questions that you think could appear on the student's exam. There should be 4 choices for each question, placed in a random order, only one of them is correct. In the returned array, the correct answer should be indicated by the index of the correct answer using the goodAnswer field.`,
        },
        { role: "user", content: pdfText.text },
      ],
      response_format: zodResponseFormat(format, "question_bank"),
    });

    console.log(completion.choices[0].message.parsed.questions);

    return NextResponse.json(completion.choices[0].message.parsed.questions);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
