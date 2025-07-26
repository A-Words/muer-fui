import { createOpenRouter } from '@openrouter/ai-sdk-provider'
import { createOpenAICompatible } from '@ai-sdk/openai-compatible'



export const openrouter = createOpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY!,
})

export const siliconflow = createOpenAICompatible({
  name: 'siliconflow',
  apiKey: import.meta.env.VITE_SILICONFLOW_API_KEY!,
  baseURL: import.meta.env.VITE_SILICONFLOW_BASE_URL!,
})
