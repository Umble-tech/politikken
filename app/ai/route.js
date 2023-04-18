import { NextResponse } from "next/server";
import { processQueryPrompt } from "./processQueryPrompt";
import { queryDatabase } from "./queryDatabase";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";

const parties = ["ap", "h"];

export async function POST(request) {
  const { query } = await request.json();
  const prompt = await processQueryPrompt(query);

  console.log(prompt);

  const llm = new OpenAI({ temperature: 0 });

  //   const chain = new LLMChain({ llm, prompt });

  //   const updatedPrompt = await chain.run(query);

  //   console.log(updatedPrompt);

  //   const dbResult = await queryDatabase(updatedPrompt);

  const opinions = await Promise.all(
    parties.map(async (party) => {
      const res = await queryDatabase(party, prompt);
      return { party, ...res };
    })
  );

  const result = opinions.reduce(
    (parties, { party, text }) => Object.assign(parties, { [party]: text }),
    {}
  );

  return NextResponse.json(result);
}
