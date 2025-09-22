
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const base64ToPart = (base64String: string) => {
    const match = base64String.match(/^data:(image\/\w+);base64,(.*)$/);
    if (!match) {
        throw new Error("Invalid base64 string format");
    }
    const mimeType = match[1];
    const data = match[2];
    return {
        inlineData: {
            mimeType,
            data
        }
    };
};

export const editImage = async (
    sceneImageBase64: string,
    productImageBase64: string,
    prompt: string
): Promise<string> => {
    try {
        const scenePart = base64ToPart(sceneImageBase64);
        const productPart = base64ToPart(productImageBase64);
        
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    scenePart,
                    productPart,
                    { text: prompt },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);
        
        if (imagePart && imagePart.inlineData) {
            const { data, mimeType } = imagePart.inlineData;
            return `data:${mimeType};base64,${data}`;
        } else {
            const textPart = response.candidates?.[0]?.content?.parts?.find(part => part.text);
            if(textPart?.text) {
                throw new Error(`API returned text instead of an image: ${textPart.text}`);
            }
            throw new Error('No image was generated. The API response did not contain image data.');
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate image: ${error.message}`);
        }
        throw new Error('An unknown error occurred while communicating with the API.');
    }
};
