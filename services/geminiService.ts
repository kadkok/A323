
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, ConcordanceResult } from "../types";

const API_KEY = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const analyzeVerse = async (text: string, reference: string): Promise<AnalysisResult> => {
  const prompt = `Atue como um Arqueólogo Sênior e Filólogo Especialista em Semítica e Grego Clássico. Analise profundamente o texto: "${text}" (${reference}).

  Gere uma resposta JSON ESTRITAMENTE estruturada conforme o schema abaixo. 
  
  REQUISITOS DE CONTEÚDO:
  1. METADADOS: Autoria, datação acadêmica (não apenas tradicional), local de escrita e língua original.
  2. SEÇÕES DE ANÁLISE: Divida a análise em 2 ou 3 parágrafos temáticos profundos.
  3. NOTAS DE RODAPÉ (CRUCIAIS): Para CADA parágrafo, forneça "referências cruzadas" contemporâneas. Use textos extrabíblicos (Livro de Enoque, Nag Hammadi, Flavio Josefo, Tácito, Qumran) ou clássicos (Platão, Homero) que tratem do MESMO tema.
  4. GEMATRIA: Calcule e explique a gematria de 1 ou 2 palavras-chave no original (Hebraico/Grego).
  5. DICIONÁRIO ETIMOLÓGICO: Selecione 3 palavras-chave e dê a definição raiz (etimologia).
  6. ARQUEOLOGIA: Cite achados arqueológicos reais (estelas, papiros, ruínas) relacionados ao contexto.

  SCHEMA DE RESPOSTA (JSON):
  {
    "metadata": {
      "author": "...",
      "date": "...",
      "location": "...",
      "audience": "...",
      "originalLanguage": "..."
    },
    "sections": [
      {
        "title": "Título do Tema (Ex: A Natureza do Logos)",
        "content": "Texto da análise profunda...",
        "footnotes": [
          { "source": "Fonte (Ex: 1 Enoque 46:1)", "text": "Texto da citação...", "connection": "Conexão temática..." }
        ]
      }
    ],
    "gematria": [
      { "word": "Palavra Traduzida", "original": "Original", "value": 0, "meaning": "Significado místico/numérico" }
    ],
    "etymology": [
      { "word": "Palavra", "original": "Original", "transliteration": "Translit", "definition": "Definição etimológica raiz" }
    ],
    "archaeology": [
      { "title": "Nome do Artefato", "description": "Descrição do achado...", "date": "Data Aprox." }
    ]
  }`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { responseMimeType: "application/json" }
  });

  try {
    const textResponse = response.text || "{}";
    const jsonStr = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr) as AnalysisResult;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Falha na decifração arqueológica. O manuscrito está fragmentado.");
  }
};

// --- NOVA FUNÇÃO: Concordância (Word Search) ---

export const performConcordanceSearch = async (word: string): Promise<ConcordanceResult> => {
  const prompt = `Atue como uma Concordância Bíblica Exaustiva (Versão Almeida).
  Palavra alvo: "${word}".
  
  Tarefa:
  1. Localize a PRIMEIRA menção exata dessa palavra na Bíblia.
  2. Localize a ÚLTIMA menção exata dessa palavra na Bíblia.
  3. Estime a contagem total de ocorrências.
  
  Retorne JSON estrito:
  {
    "word": "${word}",
    "totalOccurrences": 0,
    "firstMention": { "reference": "Livro X:Y", "text": "Texto completo do versículo..." },
    "lastMention": { "reference": "Livro A:B", "text": "Texto completo do versículo..." },
    "allOccurrences": [] 
  }`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { responseMimeType: "application/json" }
  });

  try {
    const textResponse = response.text || "{}";
    const jsonStr = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr) as ConcordanceResult;
  } catch (error) {
    throw new Error("Erro ao consultar concordância.");
  }
};

export const expandConcordanceList = async (word: string): Promise<ConcordanceResult['allOccurrences']> => {
  const prompt = `Liste até 20 ocorrências bíblicas chave (Versão Almeida) da palavra "${word}".
  Priorize versículos onde a palavra tem significado teológico central.
  Retorne JSON estrito:
  [
    { "reference": "Livro X:Y", "text": "texto...", "contextSummary": "breve contexto" }
  ]`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: { responseMimeType: "application/json" }
  });

  try {
    const textResponse = response.text || "[]";
    const jsonStr = textResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    return [];
  }
};
