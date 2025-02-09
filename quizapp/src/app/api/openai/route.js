// Import necessary modules
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import {zodResponseFormat} from "openai/helpers/zod";
import { zodToJsonSchema } from "zod-to-json-schema";

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

    const str_format = JSON.stringify(zodToJsonSchema(format));

    // Interact with the ChatGPT API to generate questions

    const textObject = await openai.chat.completions.create({
      model: "o1-mini",
      messages: [
        {
          role: "user",
          content: `You will be sent a text transcript of a PDF containing course notes by a student.
           Generate at least 20 multiple-choice questions from the text that was generated from the PDF file.
           They should be questions that you think could appear on the student's exam.
            There should be 4 choices for each question, placed in a random order, only one of them is correct. It is
            important for the placement of the correct answer to be random, as this is a common practice in exams.
            An example of a bad question would be: 'In the factorial example, what is the return type of the factorial function?'
            because it would clearly not be in a programming exam. A programming exam would never ask to memorize an exact
            function from a book. It would instead ask questions about new, but similar examples.
            Instead, you could write a similar example and ask
            the same question.
            
             In the returned array, the correct answer should be indicated by the index of the correct answer using
             the goodAnswer field.
             Your answer should strictly be in the format of a JSON object, with nothing additional.
             Here is the format: ${str_format}
             Here is the text extracted from the student's PDF: ${pdfText.text}`,
        },
      ],
    });

    // Extract the message from the response
    const strMessage = textObject.choices[0].message.content;

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You will be sent a string representing a JSON object. Return it as a JSON object, with the
          provided response format.`,
        },
        { role: "user", content: strMessage },
      ],
      response_format: zodResponseFormat(format, "question_bank"),
    });
    
    const questions = completion.choices[0].message.parsed.questions;
    console.log(questions);

    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
