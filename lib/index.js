// dsh-text-reverse — 文本反转（DeepSeek Harness）。纯 Node。
import { defineTool } from "@deepseek-ai/dsh-tools";

const name = "文本反转";
const inject = ["tools"];

async function apply(ctx, _config) {
  ctx.tools.register(defineTool({
    name: "reverse_text",
    description:
      "反转文本。`text` 传原文；`mode` 默认 reverse（逐字符反转），也可 words（词序反转，词内不变）、lines（行序反转）。",
    parameters: {
      text: { type: "string", required: true, description: "原文。" },
      mode: { type: "string", enum: ["reverse", "words", "lines"], description: "反转模式，默认 reverse。" },
    },
    output: { schema: { type: "object", additionalProperties: false, properties: { result: { type: "string", required: true } } }, render: (_a, v) => [{ type: "text", text: v.result }] },
    execute: async (args) => {
      const t = String(args.text);
      if (args.mode === "words") return { result: t.split(/\s+/).filter(Boolean).reverse().join(" ") };
      if (args.mode === "lines") return { result: t.split(/\r?\n/).reverse().join("\n") };
      return { result: [...t].reverse().join("") };
    },
  }));
}

export { apply, inject, name };
