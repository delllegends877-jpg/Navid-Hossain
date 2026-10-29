import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Globe, 
  Search, 
  Copy, 
  Check, 
  ShieldAlert, 
  ExternalLink,
  Code2,
  FileCode,
  KeyRound,
  Save,
  CheckCircle2,
  ArrowRight,
  Eye,
  Download
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { generateSitemapXml } from '../utils/sitemapGenerator';

export const HostingGuideModal: React.FC = () => {
  const { language, t } = useLanguage();
  const { settings, updateSettings, isHostingGuideOpen, setIsHostingGuideOpen } = useSettings();
  
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [verificationInput, setVerificationInput] = useState(settings.googleSiteVerification || '');
  const [tokenSaved, setTokenSaved] = useState(false);
  const [showXmlPreview, setShowXmlPreview] = useState(false);

  if (!isHostingGuideOpen) return null;

  // Determine current active public origin
  const currentPublicUrl = typeof window !== 'undefined' && window.location.origin && window.location.origin !== 'null'
    ? window.location.origin
    : 'https://ais-pre-nofix7be63aog2qyhaahpo-728128489142.asia-east1.run.app';

  const sitemapUrl = `${currentPublicUrl}/sitemap.xml`;
  const robotsUrl = `${currentPublicUrl}/robots.txt`;

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSaveToken = (e: React.FormEvent) => {
    e.preventDefault();
    // Clean token if user pasted whole meta tag
    let token = verificationInput.trim();
    if (token.includes('content="')) {
      const match = token.match(/content=["']([^"']+)["']/);
      if (match && match[1]) {
        token = match[1];
      }
    }
    updateSettings({ googleSiteVerification: token });
    
    // Immediately update DOM tag if present
    const tag = document.getElementById('google-site-verification-tag');
    if (tag) {
      tag.setAttribute('content', token);
    }
    
    setTokenSaved(true);
    setTimeout(() => setTokenSaved(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-amber-200 animate-in fade-in zoom-in duration-200 my-8">
        
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-stone-950 via-amber-950 to-stone-900 text-white relative">
          <button
            onClick={() => setIsHostingGuideOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30 mb-2">
            <Search className="w-3.5 h-3.5 text-blue-400" />
            <span>গুগল সার্চ কনসোল ও ইনডেক্সিং গাইড (Google Indexing Hub)</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black">
            গুগলে আপনার ওয়েবসাইট ইনডেক্স করার সঠিক নিয়ম
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            Google Search Console এ সাইট যুক্ত করা, সাইটম্যাপ সাবমিট এবং লাইভ সার্চে দেখানোর সহজ ৪ ধাপ
          </p>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 space-y-6 max-h-[72vh] overflow-y-auto text-xs text-stone-700">
          
          {/* Important Clarity Note on ai.studio link vs Public Website URL */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-300 text-amber-950 space-y-2">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-sm text-stone-900">
                  গুরুত্বপূর্ণ বিষয়: কোন লিঙ্কটি গুগলে ইনডেক্স করবেন?
                </h4>
                <p className="text-xs text-stone-700 leading-relaxed mt-1">
                  <code className="bg-amber-200/70 text-amber-950 px-1 py-0.5 rounded font-mono text-[11px]">https://ai.studio/apps/...</code> লিঙ্কটি হলো আপনার ব্যক্তিগত <strong>AI Studio ডেভেলপার এডিটর ড্যাশবোর্ড</strong>। গুগলের সার্চ বট কোনো লগইন ছাড়া এডিটরে ঢুকতে পারে না।
                </p>
                <p className="text-xs text-stone-700 leading-relaxed mt-1 font-semibold">
                  গুগলে ইনডেক্স করতে হবে আপনার ওয়েবসাইটের <strong>আসল পাবলিক লাইভ URL</strong> (নিচে দেওয়া হয়েছে)।
                </p>
              </div>
            </div>
          </div>

          {/* Quick Copy Box: Public URLs for Search Console */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
            <div className="font-extrabold text-stone-900 text-xs flex items-center justify-between">
              <span>গুগল সার্চ কনসোলে দেওয়ার জন্য আপনার লিঙ্কসমূহ:</span>
              <span className="text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                পাবলিক ও লাইভ
              </span>
            </div>

            {/* Public URL */}
            <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-stone-200 gap-2">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-stone-400 font-bold block uppercase">১. পাবলিক ওয়েবসাইট লিঙ্ক (Website URL)</span>
                <span className="font-mono text-stone-800 text-[11px] truncate block font-bold">
                  {currentPublicUrl}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(currentPublicUrl, 'publicUrl')}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
              >
                {copiedKey === 'publicUrl' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'publicUrl' ? 'কপি হয়েছে' : 'কপি করুন'}</span>
              </button>
            </div>

            {/* Sitemap URL */}
            <div className="bg-white p-2.5 rounded-xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-stone-400 font-bold block uppercase">২. ডাইনামিক সাইটম্যাপ লিঙ্ক (Dynamic Sitemap URL)</span>
                  <span className="font-mono text-stone-800 text-[11px] truncate block font-bold">
                    {sitemapUrl}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setShowXmlPreview(!showXmlPreview)}
                    className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    title="View live XML"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{showXmlPreview ? 'লুকান' : 'XML প্রিভিউ'}</span>
                  </button>

                  <button
                    onClick={() => {
                      const xml = generateSitemapXml(currentPublicUrl);
                      const blob = new Blob([xml], { type: 'application/xml' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'sitemap.xml';
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="px-2.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                    title="Download sitemap.xml file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ডাউনলোড</span>
                  </button>

                  <button
                    onClick={() => copyToClipboard(sitemapUrl, 'sitemapUrl')}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-black text-white rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedKey === 'sitemapUrl' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'sitemapUrl' ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                  </button>
                </div>
              </div>

              {/* Collapsible live XML viewer */}
              {showXmlPreview && (
                <div className="mt-2 p-3 bg-stone-900 rounded-xl text-stone-200 font-mono text-[10px] overflow-x-auto max-h-48 border border-stone-700">
                  <div className="flex justify-between items-center pb-1 mb-1 border-b border-stone-800 text-stone-400">
                    <span>লাইভ জেনারেট করা sitemap.xml</span>
                    <button
                      onClick={() => copyToClipboard(generateSitemapXml(currentPublicUrl), 'fullXml')}
                      className="text-amber-400 hover:text-amber-300 font-bold"
                    >
                      {copiedKey === 'fullXml' ? 'XML কপি হয়েছে!' : 'সম্পূর্ণ XML কপি করুন'}
                    </button>
                  </div>
                  <pre>{generateSitemapXml(currentPublicUrl)}</pre>
                </div>
              )}
            </div>

            {/* Robots.txt URL */}
            <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-stone-200 gap-2">
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-stone-400 font-bold block uppercase">৩. রোবটস ফাইল লিঙ্ক (Robots.txt URL)</span>
                <span className="font-mono text-stone-800 text-[11px] truncate block">
                  {robotsUrl}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(robotsUrl, 'robotsUrl')}
                className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-lg font-bold text-xs flex items-center gap-1 shrink-0 cursor-pointer transition-colors"
              >
                {copiedKey === 'robotsUrl' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'robotsUrl' ? 'কপি হয়েছে' : 'কপি করুন'}</span>
              </button>
            </div>
          </div>

          {/* Quick Step-by-Step Walkthrough */}
          <div className="space-y-3">
            <h3 className="font-black text-sm text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>গুগল সার্চে ইনডেক্স করার ৪টি সহজ ধাপ:</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl">
                <div className="font-bold text-blue-950 flex items-center justify-between">
                  <span>ধাপ ১: Google Search Console খুলুন</span>
                  <a
                    href="https://search.google.com/search-console"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100"
                  >
                    <span>সার্চ কনসোল খুলুন</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-stone-600 mt-1">
                  সার্চ কনসোলে লগইন করে <strong>"Add Property"</strong> তে ক্লিক করুন এবং <strong>"URL prefix"</strong> অপশনে আপনার উপরের পাবলিক ওয়েবসাইট লিঙ্কটি পেস্ট করুন।
                </p>
              </div>

              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                <div className="font-bold text-stone-900">
                  ধাপ ২: HTML Tag দিয়ে ওনারশিপ ভেরিফাই করুন
                </div>
                <p className="text-stone-600 mt-1 mb-2">
                  ভেরিফিকেশন অপশন থেকে <strong>"HTML tag"</strong> সিলেক্ট করুন। গুগল আপনাকে একটি কোড দিবে (যেমন: <code className="text-amber-800 font-mono">google-site-verification=...</code>)। সেই কোডটি নিচে পেস্ট করে "Save Verification Token" বাটনে চাপুন:
                </p>

                {/* Form to paste verification token directly */}
                <form onSubmit={handleSaveToken} className="space-y-2 bg-white p-2.5 rounded-lg border border-stone-300">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={verificationInput}
                      onChange={(e) => setVerificationInput(e.target.value)}
                      placeholder='গুগলের দেওয়া কোডটি এখানে পেস্ট করুন...'
                      className="flex-1 text-xs p-2 border border-stone-300 rounded-lg focus:border-amber-500 outline-hidden font-mono"
                    />
                    <button
                      type="submit"
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>সেভ করুন</span>
                    </button>
                  </div>
                  {tokenSaved && (
                    <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      <span>ভেরিফিকেশন ট্যাগ সেভ হয়েছে! এবার সার্চ কনসোলে গিয়ে Verify বাটনে চাপুন।</span>
                    </span>
                  )}
                </form>
              </div>

              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                <div className="font-bold text-stone-900">
                  ধাপ ৩: সাইটম্যাপ সাবমিট (Sitemaps Submission)
                </div>
                <p className="text-stone-600 mt-1">
                  ভেরিফিকেশন সম্পন্ন হলে সার্চ কনসোলের বাম পাশের মেন্যু থেকে <strong>"Sitemaps"</strong> অপশনে যান। সেখানে <strong>Add a new sitemap</strong> বক্সে লিখুন: <code className="bg-amber-100 text-amber-900 px-1 py-0.5 rounded font-mono font-bold">sitemap.xml</code> এবং <strong>Submit</strong> বাটনে ক্লিক করুন।
                </p>
              </div>

              <div className="p-3 bg-stone-50 border border-stone-200 rounded-xl">
                <div className="font-bold text-stone-900">
                  ধাপ ৪: ইনস্ট্যান্ট ইনডেক্সিং রিকোয়েস্ট (URL Inspection)
                </div>
                <p className="text-stone-600 mt-1">
                  সার্চ কনসোলের সার্চ বারে আপনার ওয়েবসাইট URL পেস্ট করে Enter চাপুন। এরপর <strong>"Request Indexing"</strong> বাটনে ক্লিক করুন। গুগল বট ২৪ থেকে ৪৮ ঘণ্টার মধ্যে আপনার পেজগুলো ক্রল করে গুগল সার্চের ফলাফলে যুক্ত করে নিবে!
                </p>
              </div>
            </div>
          </div>

          {/* Structured Data Test Link */}
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between gap-3">
            <div>
              <div className="font-extrabold text-stone-900 text-xs">
                গুগল রিচ রেজাল্ট ও স্কিমা টেস্ট করুন
              </div>
              <div className="text-[11px] text-stone-600 mt-0.5">
                আপনার ওয়েবসাইটে ভ্যালিড Restaurant ও FAQPage Schema যোগ করা আছে।
              </div>
            </div>
            <a
              href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(currentPublicUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center gap-1 shrink-0"
            >
              <span>স্কিমা টেস্ট</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Step 5: Free Permanent Hosting Note */}
          <div className="pt-2 border-t border-stone-200 space-y-2">
            <h4 className="font-extrabold text-stone-900 text-xs">
              চাইলে সম্পূর্ণ ফ্রি ফায়ারবেস হোস্টিংয়েও নিজস্ব ডোমেইন দিতে পারেন:
            </h4>
            <div className="p-3 bg-stone-900 text-stone-200 rounded-xl font-mono text-[11px] space-y-1">
              <div><span className="text-emerald-400">$</span> npm run build</div>
              <div><span className="text-emerald-400">$</span> firebase init hosting (public directory: dist)</div>
              <div><span className="text-emerald-400">$</span> firebase deploy --only hosting</div>
            </div>
          </div>

        </div>

        {/* Bottom Button */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={() => setIsHostingGuideOpen(false)}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold rounded-xl text-xs cursor-pointer transition-colors shadow-xs"
          >
            {t.hostingModal.close}
          </button>
        </div>

      </div>
    </div>
  );
};
