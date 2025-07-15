"use server";

import { generateImageAltText } from "@/ai/flows/generate-image-alt-text";
import { z } from "zod";

const formSchema = z.object({
  photoDataUri: z.string().min(1, "Image is required."),
  imageDescription: z.string().min(10, "Description must be at least 10 characters."),
});

export type FormState = {
  status: "success" | "error" | "idle";
  message: string;
  suggestions?: string[];
};

export async function generateAltTextAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    photoDataUri: formData.get("photoDataUri"),
    imageDescription: formData.get("imageDescription"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      message: "Invalid form data. Please check your inputs.",
    };
  }

  try {
    const result = await generateImageAltText(validatedFields.data);
    if (result.altTextSuggestions && result.altTextSuggestions.length > 0) {
      return {
        status: "success",
        message: "Suggestions generated successfully.",
        suggestions: result.altTextSuggestions,
      };
    } else {
      return {
        status: "error",
        message: "The AI could not generate suggestions. Please try a different image or description.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
