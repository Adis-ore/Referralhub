import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStaffAuth } from '@/contexts/StaffAuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  FaUser,
  FaMapMarkerAlt,
  FaBriefcase,
  FaEnvelope,
  FaCalendar,
  FaGift,
  FaChevronRight,
  FaQuestionCircle,
  FaFileAlt,
  FaCommentDots,
  FaSignOutAlt,
  FaShieldAlt
} from 'react-icons/fa';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: 'How do I earn referral points?',
    answer: 'You earn 500 points for each successful referral when the person you referred completes 120 working hours. Points are automatically credited to your account once verified.',
  },
  {
    question: 'How long does it take to get paid?',
    answer: 'Withdrawal requests are processed within 3-5 business days. Once approved, the amount will be deposited to your registered bank account.',
  },
  {
    question: 'What is the minimum withdrawal amount?',
    answer: 'The minimum withdrawal amount is $50, which equals 100 points (at a rate of 2 points = $1).',
  },
  {
    question: 'Why are my points showing as pending?',
    answer: 'Points remain pending until your referral completes the required working hours (usually 120 hours) and passes the probation verification. Once verified, they become available for withdrawal.',
  },
  {
    question: 'Can I refer someone from a different location?',
    answer: 'Yes! You can refer anyone to any of our locations. Points are earned regardless of which location your referral works at.',
  },
  {
    question: 'How are my working hours calculated?',
    answer: 'Hours are automatically synced from our rostering system. Only approved and verified shifts count toward the referral requirements.',
  },
];

const referralRules = [
  'Referral must be a new hire (not previously employed)',
  'Referred person must complete 120 hours of work',
  'Both parties must be active employees at time of payout',
  'Points expire after 12 months if not withdrawn',
  'Maximum 10 referrals per calendar year',
];

export default function StaffProfile() {
  const { user, logout } = useStaffAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/staff/login');
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Profile Card */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-staff-primary/10 text-staff-primary text-xl">
              {user?.name?.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold text-foreground">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.classification}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <FaEnvelope className="w-4 h-4 text-muted-foreground" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FaMapMarkerAlt className="w-4 h-4 text-muted-foreground" />
            <span>{user?.location}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FaCalendar className="w-4 h-4 text-muted-foreground" />
            <span>Joined {user?.joinedDate}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <FaGift className="w-4 h-4 text-muted-foreground" />
            <span>Referral Code: <strong className="font-mono">{user?.referralCode}</strong></span>
          </div>
        </div>
      </div>

      {/* Referral Rules */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <FaShieldAlt className="w-5 h-5 text-staff-primary" />
          <h3 className="font-semibold">Referral Program Rules</h3>
        </div>
        <div className="p-4">
          <ul className="space-y-3">
            {referralRules.map((rule, index) => (
              <li key={index} className="flex items-start gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-staff-primary/10 text-staff-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <span className="text-muted-foreground">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* FAQs */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <FaQuestionCircle className="w-5 h-5 text-staff-primary" />
          <h3 className="font-semibold">Frequently Asked Questions</h3>
        </div>
        <Accordion type="single" collapsible className="px-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-sm text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Help Links */}
      <div className="space-y-3">
        <button className="w-full bg-card rounded-xl p-4 border border-border flex items-center justify-between hover:border-muted-foreground/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
              <FaCommentDots className="w-5 h-5 text-info" />
            </div>
            <div className="text-left">
              <p className="font-medium">Contact Support</p>
              <p className="text-sm text-muted-foreground">Get help with your account</p>
            </div>
          </div>
          <FaChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>

        <button className="w-full bg-card rounded-xl p-4 border border-border flex items-center justify-between hover:border-muted-foreground/30 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
              <FaFileAlt className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-left">
              <p className="font-medium">Terms & Conditions</p>
              <p className="text-sm text-muted-foreground">Read full program terms</p>
            </div>
          </div>
          <FaChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Sign Out */}
      <Button
        variant="outline"
        className="w-full h-12 text-destructive hover:text-destructive border-destructive/30 hover:bg-destructive/5"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="w-5 h-5 mr-2" />
        Sign Out
      </Button>

      {/* Version */}
      <p className="text-center text-xs text-muted-foreground">
        ReferralHub Staff v1.0.0
      </p>
    </div>
  );
}
