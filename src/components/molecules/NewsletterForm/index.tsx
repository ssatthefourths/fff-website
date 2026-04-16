import React, { useState } from 'react';
import { Button } from '../../atoms/Button';

// Bento newsletter integration
// Docs: https://docs.bentonow.com/subscribers
// Endpoint: POST https://api.bentonow.com/v1/batch/subscribers
// Auth: Bearer token — set VITE_BENTO_API_KEY in .env

export interface NewsletterFormProps {
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: () => void;
  /** Tags to attach to the subscriber in Bento */
  tags?: string;
  /** Optional: override button variant */
  buttonVariant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'outline';
  /** Optional: extra classes on the container */
  className?: string;
}

export function NewsletterForm({
  placeholder = 'Enter your email',
  buttonLabel = 'Subscribe',
  successMessage = "You're in! Check your inbox for a welcome gift.",
  errorMessage = 'Something went wrong. Please try again.',
  onSuccess,
  tags,
  buttonVariant = 'secondary',
  className = '',
}: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === 'loading') return;

    setStatus('loading');

    const apiKey = import.meta.env.VITE_BENTO_API_KEY as string | undefined;
    if (!apiKey) {
      console.warn('NewsletterForm: VITE_BENTO_API_KEY is not set. Submission skipped.');
      setStatus('success');
      onSuccess?.();
      return;
    }

    try {
      const body: { email: string; tags?: string } = { email };
      if (tags) body.tags = tags;

      const res = await fetch('https://app.bentonow.com/api/v1/batch/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ subscribers: [body] }),
      });

      if (res.ok || res.status === 200 || res.status === 201) {
        setStatus('success');
        setEmail('');
        onSuccess?.();
      } else {
        console.error('Bento API error:', res.status, await res.text());
        setStatus('error');
      }
    } catch (err) {
      console.error('NewsletterForm fetch error:', err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <p
        className="font-['Avenir:Book',sans-serif] leading-[1.6] not-italic text-[#3f3f3f] text-[18px]"
      >
        {successMessage}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-[12px] items-center w-full ${className}`}
    >
      {/* Email input — styled to match the search bar visual from the design */}
      <div className="relative flex-1 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          disabled={status === 'loading'}
          className="w-full px-[24px] py-[16px] rounded-[100px] border-2 border-[#8B52C5] bg-[#FFFDF3] font-['Avenir:Book',sans-serif] text-[18px] text-[#3f3f3f] placeholder-[#8b52c5] placeholder-opacity-60 outline-none focus:ring-2 focus:ring-[#8B52C5] transition-shadow disabled:opacity-60"
        />
      </div>

      <Button
        type="submit"
        variant={buttonVariant}
        label={status === 'loading' ? 'Sending…' : buttonLabel}
        disabled={status === 'loading'}
      />

      {status === 'error' && (
        <p className="w-full text-red-600 text-[14px] mt-1">{errorMessage}</p>
      )}
    </form>
  );
}

export default NewsletterForm;
