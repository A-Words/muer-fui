import ky from 'ky'
import { generateText } from 'ai'
import { openrouter } from '../provider'

export const SUMMARIZER_SYSTEM_PROMPT = `
你是一个专业的网页内容总结助手。你的任务是阅读提供的网页内容，并生成一份准确、简洁且富有结构的中文摘要。

要求：
1. 摘要应该保持客观中立，准确反映原文信息
2. 重点突出与用户查询相关的关键信息
3. 保持逻辑清晰，分段合理
4. 长度适中，既要全面又要简洁
5. 如果内容包含时间、价格、地址等具体信息，请准确保留
6. 如果网页包含图片，请描述图片的相关信息

格式要求：
- 使用清晰的段落结构
- 重要信息可以使用**粗体**标记
- 如果有列表信息，使用合适的列表格式
- 保持语言流畅自然
`

export type SearchResult = {
  title: string
  url: string
  date?: string
  description: string
  favicon: string
}

export class SearchTool {
  searchCache = new Map<string, [results: SearchResult[], llms: string]>()
  resolveCache = new Map<string, string>()
  summarizeCache = new Map<string, string>()

  async search(query: string) {
    console.log(`Searching for: "${query}"`)
    if (this.searchCache.has(query)) {
      console.log('[websearch tool] Returning cached search results')
      return this.searchCache.get(query)!
    }

    console.log('[websearch tool] Performing new web search')
    const results = await requestSearch(query)
    const llms = results.map((result) => `URL: ${result.url}\nTitle: ${result.title}\nDescription: ${result.description}\n${result.date ? `Date: ${result.date}` : ''}`).join('\n---\n')
    this.searchCache.set(query, [results, llms])
    console.log(`Found ${results.length} search results`)
    return [results, llms] as const
  }

  async resolve(url: string) {
    console.log(`Resolving URL: ${url}`)
    if (this.resolveCache.has(url)) {
      console.log('[websearch tool] Returning cached resolved content')
      return this.resolveCache.get(url)!
    }

    console.log('[websearch tool] Fetching new content from URL')
    const result = await requestResolve(url)
    this.resolveCache.set(url, result)
    console.log(`Resolved content length: ${result.length}`)
    return result
  }

  async summarize(url: string) {
    console.log(`Summarizing URL: ${url}`)
    if (this.summarizeCache.has(url)) {
      console.log('[websearch tool] Returning cached summary')
      return this.summarizeCache.get(url)!
    }

    console.log('[websearch tool] Resolving content for summarization')
    const content = await this.resolve(url)
    console.log('[websearch tool] Requesting summarization from AI')
    const summary = await requestSummarize(content)
    this.summarizeCache.set(url, summary)
    console.log(`Generated summary length: ${summary.length}`)
    return summary
  }
}

// curl "https://r.jina.ai/" \
//   -H "Authorization: Bearer jina_b6a5c47a714e4793a1921011bc2dc29baX0GbhtidBwRp0yKFelSQj5lEMff" \
//   -H "Content-Type: application/json" \
//   -H "X-Base: final" \
//   -H "X-Md-Link-Style: referenced" \
//   -H "X-Timeout: 10" \
//   -H "X-With-Generated-Alt: true" \
//   -d @- <<EOFEOF
//   {
//     "url": "https://gmonad.cc/events/12"
//   }
// EOFEOF

async function extractImages(content: string) {
  const images = content.match(/\!\[.*?\]\((.*?)\)/g)
  const outputs: { type: 'image', image: ArrayBuffer }[] = []

  if (!images) {
    return []
  }

  for (const image of images.slice(0, 10)) {
    if (image.startsWith('http')) {
      outputs.push({
        type: 'image',
        image: await ky.get(image).arrayBuffer(),
      } as const)
    }
  }
  return outputs
}

async function requestSummarize(content: string) {
  console.log('[websearch tool] Sending content to summarization model')
  const { text, usage } = await generateText({
    model: openrouter('google/gemini-2.5-flash-lite'),
    system: SUMMARIZER_SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: `
              Here is the content of the web page:
              ${content}
            `,
            
          },
          ...(await extractImages(content)) ?? [],
        ],
        
      },
    ],
    maxSteps: 20,
  })

  console.log('[websearch tool] Summarization model finished', { usage })
  return text
}

async function requestResolve(url: string) {
  console.log(`Requesting full content from Jina for URL: ${url}`)
  const response = await ky.post('https://r.jina.ai/', {
    headers: {
      'Authorization': 'Bearer ' + import.meta.env.VITE_JINA_API_KEY,
      'Content-Type': 'application/json',
      'X-Base': 'final',
      'X-Md-Link-Style': 'referenced',
      'X-Timeout': '10',
      'X-With-Generated-Alt': 'true',
    },
    json: {
      url,
    },
  })

  if (!response.ok) {
    console.error(`Jina API request failed with status ${response.status}`, { url })
    throw new Error(`Failed to resolve URL: ${response.statusText}`)
  }

  console.log(`Jina API request successful`)
  return response.text()
}

async function requestSearch(query: string) {
  console.log(`Requesting search from Jina for query: "${query}"`)
  const response = await ky.get('https://s.jina.ai/?q=' + encodeURIComponent(query), {
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + import.meta.env.VITE_JINA_API_KEY,
      'X-Respond-With': 'no-content',
      'X-With-Favicons': 'true',
    },
  })

  const data = await response.json<any>()

  if (!response.ok || data.code !== 200) {
    console.error('Jina search API request failed', { query, response: data })
    throw new Error('Failed to search')
  }

  const searchResults = data.data.map((result: any) => ({
    title: result.title,
    url: result.url,
    date: result.date,
    description: result.description,
    favicon: result.favicon,
  })) as SearchResult[]

  console.log(`Jina search returned ${searchResults.length} results`)
  return searchResults
}
