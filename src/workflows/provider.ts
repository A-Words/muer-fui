import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'

export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
})

export const siliconflow = createOpenAICompatible({
  name: 'siliconflow',
  apiKey: process.env.SILICONFLOW_API_KEY!,
  baseURL: process.env.SILICONFLOW_BASE_URL!,
})
