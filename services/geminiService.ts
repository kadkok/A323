
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeVerse = async (text: string, reference: string): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Realize uma análise interlinear e léxica avançada do texto: "${text}" (${reference}).
    
    ESTRUTURA OBRIGATÓRIA (JSON):
    1. filologia: Inclua os termos originais (Hebraico/Grego) com transliteração e significado léxico preciso.
    2. simbolismo: Conecte o texto à mitologia clássica (Homero, Hesíodo) e arquétipos do Antigo Oriente.
    3. paralelos: Forneça um "Amparo Filosófico" citando paralelos em Platão, Aristóteles, Sócrates, Pitágoras ou os Pré-Socráticos.
    
    Ignore interpretações religiosas modernas. Foque no nexo linguístico e histórico-filosófico da Antiguidade.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          filologia: { type: Type.STRING, description: "Léxico interlinear e etimologia" },
          simbolismo: { type: Type.STRING, description: "Mitologia clássica e iconografia" },
          paralelos: { type: Type.STRING, description: "Amparo em Filosofia Clássica (Platão, Aristóteles, etc)" }
        },
        required: ["filologia", "simbolismo", "paralelos"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text || "{}");
    return result as AnalysisResult;
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    throw new Error("Falha na decifração clássica.");
  }
};
