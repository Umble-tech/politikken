import { uploadToPinecone } from "./pinecone.mjs";
import { MarkdownTextSplitter } from "langchain/text_splitter";
import { hoyre } from "./docs/hoyre.mjs";
import { arbeiderpartiet } from "./docs/arbeiderpartiet.mjs";
import { frp } from "./docs/frp.mjs";
import { sv } from "./docs/sv.mjs";

const sourceData = [
  // { metadata: { party: "h" }, data: hoyre },
  // { metadata: { party: "ap" }, data: arbeiderpartiet },
  // { metadata: { party: "frp" }, data: frp },
  { metadata: { party: "sv" }, data: sv },
];

const splitter = new MarkdownTextSplitter({ chunkSize: 2000 });

const docs = (
  await Promise.all(
    sourceData.map(async ({ metadata, data }) => {
      return await splitter.createDocuments([data], [{ ...metadata }]);
    })
  )
).flat();

uploadToPinecone(docs);
