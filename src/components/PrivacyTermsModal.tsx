import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';

export const PrivacyTermsModal: React.FC = () => {
  const { language } = useLanguage();
  const { 
    isPrivacyOpen, 
    setIsPrivacyOpen, 
    isTermsOpen, 
    setIsTermsOpen, 
    settings 
  } = useSettings();

  const isOpen = isPrivacyOpen || isTermsOpen;
  const isPrivacy = isPrivacyOpen;

  if (!isOpen) return null;

  const handleClose = () => {
    setIsPrivacyOpen(false);
    setIsTermsOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-amber-200 animate-in fade-in zoom-in duration-200 my-8">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-900 to-amber-950 text-white relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold mb-1">
            {isPrivacy ? <ShieldCheck className="w-4 h-4 text-emerald-400" /> : <FileText className="w-4 h-4 text-amber-400" />}
            <span>{settings.nameBn} • আইনি ও গ্রাহক নীতিমালা</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black">
            {isPrivacy ? 'প্রাইভেসি ও তথ্য সুরক্ষা নীতিমালা' : 'শর্তাবলী ও খাবারের অর্ডার সংক্রান্ত নিয়মাবলী (Terms of Service)'}
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[68vh] overflow-y-auto text-xs text-stone-700 leading-relaxed">
          {isPrivacy ? (
            <>
              <h3 className="font-extrabold text-sm text-stone-900">১. ব্যক্তিগত তথ্য সংগ্রহ ও ব্যবহার</h3>
              <p>
                “ফুচকা হাউজ” গ্রাহকের গোপনীয়তাকে সর্বোচ্চ সম্মান প্রদান করে। খাবার ডেলিভারি সম্পন্ন করার জন্য আমরা শুধুমাত্র গ্রাহকের নাম, মোবাইল নম্বর এবং ডেলিভারি ঠিকানা সংগ্রহ করি যা সরাসরি হোয়াটসঅ্যাপ মেসেজের মাধ্যমে আমাদের কিচেনে পৌঁছায়।
              </p>

              <h3 className="font-extrabold text-sm text-stone-900">২. কোনো থার্ড পার্টিকে তথ্য না দেওয়া</h3>
              <p>
                আমরা গ্রাহকের কোনো মোবাইল নম্বর বা ব্যক্তিগত তথ্য কোনো প্রকার মার্কেটিং এজেন্সি বা তৃতীয় পক্ষের নিকট বিক্রি বা শেয়ার করি না।
              </p>

              <h3 className="font-extrabold text-sm text-stone-900">৩. লোকাল স্টোরেজ (Local Storage) কুকিজ</h3>
              <p>
                গ্রাহকের কার্টে রাখা খাবারের তালিকা, পছন্দের ভাষা (বাংলা বা ইংরেজি) এবং ব্রাউজিং সুবিধার্থে ডিভাইসের লোকাল স্টোরেজ ব্যবহার করা হয়। এটি আপনার ডিভাইসের বাইরে প্রেরিত হয় না।
              </p>

              <h3 className="font-extrabold text-sm text-stone-900">৪. অনলাইন পেমেন্ট নিরাপত্তা</h3>
              <p>
                বিকাশ বা নগদ পেমেন্ট সরাসরি গ্রাহকের নিজস্ব বিকাশ/নগদ অ্যাপ থেকে আমাদের অফিসিয়াল নম্বরে প্রেরিত হয়। ওয়েবসাইটে কোনো কার্ড নম্বর বা পিন সংরক্ষিত হয় না।
              </p>
            </>
          ) : (
            <>
              <h3 className="font-extrabold text-sm text-stone-900">১. খাবারের ফ্রেশনেস ও মচমচে থাকার নিশ্চয়তা</h3>
              <p>
                ফুচকার সর্বোচ্চ স্বাদ পেতে আমরা পুরি এবং তেঁতুলের টক আলাদা বিশেষ এয়ারটাইট ও লিক-প্রুফ ফুড-গ্রেড প্যাকেটে ডেলিভারি করে থাকি, যাতে আপনার কাছে পৌঁছানো পর্যন্ত পুরি একদম মচমচে থাকে।
              </p>

              <h3 className="font-extrabold text-sm text-stone-900">২. অর্ডার কনফার্মেশন ও ডেলিভারি সময়</h3>
              <p>
                হোয়াটসঅ্যাপে মেসেজ পাঠানোর পর আমাদের প্রতিনিধি ৫ থেকে ১০ মিনিটের মধ্যে কল বা টেক্সট করে অর্ডার কনফার্ম করবেন। সাধারণত ধানমন্ডি ও নিকটবর্তী এলাকায় ৩০-৪০ মিনিট এবং দূরবর্তী এলাকায় ৪৫-৬০ মিনিটের মধ্যে খাবার পৌঁছে দেওয়া হয়।
              </p>

              <h3 className="font-extrabold text-sm text-stone-900">৩. মূল্য ও ডেলিভারি চার্জ</h3>
              <p>
                মেন্যুতে উল্লেখিত সকল মূল্য বাংলাদেশি টাকায় (BDT ৳)। নির্ধারিত ডেলিভারি ফি অনুযায়ী ধানমন্ডিতে ৳৫০ এবং ঢাকার অন্যান্য এলাকায় ৳৮০ ধার্য করা হয়। ৳৭০০ বা তদূর্ধ্ব অর্ডারে ডেলিভারি ফি সম্পূর্ণ ফ্রি।
              </p>

              <h3 className="font-extrabold text-sm text-stone-900">৪. অর্ডার বাতিল বা পরিবর্তন</h3>
              <p>
                অর্ডার নিশ্চিত করার সর্বোচ্চ ৫ মিনিটের মধ্যে পরিবর্তন বা বাতিল করা যাবে। কিচেনে খাবার প্রস্তুত হয়ে রাইডার রওয়ানা হয়ে যাওয়ার পর অর্ডার বাতিল গ্রহণযোগ্য নয়।
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition-colors cursor-pointer"
          >
            বুঝেছি ও একমত
          </button>
        </div>

      </div>
    </div>
  );
};
