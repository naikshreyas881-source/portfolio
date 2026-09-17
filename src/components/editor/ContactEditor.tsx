import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Code2,
  Globe,
  FileText,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Trash2
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../SocialIcons';
import { usePortfolio } from '../../context/PortfolioContext';

export const ContactEditor: React.FC = () => {
  const { data, updateContact } = usePortfolio();
  const { contact } = data;

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [saveToast, setSaveToast] = useState(false);

  // Email regex validator
  const validateEmail = (val: string) => {
    if (!val) return '';
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val) ? '' : 'Please enter a valid email address (e.g. name@domain.com)';
  };

  // URL validator
  const validateUrl = (val: string) => {
    if (!val) return '';
    if (val.startsWith('/') || val.startsWith('#')) return ''; // internal path or hash
    try {
      new URL(val);
      return '';
    } catch {
      return 'Please enter a valid URL (including https://)';
    }
  };

  const handleFieldChange = (field: keyof typeof contact, value: string) => {
    // Validate
    let error = '';
    if (field === 'email') error = validateEmail(value);
    if (['linkedin', 'github', 'leetcode', 'hackerRank', 'codeChef', 'website'].includes(field)) {
      error = validateUrl(value);
    }

    setValidationErrors(prev => ({ ...prev, [field]: error }));
    updateContact({ [field]: value });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  const handleClearField = (field: keyof typeof contact) => {
    updateContact({ [field]: '' });
    setValidationErrors(prev => ({ ...prev, [field]: '' }));
  };

  const contactFields = [
    {
      id: 'email' as const,
      label: 'Email Address',
      icon: Mail,
      placeholder: 'naikshreyas881@gmail.com',
      help: 'Provides click-to-email (mailto:) on portfolio and contact form.'
    },
    {
      id: 'phone' as const,
      label: 'Phone Number (Optional)',
      icon: Phone,
      placeholder: '+91 98765 43210',
      help: 'If empty, no phone details are ever rendered publicly.'
    },
    {
      id: 'location' as const,
      label: 'Location / Region',
      icon: MapPin,
      placeholder: 'Karnataka, India',
      help: 'Displayed in hero and footer.'
    },
    {
      id: 'city' as const,
      label: 'City',
      icon: MapPin,
      placeholder: 'Shivamogga',
      help: 'City for location metadata.'
    },
    {
      id: 'state' as const,
      label: 'State',
      icon: MapPin,
      placeholder: 'Karnataka',
      help: 'State region.'
    },
    {
      id: 'country' as const,
      label: 'Country',
      icon: MapPin,
      placeholder: 'India',
      help: 'Country.'
    },
    {
      id: 'linkedin' as const,
      label: 'LinkedIn Profile URL',
      icon: LinkedinIcon,
      placeholder: 'https://linkedin.com/in/shreyasnaik',
      help: 'Professional network link.'
    },
    {
      id: 'github' as const,
      label: 'GitHub Profile URL',
      icon: GithubIcon,
      placeholder: 'https://github.com/naikshreyas881-source',
      help: 'Source code repositories and open-source contributions.'
    },
    {
      id: 'leetcode' as const,
      label: 'LeetCode Profile URL',
      icon: Code2,
      placeholder: 'https://leetcode.com/shreyasnaik',
      help: 'DSA problem-solving profile.'
    },
    {
      id: 'hackerRank' as const,
      label: 'HackerRank Profile URL (Optional)',
      icon: Code2,
      placeholder: 'https://hackerrank.com/shreyasnaik',
      help: 'Leave empty if you do not wish to display.'
    },
    {
      id: 'codeChef' as const,
      label: 'CodeChef Profile URL (Optional)',
      icon: Code2,
      placeholder: 'https://codechef.com/users/shreyasnaik',
      help: 'Leave empty if you do not wish to display.'
    },
    {
      id: 'website' as const,
      label: 'Custom Website URL (Optional)',
      icon: Globe,
      placeholder: 'https://shreyasnaik.dev',
      help: 'Optional personal domain.'
    },
    {
      id: 'resume' as const,
      label: 'Resume Document Path / URL',
      icon: FileText,
      placeholder: '/resume.pdf',
      help: 'Path inside public/ or external PDF URL.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Mail className="w-5 h-5 text-emerald-500" />
            <h1 className="text-xl font-bold text-zinc-900 dark:text-white">Contact &amp; Social Endpoints</h1>
          </div>
          <p className="text-xs text-zinc-500">
            Fields left blank are automatically hidden from the public website. Broken links and placeholder data are strictly prevented.
          </p>
        </div>

        {saveToast && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <Check className="w-3.5 h-3.5" />
            Saved
          </span>
        )}
      </div>

      {/* Field Editor List */}
      <div className="space-y-4">
        {contactFields.map(item => {
          const Icon = item.icon;
          const value = contact[item.id] || '';
          const hasValue = Boolean(value.trim().length > 0);
          const error = validationErrors[item.id];

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all bg-white dark:bg-zinc-900 ${
                error
                  ? 'border-rose-500/50 dark:border-rose-500/40 shadow-xs shadow-rose-500/10'
                  : 'border-zinc-200 dark:border-zinc-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <label className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                    {item.label}
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      hasValue
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {hasValue ? (
                      <>
                        <Eye className="w-3 h-3" /> Publicly Active
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3" /> Hidden (Empty)
                      </>
                    )}
                  </span>

                  {hasValue && (
                    <button
                      type="button"
                      onClick={() => handleClearField(item.id)}
                      className="p-1 text-zinc-400 hover:text-rose-500 transition-colors"
                      title="Clear field"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="relative mt-2">
                <input
                  type="text"
                  value={value}
                  onChange={e => handleFieldChange(item.id, e.target.value)}
                  placeholder={item.placeholder}
                  className={`w-full px-3.5 py-2 text-xs rounded-xl border bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 ${
                    error
                      ? 'border-rose-300 dark:border-rose-800 focus:ring-rose-500'
                      : 'border-zinc-200 dark:border-zinc-800 focus:ring-emerald-500'
                  }`}
                />
              </div>

              {error ? (
                <div className="flex items-center gap-1.5 mt-2 text-[11px] font-medium text-rose-500">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{error}</span>
                </div>
              ) : (
                <p className="text-[11px] text-zinc-400 mt-1.5">{item.help}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
