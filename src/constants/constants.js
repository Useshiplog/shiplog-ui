// System 1 API URL - Main backend (Auth, Releases, OAuth)
export const SYSTEM1_API_URL = "https://api.useshiplog.com";

// System 2 API URL - AI backend (Chat, Query, Documents)
// Uses proxy route to enable cookie forwarding in development
// export const SYSTEM2_API_URL = '/api/system2';
export const SYSTEM2_API_URL = "https://ai.useshiplog.com";

// Legacy constants for backward compatibility (will be removed after migration)
export const API_URL = "https://api.useshiplog.com"
export const CHAT_API_URL = "https://ai.useshiplog.com"

export const GITHUB_CLIENT_ID = "use-shiplog";
export const GITHUB_AUTH_URL = "https://github.com/apps/use-shiplog/installations/new";
export const JIRA_CLIENT_ID = "mz4FuS6QpLFTK2mzlmFR28zVIW0kQEni";
export const JIRA_AUTH_URL = "https://auth.atlassian.com/authorize";
export const JIRA_CALLBACK_URL = "https://api.useshiplog.com/v1/jira/install/callback";