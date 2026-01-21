import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // Hero Section
    'hero.title': 'دليل',
    'hero.subtitle': 'دليلك لكل خدمة',
    'hero.description': 'لا تضيع وقتك في البيروقراطية بعد الآن. اعثر على تجارب حقيقية من أشخاص مروا بنفس التجربة، يشاركها المجتمع لمساعدتك على التنقل في أي خدمة أو معاملة بثقة.',
    'hero.browseServices': 'تصفح الخدمات',
    'hero.shareExperience': 'شارك تجربتك',
    
    // Stats
    'stats.sharedExperiences': 'تجربة مشتركة',
    'stats.verifiedTips': 'نصيحة موثقة',
    'stats.helpingOthers': 'يساعدون الآخرين',
    
    // Categories
    'categories.title': 'تصفح حسب الفئة',
    'category.all': 'الكل',
    'category.government': 'حكومي',
    'category.education': 'تعليم',
    'category.healthcare': 'صحة',
    'category.legal': 'قانوني',
    'category.banking': 'بنوك',
    'category.other': 'أخرى',
    
    // Services
    'services.title': 'الخدمات الأخيرة',
    'services.averageTime': 'الوقت المتوسط',
    'services.experiences': 'تجارب',
    'services.viewDetails': 'عرض التفاصيل',
    'services.noResults': 'لم يتم العثور على خدمات مطابقة لبحثك.',
    
    // Search
    'search.placeholder': 'ابحث عن الخدمات، المؤسسات، أو المواقع...',
    
    // Share Experience Page
    'share.title': 'شارك تجربتك',
    'share.subtitle': 'ساعد الآخرين بمشاركة تجربتك مع هذه الخدمة أو المعاملة.',
    'share.backToHome': 'العودة للرئيسية',
    'share.serviceInfo': 'معلومات الخدمة',
    'share.serviceTitle': 'عنوان الخدمة',
    'share.serviceTitlePlaceholder': 'مثال: تجديد جواز السفر',
    'share.institution': 'المؤسسة/الجهة',
    'share.institutionPlaceholder': 'مثال: وزارة الداخلية - مصلحة الجوازات',
    'share.location': 'الموقع',
    'share.locationPlaceholder': 'مثال: مدينة نصر، القاهرة',
    'share.category': 'الفئة',
    'share.selectCategory': 'اختر الفئة',
    'share.averageTime': 'الوقت المتوسط',
    'share.averageTimePlaceholder': 'مثال: ٢-٣ ساعات',
    'share.difficulty': 'الصعوبة',
    'share.selectDifficulty': 'اختر الصعوبة',
    'share.easy': 'سهل',
    'share.medium': 'متوسط',
    'share.hard': 'صعب',
    'share.description': 'الوصف',
    'share.descriptionPlaceholder': 'وصف مختصر للخدمة...',
    'share.fees': 'الرسوم',
    'share.feesPlaceholder': 'مثال: ٣٦٥ جنيه',
    'share.requiredDocuments': 'المستندات المطلوبة',
    'share.addDocument': 'أضف مستند مطلوب...',
    'share.process': 'الخطوات/العملية',
    'share.processPlaceholder': 'صف الخطوات التي اتبعتها...',
    'share.tips': 'نصائح وإرشادات',
    'share.tipsPlaceholder': 'أي نصائح مفيدة للآخرين...',
    'share.submit': 'شارك التجربة',
    'share.cancel': 'إلغاء',
    'share.successTitle': 'تم مشاركة التجربة بنجاح!',
    'share.successDescription': 'شكراً لمساهمتك في المجتمع. تجربتك ستساعد الآخرين.',
    'share.errorTitle': 'معلومات ناقصة',
    'share.errorDescription': 'يرجى ملء الحقول المطلوبة (عنوان الخدمة، المؤسسة، والفئة).',
    
    // Service Details Page
    'details.backToServices': 'العودة للخدمات',
    'details.overview': 'نظرة عامة',
    'details.location': 'الموقع',
    'details.averageTime': 'الوقت المتوسط',
    'details.lastUpdated': 'آخر تحديث',
    'details.experiences': 'التجارب',
    'details.requiredDocuments': 'المستندات المطلوبة',
    'details.fees': 'الرسوم',
    'details.process': 'العملية',
    'details.tips': 'النصائح',
    'details.difficulty': 'الصعوبة',
    'details.helpful': 'مفيد',
    'details.shareExperience': 'شارك تجربتك',
    'details.noExperiences': 'لا توجد تجارب بعد. كن أول من يشارك!',
    
    // Footer
    'footer.madeWith': 'صُنع بـ',
    'footer.forCommunity': 'للمجتمع',
    
    // Language
    'language.switch': 'English',
  },
  en: {
    // Hero Section
    'hero.title': 'Daleel',
    'hero.subtitle': 'Your Guide to Every Service',
    'hero.description': 'Never waste time on bureaucracy again. Find real experiences from people who\'ve been there, shared by the community to help you navigate any service or errand with confidence.',
    'hero.browseServices': 'Browse Services',
    'hero.shareExperience': 'Share Experience',
    
    // Stats
    'stats.sharedExperiences': 'Shared Experiences',
    'stats.verifiedTips': 'Verified Tips',
    'stats.helpingOthers': 'Helping Others',
    
    // Categories
    'categories.title': 'Browse by Category',
    'category.all': 'All',
    'category.government': 'Government',
    'category.education': 'Education',
    'category.healthcare': 'Healthcare',
    'category.legal': 'Legal',
    'category.banking': 'Banking',
    'category.other': 'Other',
    
    // Services
    'services.title': 'Recent Services',
    'services.averageTime': 'Average time',
    'services.experiences': 'experiences',
    'services.viewDetails': 'View Details',
    'services.noResults': 'No services found matching your search.',
    
    // Search
    'search.placeholder': 'Search for services, institutions, or locations...',
    
    // Share Experience Page
    'share.title': 'Share Your Experience',
    'share.subtitle': 'Help others by sharing your experience with this service or errand.',
    'share.backToHome': 'Back to Home',
    'share.serviceInfo': 'Service Information',
    'share.serviceTitle': 'Service Title',
    'share.serviceTitlePlaceholder': 'e.g., Passport Renewal',
    'share.institution': 'Institution/Authority',
    'share.institutionPlaceholder': 'e.g., Ministry of Interior - Passport Office',
    'share.location': 'Location',
    'share.locationPlaceholder': 'e.g., Nasr City, Cairo',
    'share.category': 'Category',
    'share.selectCategory': 'Select category',
    'share.averageTime': 'Average Time',
    'share.averageTimePlaceholder': 'e.g., 2-3 hours',
    'share.difficulty': 'Difficulty',
    'share.selectDifficulty': 'Select difficulty',
    'share.easy': 'Easy',
    'share.medium': 'Medium',
    'share.hard': 'Hard',
    'share.description': 'Description',
    'share.descriptionPlaceholder': 'Brief description of the service...',
    'share.fees': 'Fees',
    'share.feesPlaceholder': 'e.g., 365 EGP',
    'share.requiredDocuments': 'Required Documents',
    'share.addDocument': 'Add a required document...',
    'share.process': 'Process/Steps',
    'share.processPlaceholder': 'Describe the step-by-step process you followed...',
    'share.tips': 'Tips & Advice',
    'share.tipsPlaceholder': 'Any helpful tips or advice for others...',
    'share.submit': 'Share Experience',
    'share.cancel': 'Cancel',
    'share.successTitle': 'Experience Shared Successfully!',
    'share.successDescription': 'Thank you for contributing to the community. Your experience will help others.',
    'share.errorTitle': 'Missing Information',
    'share.errorDescription': 'Please fill in the required fields (Service Title, Institution, and Category).',
    
    // Service Details Page
    'details.backToServices': 'Back to Services',
    'details.overview': 'Overview',
    'details.location': 'Location',
    'details.averageTime': 'Average Time',
    'details.lastUpdated': 'Last Updated',
    'details.experiences': 'Experiences',
    'details.requiredDocuments': 'Required Documents',
    'details.fees': 'Fees',
    'details.process': 'Process',
    'details.tips': 'Tips',
    'details.difficulty': 'Difficulty',
    'details.helpful': 'Helpful',
    'details.shareExperience': 'Share Your Experience',
    'details.noExperiences': 'No experiences yet. Be the first to share!',
    
    // Footer
    'footer.madeWith': 'Made with',
    'footer.forCommunity': 'for the community',
    
    // Language
    'language.switch': 'عربي',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('ar');

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
