// Import necessary types and functions from local modules
import {
    ChatCompletionContentPart,
    ChatCompletionContentPartText,
    ChatCompletionMessageParam,
    ChatCompletionTool,
} from "./chattypes"
import { encodeChat } from "gpt-tokenizer"
import { logVerbose } from "./util"
import { parseModelIdentifier } from "./models"

/**
 * Estimates the number of tokens in chat messages for a given model.
 * Utilizes token encoding to provide an accurate count of tokens in text-based chat content.
 *
 * @param modelId - The identifier of the model being used.
 * @param messages - An array of chat messages containing roles and content.
 * @param tools - Optional array of tools used in chat completion.
 * @returns The estimated number of tokens or 0 if no valid messages are found.
 */
export function estimateChatTokens(
    modelId: string,
    messages: ChatCompletionMessageParam[],
    tools?: ChatCompletionTool[]
): number {
    // Return 0 if no messages are provided
    if (!messages?.length) return 0
    try {
        const model = resolveChatModelId(modelId)
        // Check if any message content includes image URLs.
        // If found, return undefined as images are not supported for token encoding.
        if (
            messages.find(
                (msg) =>
                    msg.content !== "string" &&
                    Array.isArray(msg.content) &&
                    (msg.content as ChatCompletionContentPart[])?.find(
                        (part) => part.type === "image_url"
                    )
            )
        )
            return undefined

        // Transform the messages into a format suitable for the token encoder
        const chat: {
            role: "user" | "system" | "assistant"
            content: string
        }[] = messages
            .filter(
                ({ role }) =>
                    role === "user" ||
                    role === "system" ||
                    role === "assistant" ||
                    role === "tool"
            )
            .map(({ role, content }) => ({
                // cheating
                role:
                    role === "tool"
                        ? "system"
                        : (role as "user" | "system" | "assistant"),
                content:
                    typeof content === "string"
                        ? content // Use the string content directly
                        : content // Filter and join text parts if content is structured
                              ?.filter(({ type }) => type === "text")
                              .map(
                                  (c) =>
                                      (c as ChatCompletionContentPartText).text
                              )
                              .join("\n"), // Join with newline for readability
            }))
            .filter(({ content }) => !!content?.length) // Remove entries with empty content
            .map(({ role, content }) => ({
                role,
                content: content.replace(
                    /<|(im_start|im_end)|>/g,
                    (_, token) => `< |${token}| >`
                ),
            }))

        // Encode the chat messages and count the number of tokens
        const chatTokens = encodeChat(chat, model).length | 0

        return chatTokens // Bitwise OR with 0 ensures integer return
    } catch (e) {
        // Log any errors encountered during processing
        logVerbose(e)
        // Fallback: Estimate token count based on JSON string length
        return (JSON.stringify(messages).length / 3) | 0
    }
}

function resolveChatModelId(modelId: string): any {
    const cl100k_base = true
    const o200k_base = true
    const chatEnabledModelsMap: Record<string, boolean> = {
        "gpt-4": cl100k_base,
        "gpt-4-0314": cl100k_base,
        "gpt-4-0613": cl100k_base,
        "gpt-4-32k": cl100k_base,
        "gpt-4-32k-0314": cl100k_base,
        "gpt-4-32k-0613": cl100k_base,
        "gpt-4-turbo": cl100k_base,
        "gpt-4-turbo-2024-04-09": cl100k_base,
        "gpt-4-turbo-preview": cl100k_base,
        "gpt-4-1106-preview": cl100k_base,
        "gpt-4-0125-preview": cl100k_base,
        "gpt-4-vision-preview": cl100k_base,
        "gpt-4o": o200k_base,
        "gpt-4o-2024-05-13": o200k_base,
        "gpt-4o-2024-08-06": o200k_base,
        "gpt-4o-mini-2024-07-18": o200k_base,
        "gpt-4o-mini": o200k_base,
        "gpt-3.5-turbo": cl100k_base,
        "gpt-3.5-turbo-0301": cl100k_base,
        "gpt-3.5-turbo-0613": cl100k_base,
        "gpt-3.5-turbo-1106": cl100k_base,
        "gpt-3.5-turbo-0125": cl100k_base,
        "gpt-3.5-turbo-16k": cl100k_base,
        "gpt-3.5-turbo-16k-0613": cl100k_base,
        "gpt-3.5-turbo-instruct": cl100k_base,
        "gpt-3.5-turbo-instruct-0914": cl100k_base,
    } as const
    const { model } = parseModelIdentifier(modelId)
    return chatEnabledModelsMap[model] ? model : "gpt-4o"
}
