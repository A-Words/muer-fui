import { collect } from './workflows/agents/collector'
import { websearch } from './workflows/agents/websearch'
import { schedule } from './workflows/agents/scheduler'
import { openrouter, siliconflow } from './workflows/provider'
import readline from 'node:readline/promises'

const modelV3 = siliconflow('deepseek-ai/DeepSeek-V3')
const modelFlash = openrouter('google/gemini-2.5-flash')
const modelK2 = siliconflow('moonshotai/Kimi-K2-Instruct')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const query = await rl.question('用户输入: ')

// Stage 1: 信息收集
console.log('\n=== 阶段 1: 信息收集 ===')
let collectedSummary: Record<string, string> = {}

await collect(modelV3, query, async (questions) => {
  const answers = []
  console.log('\n问题列表:')
  for (const question of questions) {
    console.log(`- ${question}`)
    const answer = await rl.question(`${question}: `)
    answers.push(answer)
  }
  return answers
}, async (summary, reason) => {
  console.log('\n收集的信息摘要:')
  console.log(summary)
  collectedSummary = summary
  console.log(`\n收集信息完成: ${reason}`)
})

// Stage 2: Web 搜索
console.log('\n=== 阶段 2: Web 搜索 ===')
let webReport = ''

await websearch(
  modelFlash, 
  query, 
  Object.entries(collectedSummary).map(([key, value]) => `${key}: ${value}`).join('\n'),
  async (summary) => {
    console.log('\nWeb 搜索报告完成:')
    webReport = Object.entries(summary).map(([key, value]) => `## ${key}\n\n${value}`).join('\n\n')
    console.log(webReport)
  },
  async (results, llms) => {
    console.log(`\n搜索到 ${results.length} 个结果`)
  },
  async (summary) => {
    console.log('\n获取网页摘要...')
  },
  async (content) => {
    console.log('\n解析网页内容...')
  }
)

// Stage 3: 日程安排
console.log('\n=== 阶段 3: 日程安排 ===')
await schedule(
  modelK2,
  collectedSummary,
  webReport,
  async (timeline) => {
    console.log('\n=== 最终日程安排 ===')
    console.log(timeline)
    console.log('\n日程安排完成！')
  }
)

rl.close()