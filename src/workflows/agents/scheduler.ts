import { PROMPT_ROLE_BASE, PROMPT_ROLE_PLANNER } from '../prompts';
import { generateText, tool, type LanguageModel } from "ai";
import { z } from 'zod'

const timelineItemSchema = z.object({
  when: z.string().describe("YYYYMMDDHHMM+ZZZZ 格式的时间戳，例如 '202310151430+0800' 表示 2023 年 10 月 15 日 14:30，北京时间"),
  title: z.string().describe("事件标题，简洁描述事件内容"),
  description: z.string().describe("事件详细描述，包括必要细节、地点、注意事项等")
});

const terminateSchema = z.object({
  timeline: z.array(timelineItemSchema).describe("完整的时间线数组，按时间顺序排序")
});

export async function schedule(
  model: LanguageModel, 
  summary: Record<string, string>, 
  webReport: string, 
  onTerminate: (timeline: string) => Promise<void>
) {
  const summaryText = Object.entries(summary)
    .map(([key, value]) => `**${key}**: ${value}`)
    .join('\n\n');

  return await generateText({
    model,
    prompt: `${PROMPT_ROLE_BASE}\n\n${PROMPT_ROLE_PLANNER}\n\n# 输入信息\n\n## 信息收集摘要\n\n${summaryText}\n\n## Web搜索研究报告\n\n${webReport}`,
    tools: {
      terminate: tool({
        description: "当时间线完全生成后，调用此工具以结束任务，并提交最终成果。",
        parameters: terminateSchema,
        execute: async (args) => {
          const { timeline } = args;
          const timelineJson = JSON.stringify(timeline, null, 2);
          await onTerminate(timelineJson);
          return 'OK, 时间线已生成完毕，任务结束。';
        },
      }),
    },
    maxSteps: 10,
    maxRetries: 3
  });
}
