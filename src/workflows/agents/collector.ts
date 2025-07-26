import { PROMPT_ROLE_BASE } from './../prompts';
import { generateText, tool, type LanguageModel } from "ai";
import { PROMPT_ROLE_COLLECTOR } from "../prompts";
import { z } from 'zod'

const schema = z.object({
  questions: z.array(z.string()).describe("A list of questions to ask the user to collect information, at most 4 questions, at least 1 question (per time)."),
})

export async function collect(model: LanguageModel, input: string, onAsk: (question: string[]) => Promise<string[]>, onTerminate: (summary: Record<string, string>, reason: string) => Promise<void>) {
  let summary: Record<string, string> = {}
  return await generateText({
    model,
    prompt: `${PROMPT_ROLE_BASE}\n\n${PROMPT_ROLE_COLLECTOR}\n\n# 用户输入\n\n${input}`,
    tools: {
      ask: tool({
        description: "Ask the user some questions to collect information. (can be called multiple times)",
        parameters: schema,
        execute: async (args) => {
          const { questions } = args
          const answers = await onAsk(questions);
          return answers.map((answer, index) => `Question ${index + 1}: ${questions[index]}\nAnswer: ${answer}`).join("\n---\n");
        },
      }),
      add: tool({
        description: "Add a record of information to the summary.",
        parameters: z.object({
          records: z.array(z.object({
            title: z.string().describe("The title of this record of information."),
            content: z.string().describe("The content of this record of information."),
          })),
        }),
        execute: async (args) => {
          for (const { title, content } of args.records) {
            summary[title] = content
          }
            return 'OK.'
          },
      }), 
      terminate: tool({
        description: "Terminate the conversation and return the collected information.",
        parameters: z.object({
          reason: z.string().describe("The reason to terminate the conversation.  "),
        }),
        execute: async (args) => {
          await onTerminate(summary, args.reason);
          return 'OK, please stop response.'
        },
      }),
    },
    maxSteps: 20,
    maxRetries: 3
  });


}