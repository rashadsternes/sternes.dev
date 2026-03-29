'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface ConversationState {
  messages: Message[];
  conversationId: string;
  startedAt: number;
}

export default function FitAssessmentConversational() {
  const [conversation, setConversation] = useState<ConversationState>({
    messages: [],
    conversationId: crypto.randomUUID(),
    startedAt: Date.now(),
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryAfter, setRetryAfter] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: Date.now(),
    };

    // Optimistically add user message
    setConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
    }));
    setInput('');
    setLoading(true);
    setError('');
    setRetryAfter(null);

    try {
      const res = await fetch('/api/assess-fit/conversation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...conversation.messages, userMessage],
          conversationId: conversation.conversationId,
          honeypot: '',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setRetryAfter(data.retryAfter || null);
        }
        setError(data.error || 'Something went wrong');
        // Remove optimistic user message on error
        setConversation((prev) => ({
          ...prev,
          messages: prev.messages.slice(0, -1),
        }));
        setInput(userMessage.content); // Restore input
        return;
      }

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: Date.now(),
      };

      setConversation((prev) => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
      }));
    } catch (err) {
      setError('Failed to connect. Please try again.');
      // Remove optimistic user message on error
      setConversation((prev) => ({
        ...prev,
        messages: prev.messages.slice(0, -1),
      }));
      setInput(userMessage.content);
    } finally {
      setLoading(false);
    }
  };

  const resetConversation = () => {
    setConversation({
      messages: [],
      conversationId: crypto.randomUUID(),
      startedAt: Date.now(),
    });
    setInput('');
    setError('');
    setRetryAfter(null);
  };

  const isFirstMessage = conversation.messages.length === 0;
  const turnCount = Math.ceil(conversation.messages.length / 2);
  const maxTurns = 5; // Limit conversation length

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-3">Am I Your Guy?</h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isFirstMessage
                ? "Tell me about your project, and I'll give you an honest assessment. Ask follow-up questions if you want more detail."
                : `Conversation (${turnCount}/${maxTurns} turns)`}
            </p>
          </div>
          {!isFirstMessage && (
            <button
              onClick={resetConversation}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline"
            >
              Start Over
            </button>
          )}
        </div>
      </div>

      {/* Conversation Thread */}
      {conversation.messages.length > 0 && (
        <div className="mb-6 space-y-4 max-h-[500px] overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          {conversation.messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                <div
                  className={`text-xs mt-2 ${
                    msg.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Input Form */}
      {turnCount < maxTurns ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="absolute opacity-0 pointer-events-none"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="input" className="block text-sm font-medium mb-2">
              {isFirstMessage ? 'What are you working on?' : 'Follow-up question or more context'}
            </label>
            {isFirstMessage ? (
              <textarea
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your project, problem, or what you're trying to build. The more context, the better the assessment."
                className="w-full h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
                minLength={20}
                maxLength={2000}
              />
            ) : (
              <input
                type="text"
                id="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a follow-up question or provide more details..."
                className="w-full p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength={5}
                maxLength={500}
              />
            )}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {input.length}/{isFirstMessage ? 2000 : 500} characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || input.trim().length < (isFirstMessage ? 20 : 5)}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {loading ? 'Thinking...' : isFirstMessage ? 'Get Assessment' : 'Send'}
          </button>
        </form>
      ) : (
        <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-yellow-800 dark:text-yellow-200 mb-4">
            We've reached the conversation limit ({maxTurns} turns). If you'd like to continue the
            discussion, let's move to email or schedule a call.
          </p>
          <div className="flex gap-3">
            <button
              onClick={resetConversation}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg"
            >
              Start New Assessment
            </button>
            <a
              href="mailto:your@email.com"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Email Me
            </a>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200 font-medium">{error}</p>
          {retryAfter && (
            <p className="text-red-700 dark:text-red-300 text-sm mt-2">
              You can try again in approximately {retryAfter} minute{retryAfter !== 1 ? 's' : ''}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
