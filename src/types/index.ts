export interface LandingPageData {
  productName: string;
  shortDescription: string;
  advantages: string[];
  price: string;
  ctaLink: string;
  ctaText: string;
  theme?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

export interface FormErrors {
  productName?: string;
  shortDescription?: string;
  advantages?: string;
  price?: string;
  ctaLink?: string;
  ctaText?: string;
}