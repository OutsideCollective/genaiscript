export const CHANGE = "change"
export const MAX_CACHED_TEMPERATURE = 0.01
export const MAX_CACHED_TOP_P = 0.5
//https://learn.microsoft.com/en-us/azure/ai-services/openai/reference
export const AZURE_OPENAI_API_VERSION = "2023-09-01-preview"
export const TOOL_ID = "genaiscript"
export const GENAISCRIPT_FOLDER = "." + TOOL_ID
export const CLI_JS = TOOL_ID + ".cjs"
export const GENAI_SRC = "genaisrc"
export const GENAI_EXT = ".genai.js"
export const TOOL_NAME = "GenAIScript"
export const SERVER_PORT = 8003
export const CLIENT_RECONNECT_DELAY = 2000
export const RETREIVAL_PERSIST_DIR = "retreival"
export const HIGHLIGHT_LENGTH = 4000
export const DEFAULT_MODEL = "gpt-4"
export const DEFAULT_TEMPERATURE = 0.2 // 0.0-2.0, defaults to 1.0
export const BUILTIN_PREFIX = "_builtin/"
export const CACHE_LLMREQUEST_PREFIX = "cache.llm.request/"
export const CACHE_AIREQUEST_PREFIX = "cache.ai.request/"
export const TOKENS_STATUS_BAR_DEBOUNCE_TIME = 800
export const EXTENSION_ID = "genaiscript.genaiscript-vscode"
export const CHAT_PARTICIPANT_ID = TOOL_ID
export const BING_SEARCH_ENDPOINT = "https://api.bing.microsoft.com/v7.0/search"
export const LLAMAINDEX_SIMILARITY_TOPK = 5
export const LLAMAINDEX_MIN_SCORE = 0.7
export const RETRIEVAL_DEFAULT_INDEX = "default"
export const RETRIEVAL_DEFAULT_MODEL = "gpt-4"
export const SYSTEM_FENCE = "---"
export const MAX_DATA_REPAIRS = 1
export const NPM_CLI_PACKAGE = "genaiscript"
export const AICI_CONTROLLER = "gh:microsoft/aici/jsctrl"
export const ICON_LOGO_NAME = "genaiscript-logo"
export const SARIFF_RULEID_PREFIX = "genascript/"
export const SARIFF_BUILDER_URL = "https://github.com/microsoft/genaiscript/"
export const SARIFF_BUILDER_TOOL_DRIVER_NAME = TOOL_ID
export const GENAI_JS_REGEX = /\.genai\.js$/i
export const GPSPEC_REGEX = /\.gpspec\.md$/i


export const UNHANDLED_ERROR_CODE = -1
export const ANNOTATION_ERROR_CODE = -2
export const FILES_NOT_FOUND_ERROR_CODE = -3
export const GENERATION_ERROR_CODE = -4
export const RUNTIME_ERROR_CODE = -5

export const DOT_ENV_REGEX = /\.env$/i
