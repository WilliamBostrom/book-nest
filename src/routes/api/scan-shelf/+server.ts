import { json, type RequestHandler } from "@sveltejs/kit";
// import OpenAI from "openai";
// import {OPEN_AI_API_KEY} from "$env/static/private";

// const openai = new OpenAI({
//   apiKey: OPEN_AI_API_KEY,
// })

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { base64 } = await request.json();

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
      {
        bookTitle: "Harry Potter and the Philosopher's Stone",
        author: "J.K. Rowling",
      },
      {
        bookTitle: "The Hobbit",
        author: "J.R.R. Tolkien",
      },
    ];

    return json({ bookArray });
  } catch (error) {
    return json({ error: "Failed to process request" }, { status: 400 });
  }
};
