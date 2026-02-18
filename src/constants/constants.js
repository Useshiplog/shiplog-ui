// System 1 API URL - Main backend (Auth, Releases, OAuth)
export const SYSTEM1_API_URL = "http://localhost:5001";

// System 2 API URL - AI backend (Chat, Query, Documents)
// Uses proxy route to enable cookie forwarding in development
// export const SYSTEM2_API_URL = '/api/system2';
export const SYSTEM2_API_URL = "https://ai.useshiplog.com";

// Legacy constants for backward compatibility (will be removed after migration)
export const API_URL = "http://localhost:5001"
export const CHAT_API_URL = "http://localhost:8000"

export const GITHUB_CLIENT_ID = "useshiplog";
export const GITHUB_AUTH_URL = "https://github.com/apps/useshiplog/installations/new";
export const JIRA_CLIENT_ID = "pHAPkSqsqFXy8hCnPM4j6xkbIZOiVsse";
export const JIRA_AUTH_URL = "https://auth.atlassian.com/authorize";
export const JIRA_CALLBACK_URL = "https://nonconstructive-unquayed-carri.ngrok-free.dev/v1/jira/install/callback";