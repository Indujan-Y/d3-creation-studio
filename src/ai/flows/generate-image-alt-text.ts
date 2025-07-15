// This file is machine-generated - edit at your own risk.

'use server';

/**
 * @fileOverview An AI agent to suggest relevant keywords for image alt-text to improve SEO and discoverability.
 *
 * - generateImageAltText - A function that generates alt-text suggestions for an image.
 * - GenerateImageAltTextInput - The input type for the generateImageAltText function.
 * - GenerateImageAltTextOutput - The return type for the generateImageAltText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageAltTextInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  imageDescription: z.string().describe('A description of the image.'),
});

export type GenerateImageAltTextInput = z.infer<typeof GenerateImageAltTextInputSchema>;

const GenerateImageAltTextOutputSchema = z.object({
  altTextSuggestions: z
    .array(z.string())
    .describe('A list of suggested alt-text keywords for the image.'),
});

export type GenerateImageAltTextOutput = z.infer<typeof GenerateImageAltTextOutputSchema>;

export async function generateImageAltText(
  input: GenerateImageAltTextInput
): Promise<GenerateImageAltTextOutput> {
  return generateImageAltTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateImageAltTextPrompt',
  input: {schema: GenerateImageAltTextInputSchema},
  output: {schema: GenerateImageAltTextOutputSchema},
  prompt: `You are an SEO expert specializing in generating image alt-text keywords for photographers.

  Based on the image and its description, suggest relevant keywords that can be used as alt-text to improve SEO and discoverability.
  The keywords should be drawn from these categories: Composition, Technique, Subject Matter, Mood/Emotion, Color Palette, Historical/Artistic References, Cultural/Geographical References, Purpose/Function.
  Reason which keywords should or should not be included in each suggested alt-text string.

  Image Description: {{{imageDescription}}}
  Photo: {{media url=photoDataUri}}
  `,
});

const generateImageAltTextFlow = ai.defineFlow(
  {
    name: 'generateImageAltTextFlow',
    inputSchema: GenerateImageAltTextInputSchema,
    outputSchema: GenerateImageAltTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
