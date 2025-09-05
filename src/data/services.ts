export interface Service {
  id: string;
  title: string;
  institution: string;
  location: string;
  category: string;
  upvotes: number;
  experienceCount: number;
  averageTime: string;
  lastUpdated: string;
  description: string;
  experiences: Experience[];
}

export interface Experience {
  id: string;
  serviceId: string;
  author: string;
  date: string;
  upvotes: number;
  requiredDocuments: string[];
  fees: string;
  process: string;
  tips: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const sampleServices: Service[] = [
  {
    id: '1',
    title: 'Passport Renewal',
    institution: 'Ministry of Interior - Passport Office',
    location: 'Nasr City, Cairo',
    category: 'Government',
    upvotes: 45,
    experienceCount: 12,
    averageTime: '2-3 hours',
    lastUpdated: '2024-01-15',
    description: 'Renewing your Egyptian passport at the main passport office',
    experiences: [
      {
        id: '1-1',
        serviceId: '1',
        author: 'Ahmed M.',
        date: '2024-01-15',
        upvotes: 23,
        requiredDocuments: [
          'Original old passport',
          'Copy of ID card',
          '4 personal photos (white background)',
          'Military service certificate (for males)',
          'Birth certificate copy'
        ],
        fees: '365 EGP',
        process: 'Arrive early (7 AM recommended), take a number, submit documents at window 3, pay fees at window 5, collect after 3 working days.',
        tips: 'Bring exact change and make copies beforehand. The photocopy machine there is often broken.',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: '2',
    title: 'University Degree Authentication',
    institution: 'Ministry of Foreign Affairs',
    location: 'Tahrir Square, Cairo',
    category: 'Education',
    upvotes: 67,
    experienceCount: 18,
    averageTime: '1-2 days',
    lastUpdated: '2024-01-18',
    description: 'Authenticating university degrees for international use',
    experiences: [
      {
        id: '2-1',
        serviceId: '2',
        author: 'Mona S.',
        date: '2024-01-18',
        upvotes: 34,
        requiredDocuments: [
          'Original degree certificate',
          'University transcript',
          'Copy of national ID',
          '2 personal photos'
        ],
        fees: '120 EGP per document',
        process: 'Go to building 2, floor 3. Submit documents between 9 AM - 1 PM. Collection is the next day after 2 PM.',
        tips: 'Ask for Madam Afaf - she handles degree authentication and is very helpful. Avoid Thursdays and Fridays.',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: '3',
    title: 'Birth Certificate Issuance',
    institution: 'Civil Registry Office',
    location: 'Various locations',
    category: 'Government',
    upvotes: 89,
    experienceCount: 25,
    averageTime: '30 minutes',
    lastUpdated: '2024-01-20',
    description: 'Obtaining official birth certificates from civil registry',
    experiences: [
      {
        id: '3-1',
        serviceId: '3',
        author: 'Omar K.',
        date: '2024-01-20',
        upvotes: 45,
        requiredDocuments: [
          'National ID of applicant',
          'Hospital birth certificate (if available)',
          'Parent\'s marriage certificate',
          'Witness statements (if late registration)'
        ],
        fees: '15 EGP',
        process: 'Submit application at your district\'s civil registry office. Processing is usually immediate for normal cases.',
        tips: 'Go to your place of birth\'s district office. If documents are complete, it\'s very quick.',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: '4',
    title: 'Driver\'s License Renewal',
    institution: 'Traffic Department',
    location: 'Heliopolis, Cairo',
    category: 'Government',
    upvotes: 34,
    experienceCount: 8,
    averageTime: '3-4 hours',
    lastUpdated: '2024-01-12',
    description: 'Renewing expired driver\'s license',
    experiences: [
      {
        id: '4-1',
        serviceId: '4',
        author: 'Yasmin A.',
        date: '2024-01-12',
        upvotes: 18,
        requiredDocuments: [
          'Original expired license',
          'Copy of national ID',
          'Medical examination certificate',
          '2 personal photos',
          'Traffic violations clearance'
        ],
        fees: '250 EGP + medical exam fees',
        process: 'Get medical exam first (building A), then submit documents (building B), pay fees, and collect new license.',
        tips: 'Check for traffic violations online first and pay them to avoid delays. Bring a book - the wait can be long.',
        difficulty: 'Medium'
      }
    ]
  }
];

export const categories = [
  { name: 'All', count: sampleServices.length },
  { name: 'Government', count: sampleServices.filter(s => s.category === 'Government').length },
  { name: 'Education', count: sampleServices.filter(s => s.category === 'Education').length },
  { name: 'Healthcare', count: sampleServices.filter(s => s.category === 'Healthcare').length },
  { name: 'Legal', count: sampleServices.filter(s => s.category === 'Legal').length },
];