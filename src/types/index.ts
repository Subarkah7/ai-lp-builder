export interface LandingPageData {
  productName: string;
  shortDescription: string;
  advantages: string[];
  price: string;
  ctaLink: string;
  ctaText: string;
  theme?: string;
}

export interface FormErrors {
  productName?: string;
  shortDescription?: string;
  advantages?: string;
  price?: string;
  ctaLink?: string;
  ctaText?: string;
}