export type AskForm = {
  question: string;
}

export type RagSource = {
  page_number: number | null;
  chunk_index: number;
  content: string;
  similarity: number;
}

export type RagResponse = {
  answer: string;
  sources: RagSource[];
}