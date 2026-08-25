import { IndianBoard, ClassLevel } from '../types';

export const INDIAN_STATES_AND_UTS: string[] = [
  'Maharashtra',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi (NCT)',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

export const BOARDS: { value: IndianBoard; label: string; note: string }[] = [
  { value: 'State Board', label: 'Maharashtra State Board (MSBSHSE)', note: 'State curriculum standards & evaluation pattern' },
  { value: 'CBSE', label: 'CBSE (NCERT Aligned)', note: 'National curriculum framework & NCERT textbooks' },
  { value: 'ICSE', label: 'ICSE (CISCE Board)', note: 'Council for the Indian School Certificate Examinations' },
];

export const CLASSES: { value: ClassLevel; label: string; isMVP: boolean }[] = [
  { value: '9', label: 'Class 9', isMVP: true },
  { value: '10', label: 'Class 10', isMVP: false },
  { value: '11', label: 'Class 11', isMVP: false },
  { value: '12', label: 'Class 12', isMVP: false },
];

export const SUPPORTED_LANGUAGES = [
  { code: 'en' as const, name: 'English', nativeName: 'English', available: true },
  { code: 'mr' as const, name: 'Marathi', nativeName: 'मराठी', available: true },
  { code: 'hi' as const, name: 'Hindi', nativeName: 'हिंदी', available: true },
];

export const UPCOMING_LANGUAGES = [
  { name: 'Tamil', nativeName: 'தமிழ்' },
  { name: 'Telugu', nativeName: 'తెలుగు' },
  { name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { name: 'Bengali', nativeName: 'বাংলা' },
];
