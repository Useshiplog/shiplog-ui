import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sendMessage, getSessions } from '../../features/chat/chatService';
import './Chat.css';

const Chat = () => {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'global';
    const release_id = searchParams.get('release_id');

    const [sessions, setSessions] = useState([]);
    const [activeSessionId, setActiveSessionId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch sessions on load (only for global mode)
    useEffect(() => {
        if (mode === 'global') {
            const fetchSessions = async () => {
                try {
                    const sessionsData = await getSessions();
                    setSessions(sessionsData || []);
                } catch (err) {
                    setError(err.message || 'Failed to load sessions');
                }
            };
            fetchSessions();
        }
    }, [mode]);

    const handleNewChat = () => {
        setActiveSessionId(null);
        setMessages([]);
        setError(null);
    };

    const handleSessionClick = (sessionId) => {
        setActiveSessionId(sessionId);
        setMessages([]);
        setError(null);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputText.trim() || loading) return;

        const userMessage = inputText.trim();
        setInputText('');
        setError(null);
        setLoading(true);

        // Add user message to UI immediately
        const userMsg = { role: 'user', content: userMessage };
        setMessages(prev => [...prev, userMsg]);

        try {
            const response = await sendMessage({
                mode: 'global',
                release_id: null,
                session_id: activeSessionId,
                message: userMessage,
            });

            // If this was a new session, update activeSessionId and refetch sessions
            if (!activeSessionId && response.session_id) {
                setActiveSessionId(response.session_id);
                // Refetch sessions to update sidebar
                try {
                    const sessionsData = await getSessions();
                    setSessions(sessionsData || []);
                } catch (err) {
                    // Non-critical error, just log it
                    console.error('Failed to refetch sessions:', err);
                }
            }

            // Add assistant response
            const assistantMsg = { role: 'assistant', content: response.message || response.content || 'Response received' };
            setMessages(prev => [...prev, assistantMsg]);
        } catch (err) {
            setError(err.message || 'Failed to send message');
            // Remove the user message on error
            setMessages(prev => prev.slice(0, -1));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatContainer">
            {mode === "global" && (
                <div className="chatSidebar">
                    <button className="newChatButton" onClick={handleNewChat}>
                        + New Chat
                    </button>
                    <div className="sessionsList">
                        {sessions.length === 0 ? (
                            <div className="sessionsEmpty">No sessions yet</div>
                        ) : (
                            sessions.map((session) => (
                                <div
                                    key={session.id || session.session_id}
                                    className={`sessionItem ${activeSessionId === (session.id || session.session_id) ? 'active' : ''}`}
                                    onClick={() => handleSessionClick(session.id || session.session_id)}
                                >
                                    {session.title || session.name || `Session ${session.id || session.session_id}`}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            <div className="chatMain">
                <div className="chatHeader">
                    {mode === "release"
                        ? `Release: ${release_id}`
                        : "Global Chat"}
                </div>

                <div className="chatMessages">
                    {messages.length === 0 ? (
                        <div className="emptyState">
                            {activeSessionId
                                ? "Session loaded. Conversation history will appear soon."
                                : "Start a conversation…"}
                        </div>
                    ) : (
                        <div className="messagesList">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`message ${msg.role}`}>
                                    <div className="messageContent">{msg.content}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {error && (
                    <div className="chatError">
                        {error}
                    </div>
                )}

                <form className="chatInput" onSubmit={handleSendMessage}>
                    <input
                        placeholder="Ask Shiplog AI…"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading || !inputText.trim()}>
                        {loading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
