import { defineEventHandler, readBody } from "h3";
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { TEMPLATE } from "../../template/chat.template";
import { llmExpectedResponse } from "../../template/response.template";
import { PRODUCTS } from "../../db/products";

export default defineEventHandler(async (event) => {
  console.log("started");

  const body = await readBody(event);

  // const apiKey = process.env.GPT_KEY;

  const model = new ChatOpenAI({
    temperature: 1.5,
    model: "gpt-4o",
    // apiKey,
  });

  const { messages } = body;
  const userMessage = messages[messages.length - 1];
  const chat = messages.slice(0, -1);

  const prompt = PromptTemplate.fromTemplate(TEMPLATE);
  const parser = new HttpResponseOutputParser();

  const chain = prompt.pipe(model).pipe(parser);
  console.log("chat", chat);
  const response = await chain.invoke({
    chat,
    userMessage,
    llmExpectedResponse,
    productList: PRODUCTS,
  });
  console.log(response);

  return new TextDecoder().decode(response);
});
