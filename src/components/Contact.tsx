import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Loader2, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Contact: React.FC = () => {
  const { data } = usePortfolio();
  const { contact, profile } = data;

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Field validations
    if (!formData.name.trim()) {
      setStatus('error');
      setErrorMessage('Please provide your name.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus('error');
      setErrorMessage('Message must be at least 10 characters long.');
      return;
    }

    setStatus('loading');

    // Transparent real-world handling:
    // Check if an API backend or EmailJS is configured via env variables
    const apiUrl = import.meta.env.VITE_CONTACT_API_URL;

    if (apiUrl) {
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
          return;
        }
      } catch {
        // Fallback to mailto
      }
    }

    // Default authentic fallback: Open user's email client with prefilled details
    setTimeout(() => {
      setStatus('success');
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`, '_blank');
      setFormData({ name: '', email: '', message: '' });
    }, 600);
  };

  return (
    <section id="contact" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Get In Touch
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Let&apos;s Connect &amp; Collaborate
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Available for software engineering internships, technical collaborations, and hackathons.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs space-y-4">
              <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Contact Details
              </h3>

              {/* Email */}
              {contact.email && (
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-zinc-500">Email</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-emerald-500 transition-colors">
                      {contact.email}
                    </div>
                  </div>
                </a>
              )}

              {/* Phone (Only if present) */}
              {contact.phone && contact.phone.trim().length > 0 && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors group"
                >
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-zinc-500">Phone (Click to call)</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-500 transition-colors">
                      {contact.phone}
                    </div>
                  </div>
                </a>
              )}

              {/* Location */}
              {contact.location && (
                <div className="flex items-start gap-3 p-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-500 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-zinc-500">Location</div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {contact.city ? `${contact.city}, ` : ''}{contact.state ? `${contact.state}, ` : ''}{contact.country || contact.location}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Availability card */}
            <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-xs text-zinc-600 dark:text-zinc-400 space-y-2">
              <div className="font-semibold text-zinc-900 dark:text-zinc-200">
                // Current Availability
              </div>
              <p>
                {profile.statusAvailability || "Actively open to software engineering internships and open-source collaborations."}
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xs">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6">
                Fill out the form below. In development mode without a custom backend endpoint configured, clicking send opens your system email client with your message prefilled.
              </p>

              {status === 'success' && (
                <div className="p-4 mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    Thank you! Your message was formatted and prepared in your email client.
                  </span>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 mb-6 rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage || 'An error occurred. Please check the inputs.'}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    maxLength={80}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Johnson"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Your Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    maxLength={100}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label htmlFor="contact-message" className="text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300">
                      Message *
                    </label>
                    <span className="text-[10px] font-mono text-zinc-400">
                      {formData.message.length}/1000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    maxLength={1000}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about your opportunity, project, or question..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 text-sm placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-white transition-all disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
