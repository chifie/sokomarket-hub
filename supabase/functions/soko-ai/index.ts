import { convertToModelMessages, streamText, type UIMessage } from "npm:ai";
import { createLovableAiGatewayProvider } from "../_shared/ai-gateway.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are Soko AI, the intelligent assistant for SokoDigital — a global AI-powered marketplace connecting buyers and sellers worldwide.

You help with:
- BUYERS: finding products, comparing prices, tracking orders, payment methods, shipping, returns, and personalized recommendations.
- SELLERS: writing product descriptions, SEO titles, pricing strategy, inventory tips, marketing ideas, and store growth advice.

Rules:
- Be concise, friendly, and specific. Prefer short paragraphs and bullet lists.
- If the user writes in Swahili, reply in Swahili. Otherwise reply in English.
- Never invent order numbers, prices, or seller data. If you don't know, say so and suggest where to look in the dashboard.
- For payments say: Visa/Mastercard, PayPal, and mobile wallets — secured end-to-end.
- For shipping say: worldwide, typically 1–7 days depending on location.
- To become a seller: Register → Dashboard → Add product (photos, price, specs).`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) {
      return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages }: { messages: UIMessage[] } = await req.json();
    const gateway = createLovableAiGatewayProvider(key);

    const result = streamText({
      model: gateway("google/gemini-3-flash-preview"),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({ headers: corsHeaders });
  } catch (e) {
    console.error("soko-ai error", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
