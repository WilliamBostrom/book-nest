import { json, type RequestHandler } from "@sveltejs/kit";
// import OpenAI from "openai";
// import {OPEN_AI_API_KEY} from "$env/static/private";

// const openai = new OpenAI({
//   apiKey: OPEN_AI_API_KEY,
// })

export const POST: RequestHandler = async ({ request }) => {
  // const { base64 } = await request.json();

  // const response = await openai.chat.completions.create({
  //   model: "gpt-4o-mini",
  //   messages: [
  //     {
  //       role: "user",
  //       content: `in the given image there will be either one or many books displayed. what you need to give me back is a json and NOTHING ELSE. Only give back valid JSON. What i need as information is the books that you can see on the image in this form {"bookTitle": "Harry Potter and the Deathly Hallows", "author": "J.K. Rowling"} Please also make sure that you return an array, even if there is only one book visible on the image.`,
  //     },
  //     {
  //       role: "user",
  //       content: {
  //         type: "image_url",
  //         image_url: `data:image/jpeg;base64,${base64}`,
  //       },
  //     },
  //   ],
  // });

  // console.log(response.choices[0].message);
  // const bookArrayString = response.choices[0].message.content?.replace(/```json\n/g, "")
  //
  //   .trim();
  // const bookArray = JSON.parse(bookArrayString || "");

  const bookArray = [
    { bookTitle: "The Diary of a CEO", author: "Steven Bartlett" },
    { bookTitle: "Invisible Women", author: "Caroline Criado Perez" },
    { bookTitle: "Where Good Ideas Come From", author: "Steven Johnson" },
    { bookTitle: "The Narrows", author: "Michael Connelly" },
    { bookTitle: "The Drop", author: "Michael Connelly" },
    { bookTitle: "The Black Ice", author: "Michael Connelly" },
    { bookTitle: "Emotional Intelligence", author: "Daniel Goleman" },
    { bookTitle: "How to Read a Book", author: "Mortimer J. Adler" },
    { bookTitle: "The Unfair Advantage", author: "Ash Ali" },
    { bookTitle: "The Collingridge Dilemma", author: "Jared Cohen" },
  ];

  return json({ bookArray: bookArray });
};
