import { API_URL, GITHUB_AUTH_URL, GITHUB_CLIENT_ID, JIRA_AUTH_URL, JIRA_CALLBACK_URL, JIRA_CLIENT_ID } from "../../constants/constants";

/**
 * Fetches a signed OAuth state token from the backend.
 * @param {'github' | 'jira'} provider 
 * @returns {Promise<string>} The signed state JWT
 */
export const getOAuthState = async (provider) => {
    try {
        const response = await fetch(`${API_URL}/v1/auth/${provider}/state`, {
            method: 'GET',
            credentials: 'include',
        });

        if (response.status === 401) {
            console.error('[OAuth] User not authenticated on backend');
            throw new Error('Please log in again to connect your integrations.');
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Failed to fetch ${provider} state`);
        }

        const data = await response.json();

        if (!data.state) {
            throw new Error(`Malformed response: Missing state for ${provider}`);
        }

        return data.state;
    } catch (error) {
        console.error(`[OAuth] Error fetching ${provider} state:`, error);
        throw error;
    }
};


export const redirectToOAuth = async (provider) => {
    try {
        console.log(`[OAuth] Initiating ${provider} redirection...`);
        const state = await getOAuthState(provider);

        let authUrl = '';

        if (provider === 'github') {
            const clientId = GITHUB_CLIENT_ID;
            const baseUrl = GITHUB_AUTH_URL;
            authUrl = `${baseUrl}?state=${state}`;
        } else if (provider === 'jira') {
            const clientId = JIRA_CLIENT_ID;
            const baseUrl = JIRA_AUTH_URL;
            const redirectUri = encodeURIComponent(JIRA_REDIRECT_URI);

            const params = new URLSearchParams({
                audience: 'api.atlassian.com',
                client_id: clientId,
                scope: 'read:jira-work manage:jira-webhook',
                redirect_uri: JIRA_CALLBACK_URL,
                state: state,
                response_type: 'code',
                prompt: 'consent'
            });

            authUrl = `${baseUrl}?${params.toString()}`;
        } else {
            throw new Error(`Unsupported OAuth provider: ${provider}`);
        }

        console.log(`[OAuth] Redirecting to ${provider}...`);
        window.location.href = authUrl;
    } catch (error) {
        alert(error.message);
    }
};
