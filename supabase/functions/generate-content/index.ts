import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, type } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "You are a professional content writer.";
    
    switch (type) {
      case "heading":
        systemPrompt = "Generate a compelling, concise heading (5-8 words). No quotes, just the text.";
        break;
      case "paragraph":
        systemPrompt = "Generate a well-written paragraph (3-5 sentences) that is engaging and informative.";
        break;
      case "list":
        systemPrompt = "Generate a bullet-point list (5-7 items). Format each item on a new line with a bullet point (•).";
        break;
      case "cta":
        systemPrompt = "Generate a compelling call-to-action button text (2-4 words). Make it action-oriented.";
        break;
      case "description":
        systemPrompt = "Generate a product description (2-3 paragraphs) that highlights features and benefits.";
        break;
      case "blog":
        systemPrompt = "Generate a blog post section (4-6 paragraphs) that is informative and engaging.";
        break;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content generated");
    }

    return new Response(JSON.stringify({ content }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating content:", error);
    const message = error instanceof Error ? error.message : "Failed to generate content";
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
