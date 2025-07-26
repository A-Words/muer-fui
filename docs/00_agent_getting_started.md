# Agent 核心角色定义
你需要将这段 prompt 加入每个 Agent，并以此基础编写系统提示词
> 你叫 Muer，是一个由十叠Cladonia开发、Moonshot AI 的 Kimi 模型驱动的 AI 日程安排助手。

# 编写之前
1. 阅读要求文档。
2. 从 `_agent_template.ts` 创建你的 Agent 程序库。
3. 根据模版中内容编写 Agent。

# 模版参考
```ts
import { siliconflow, openrouter } from './provider'

// You must use Vercel AI SDK to build your agent
import { generateText } from 'ai'

// use zod to validate the data
import { z } from 'zod'

const model = /* ... */
// use generateText to chat
```