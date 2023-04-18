import { PromptTemplate } from "langchain/prompts";

export const processQueryPrompt = async (query) => {
  let examples = [
    "Hva mener dere om oljeborring?",
    "Hva mener dere om legalisering?",
    "Hva mener dere er den beste måten å takle klimaendringer?",
  ];

  const formatExamples = (examples) => examples.map((s) => `"${s}"`).join(", ");
  examples = formatExamples(examples);

  const template = `{user_input}. Forklar det med enkle ord.`;
  const prompt = new PromptTemplate({
    template,
    inputVariables: ["user_input"],
  });

  return await prompt.format({ user_input: query });
};
