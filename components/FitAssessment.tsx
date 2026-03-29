'use client';

import { useState } from 'react';

export default function FitAssessment() {
  const [problem, setProblem] = useState('');
  const [assessment, setAssessment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAssessment('');
    setRetryAfter(null);

    try {
      const res = await fetch('/api/assess-fit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          problem,
          honeypot: '', // Anti-bot field (should always be empty)
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setRetryAfter(data.retryAfter || null);
        }
        setError(data.error || 'Something went wrong');
        return;
      }

      setAssessment(data.assessment);
    } catch (err) {
      setError('Failed to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-3">Am I Your Guy?</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Tell me about your project or problem, and I'll give you an honest assessment of whether I'm the right fit.
          I'm critical by nature—if I'm overkill for your needs or you'd be better served elsewhere, I'll tell you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field - hidden from humans, visible to bots */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute opacity-0 pointer-events-none"
          aria-hidden="true"
        />

        <div>
          <label htmlFor="problem" className="block text-sm font-medium mb-2">
            What are you working on?
          </label>
          <textarea
            id="problem"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Describe your project, problem, or what you're trying to build. The more context, the better the assessment."
            className="w-full h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            required
            minLength={20}
            maxLength={2000}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {problem.length}/2000 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={loading || problem.trim().length < 20}
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
        >
          {loading ? 'Thinking...' : 'Get Assessment'}
        </button>
      </form>

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

      {assessment && (
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Here's My Assessment:</h3>
          <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
            {assessment}
          </div>
        </div>
      )}
    </div>
  );
}
