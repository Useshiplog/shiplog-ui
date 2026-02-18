import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { sendMessage, getSessions, getMessages } from '../../features/chat/chatService';
import './Chat.css';

const Chat = ({ mode = 'global' }) => {
    const { releaseId } = useParams();

    const [sessions, setSessions] = useState([]);
    const [activeSessionId, setActiveSessionId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [error, setError] = useState(null);

    // Fetch sessions on load and set active session
    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const sessionsData = await getSessions();
                setSessions(sessionsData || []);

                if (mode === 'global') {
                    // Load latest global session
                    const globalSessions = sessionsData?.filter(s => s.mode === 'global') || [];
                    if (globalSessions.length > 0) {
                        // Get the most recent session (assuming sessions are sorted by creation time)
                        const latestSession = globalSessions[0];
                        setActiveSessionId(latestSession.session_id || latestSession.id);
                    }
                } else if (mode === 'release' && releaseId) {
                    // Find and set active release session
                    const releaseSession = sessionsData?.find(
                        session => session.mode === 'release' && session.release_id === releaseId
                    );
                    if (releaseSession) {
                        setActiveSessionId(releaseSession.session_id || releaseSession.id);
                    }
                }
            } catch (err) {
                setError(err.message || 'Failed to load sessions');
            }
        };
        fetchSessions();
    }, [mode, releaseId]);

    // Fetch messages when activeSessionId changes
    useEffect(() => {
        if (!activeSessionId) {
            setMessages([]);
            return;
        }

        const fetchMessages = async () => {
            setLoadingMessages(true);
            try {
                const messagesData = await getMessages(activeSessionId);
                setMessages(messagesData || []);
            } catch (err) {
                setError(err.message || 'Failed to load messages');
                setMessages([]);
            } finally {
                setLoadingMessages(false);
            }
        };

        fetchMessages();
    }, [activeSessionId]);

    const handleNewChat = () => {
        setActiveSessionId(null);
        setMessages([]);
        setError(null);
    };

    const handleSessionClick = (sessionId) => {
        setActiveSessionId(sessionId);
        setError(null);
        // Messages will be loaded by useEffect when activeSessionId changes
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
                mode: mode,
                release_id: mode === 'release' ? releaseId : null,
                session_id: activeSessionId,
                message: userMessage,
            });

            // If this was a new session, update activeSessionId and refetch sessions
            if (!activeSessionId && response.session_id) {
                setActiveSessionId(response.session_id);
                // Refetch sessions to update sidebar (only for global mode)
                if (mode === 'global') {
                    try {
                        const sessionsData = await getSessions();
                        setSessions(sessionsData || []);
                    } catch (err) {
                        // Non-critical error, just log it
                        console.error('Failed to refetch sessions:', err);
                    }
                }
            }

            // Add assistant response using real API response
            const assistantMsg = { 
                role: 'assistant', 
                content: response.answer || response.message || response.content || 'Response received' 
            };
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
                        ? (
                            <>
                                <div>Release Chat</div>
                                <div className="chatHeaderReleaseId">{releaseId}</div>
                            </>
                        )
                        : "Global Chat"}
                </div>

                <div className="chatMessages">
                    {loadingMessages ? (
                        <div className="emptyState">Loading messages...</div>
                    ) : messages.length === 0 ? (
                        <div className="emptyState">Start a conversation…</div>
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
