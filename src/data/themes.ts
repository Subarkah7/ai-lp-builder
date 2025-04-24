export interface Theme {
  id: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  buttonStyle: string;
  borderRadius: string;
}

export const themes: Theme[] = [
  {
    id: 'modern',
    name: 'Modern',
    primaryColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    accentColor: '#F59E0B',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    headingFont: 'sans-serif',
    bodyFont: 'sans-serif',
    buttonStyle: 'rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 font-medium transition duration-300',
    borderRadius: 'rounded-lg'
  },
  {
    id: 'minimal',
    name: 'Minimal',
    primaryColor: '#000000',
    secondaryColor: '#333333',
    accentColor: '#FF5A5F',
    backgroundColor: '#FFFFFF',
    textColor: '#333333',
    headingFont: 'sans-serif',
    bodyFont: 'sans-serif',
    buttonStyle: 'rounded-none border-2 border-black bg-black hover:bg-white hover:text-black text-white px-6 py-3 font-medium transition duration-300',
    borderRadius: 'rounded-none'
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    primaryColor: '#8B5CF6',
    secondaryColor: '#6D28D9',
    accentColor: '#10B981',
    backgroundColor: '#F5F3FF',
    textColor: '#1F2937',
    headingFont: 'sans-serif',
    bodyFont: 'sans-serif',
    buttonStyle: 'rounded-full bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 font-medium transition duration-300',
    borderRadius: 'rounded-2xl'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    primaryColor: '#0F172A',
    secondaryColor: '#334155',
    accentColor: '#0EA5E9',
    backgroundColor: '#FFFFFF',
    textColor: '#334155',
    headingFont: 'serif',
    bodyFont: 'sans-serif',
    buttonStyle: 'rounded-md bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 font-medium transition duration-300',
    borderRadius: 'rounded-md'
  }
];