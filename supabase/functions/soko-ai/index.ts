import { generateText } from "npm:ai";
import { createLovableAiGatewayProvider } from "../_shared/ai-gateway.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const SYSTEM_PROMPT = `You are Soko AI, the assistant for SokoDigital, a global AI-powered marketplace connecting buyers and sellers worldwide.
- Help BUYERS find products, compare prices, understand shipping/returns/payments, and track orders.
- Help SELLERS write listings, price items, and grow their store.
- Be concise, friendly, and specific. Use short paragraphs and bullet points.
- If the user writes in Swahili, reply in Swahili; otherwise reply in English.
- Payments: Visa/Mastercard, PayPal, mobile wallets — secured end-to-end.
- Shipping: worldwide, typically 1–7 days.
- To sell: Register → Dashboard → Add product (photos, price, specs).
Never invent order numbers, prices, or private seller data.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) {
      return new Response(JSON.stringify({ error: "Missing LOVABLE_API_KEY" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { messages, lang } = await req.json();
    const gateway = createLovableAiGatewayProvider(key);
    const { text } = await generateText({
      model: gateway("google/gemini-3-flash-preview"),
      system: SYSTEM_PROMPT + (lang === "sw" ? "\nReply in Swahili." : ""),
      messages: (messages ?? []).map((m: any) => ({ role: m.role, content: m.content })),
    });
    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("soko-ai error", e);
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
