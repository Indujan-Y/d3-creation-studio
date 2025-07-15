"use client";

import { useFormState, useFormStatus } from "react-dom";
import { generateAltTextAction, type FormState } from "./actions";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, Upload, X, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Suggestions
        </>
      )}
    </Button>
  );
}

export function AltTextGeneratorForm() {
  const initialState: FormState = { status: "idle", message: "" };
  const [state, formAction] = useFormState(generateAltTextAction, initialState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [photoDataUri, setPhotoDataUri] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.status === "error") {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message,
      });
    }
  }, [state, toast]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setPhotoDataUri(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
    setPhotoDataUri("");
    if(formRef.current) {
        const fileInput = formRef.current.querySelector('input[type="file"]') as HTMLInputElement;
        if(fileInput) fileInput.value = "";
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Image Alt-Text Generator</CardTitle>
          <CardDescription>
            Upload an image and provide a description to get AI-powered alt-text suggestions for better SEO.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="space-y-6">
             <input type="hidden" name="photoDataUri" value={photoDataUri} />
            <div className="space-y-2">
              <Label htmlFor="image-upload">Image</Label>
              {imagePreview ? (
                <div className="relative">
                    <Image src={imagePreview} alt="Preview" width={500} height={300} className="rounded-md object-contain border bg-muted" />
                    <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={clearImage}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="image-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
                        </div>
                        <Input id="image-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageChange} />
                    </label>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageDescription">Image Description</Label>
              <Textarea
                id="imageDescription"
                name="imageDescription"
                placeholder="e.g., A dramatic black and white photo of a mountain range at sunrise."
                required
                rows={4}
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-8">
        <h2 className="font-headline text-2xl text-primary">Generated Suggestions</h2>
        {useFormStatus().pending && (
           <div className="space-y-4">
                <Card className="animate-pulse"><CardContent className="h-24 p-6 bg-muted rounded-lg"></CardContent></Card>
                <Card className="animate-pulse"><CardContent className="h-24 p-6 bg-muted rounded-lg"></CardContent></Card>
                <Card className="animate-pulse"><CardContent className="h-24 p-6 bg-muted rounded-lg"></CardContent></Card>
           </div>
        )}
        {state.status === 'success' && state.suggestions && (
          <div className="space-y-4">
            {state.suggestions.map((suggestion, index) => (
              <Card key={index} className="bg-primary/5">
                <CardContent className="p-6">
                  <p className="font-body text-foreground">{suggestion}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        {state.status !== 'pending' && (!state.suggestions || state.suggestions.length === 0) && (
            <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Waiting for input</AlertTitle>
                <AlertDescription>
                   Your generated alt-text suggestions will appear here once you submit an image and description.
                </AlertDescription>
            </Alert>
        )}
      </div>
    </div>
  );
}
