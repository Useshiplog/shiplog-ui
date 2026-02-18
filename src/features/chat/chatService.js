import { SYSTEM2_API_URL } from "../../constants/constants";

export async function sendMessage({
    mode,
    release_id = null,
    session_id = null,
    message,
}) {
    if (!SYSTEM2_API_URL) {
        throw new Error('System 2 API URL is not configured. Please set VITE_SYSTEM2_API_URL environment variable.');
    }

    const response = await fetch(`${SYSTEM2_API_URL}/v1/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mode,
            release_id,
            session_id,
            message,
        }),
        credentials: 'include',
    });

    let data;
    try {
        data = await response.json();
    } catch (error) {
        throw new Error(`Failed to parse response: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
        throw new Error(data.message || `Chat request failed: ${response.status} ${response.statusText}`);
    }
    return data;
}

export async function getSessions() {
    if (!SYSTEM2_API_URL) {
        throw new Error('System 2 API URL is not configured. Please set VITE_SYSTEM2_API_URL environment variable.');
    }

    const response = await fetch(`${SYSTEM2_API_URL}/v1/chat/sessions`, {
        method: 'GET',
        credentials: 'include',
    });

    let data;
    try {
        data = await response.json();
    } catch (error) {
        throw new Error(`Failed to parse response: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
        throw new Error(data.message || `Failed to fetch sessions: ${response.status} ${response.statusText}`);
    }
    return data.sessions;
}

export async function getMessages(sessionId) {
    if (!SYSTEM2_API_URL) {
        throw new Error('System 2 API URL is not configured. Please set VITE_SYSTEM2_API_URL environment variable.');
    }

    if (!sessionId) {
        throw new Error('Session ID is required to fetch messages.');
    }

    const response = await fetch(`${SYSTEM2_API_URL}/v1/chat/${sessionId}/messages`, {
        method: 'GET',
        credentials: 'include',
    });

    let data;
    try {
        data = await response.json();
    } catch (error) {
        throw new Error(`Failed to parse response: ${response.status} ${response.statusText}`);
    }

    if (!response.ok) {
        throw new Error(data.message || `Failed to fetch messages: ${response.status} ${response.statusText}`);
    }
    return data.messages || [];
}
