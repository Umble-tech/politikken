import { PineconeClient } from "@pinecone-database/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAI } from "langchain/llms/openai";
import { VectorDBQAChain, loadQAStuffChain } from "langchain/chains";

export const queryDatabase = async (party, query) => {
  const client = new PineconeClient();
  await client.init({
    apiKey: process.env.PINECONE_API_KEY,
    environment: process.env.PINECONE_ENVIRONMENT,
  });
  const pineconeIndex = client.Index(process.env.PINECONE_INDEX);

  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings(),
    { pineconeIndex }
  );

  const docs = await vectorStore.similaritySearch(query, 2, {
    party,
  });

  const llm = new OpenAI({ temperature: 0.0 });
  const chain = loadQAStuffChain(llm);

  const response = await chain.call({ input_documents: docs, question: query });

  return response;
};
