import type { Attachment, JSONValue } from "ai"

export interface ToolResult<TName extends string = string, TParameters = any, TResponse = any> {
  toolName: TName
  toolParameters: TParameters
  result: TResponse
}

export interface ToolInvocation {
  state: "call" | "result"
  toolCallId: string
  toolName: string
  args?: string
  result?: unknown
  step?: number
}

export interface Message {
  id: string
  createdAt?: Date
  content: string
  role: "system" | "user" | "assistant" | "data"
  data?: JSONValue
  reasoning?: string
  experimental_attachments?: Attachment[]
  annotations?: JSONValue[]
  toolInvocations?: ToolInvocation[]
}

