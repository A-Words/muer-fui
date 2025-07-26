import { generateText, tool, type LanguageModel } from 'ai'
import { type SearchResult, SearchTool } from '../tools/websearch'
import { z } from 'zod'
import { PROMPT_ROLE_BASE, PROMPT_ROLE_WEB_RESEARCHER } from '../prompts'

const tools = new SearchTool()

export async function websearch(model: LanguageModel, inputUser: string, inputNotes: string, onTerminate: (summary: Record<string, string>) => Promise<void>, onSearch: (results: SearchResult[], llms: string) => Promise<void>, onSummarize: (summary: string) => Promise<void>, onResolve: (content: string) => Promise<void>) {
  return await generateText({
    model,
    prompt: `${PROMPT_ROLE_BASE}\n\n${PROMPT_ROLE_WEB_RESEARCHER}\n\n# 用户输入\n\n${inputUser}\n\n# 收集的笔记\n\n${inputNotes}`,
    tools: {
      search: tool({
        description: 'Search the web for information',
        parameters: z.object({
          query: z.string().describe('The query to search the web for'),
        }),
        execute: async (args) => {
          const [results, llms] = await tools.search(args.query)
          await onSearch(results, llms)
          return llms
        },
      }),
      summarize: tool({
        description: 'Summarize the content of a web page',
        parameters: z.object({
          url: z.string().describe('The URL of the web page to summarize'),
        }),
        execute: async (args) => {
          const summary = await tools.summarize(args.url)
          await onSummarize(summary)
          return summary
        },
      }),
      resolve: tool({
        description: 'Resolve the content of a web page',
        parameters: z.object({
          url: z.string().describe('The URL of the web page to resolve'),
        }),
        execute: async (args) => {
          const content = await tools.resolve(args.url)
          await onResolve(content)
          return content
        },
      }),
      terminate: tool({
        description: 'Terminate the conversation and return the collected information',
        parameters: z.object({
          summary: z.record(z.string().describe('The title of this record of information'), z.string().describe('The content of this record of information')),
        }),
        execute: async (args) => {
          await onTerminate(args.summary)
          return 'OK, please stop response.'
        },
      }),
    },
    maxSteps: 25,
    maxRetries: 3
  })
} 