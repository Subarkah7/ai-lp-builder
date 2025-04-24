import { LandingPageData } from '../types';
import { Theme } from '../data/themes';

export const generateHtmlCode = (data: LandingPageData, theme: Theme): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.productName}</title>
  <style>
    ${generateCssCode(theme)}
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1>${data.productName}</h1>
    </div>
  </header>
  
  <section class="hero">
    <div class="container">
      <p class="description">${data.shortDescription}</p>
      <p class="price">${data.price}</p>
    </div>
  </section>
  
  <section class="features">
    <div class="container">
      <h2>Key Features</h2>
      <div class="features-grid">
        ${data.advantages.map(advantage => `
          <div class="feature">
            <p>${advantage}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>
  
  <section class="cta">
    <div class="container">
      <h2>Ready to get started?</h2>
      <a href="${data.ctaLink}" class="button">${data.ctaText}</a>
    </div>
  </section>
  
  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} ${data.productName}. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>`;
};

export const generateCssCode = (theme: Theme): string => {
  return `
    /* Base styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: ${theme.bodyFont};
      color: ${theme.textColor};
      background-color: ${theme.backgroundColor};
      line-height: 1.6;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: ${theme.headingFont};
      margin-bottom: 1rem;
    }
    
    .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    
    /* Header */
    header {
      background-color: ${theme.primaryColor};
      color: white;
      padding: 2rem 0;
      text-align: center;
    }
    
    /* Hero section */
    .hero {
      padding: 4rem 0;
      text-align: center;
    }
    
    .hero .description {
      font-size: 1.25rem;
      max-width: 800px;
      margin: 0 auto 2rem;
    }
    
    .hero .price {
      font-size: 2rem;
      font-weight: bold;
      color: ${theme.primaryColor};
    }
    
    /* Features section */
    .features {
      background-color: #f8f9fa;
      padding: 4rem 0;
      text-align: center;
    }
    
    .features h2 {
      margin-bottom: 2rem;
      color: ${theme.secondaryColor};
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.5rem;
      max-width: 800px;
      margin: 0 auto;
    }
    
    @media (min-width: 768px) {
      .features-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      }
    }
    
    .feature {
      background-color: white;
      padding: 1.5rem;
      border-radius: ${theme.borderRadius};
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease;
    }
    
    .feature:hover {
      transform: translateY(-5px);
    }
    
    /* CTA section */
    .cta {
      padding: 5rem 0;
      text-align: center;
    }
    
    .cta h2 {
      margin-bottom: 2rem;
      color: ${theme.secondaryColor};
    }
    
    .button {
      display: inline-block;
      background-color: ${theme.primaryColor};
      color: white;
      padding: 0.875rem 2rem;
      border-radius: ${theme.borderRadius};
      text-decoration: none;
      font-weight: 600;
      transition: background-color 0.3s ease, transform 0.3s ease;
    }
    
    .button:hover {
      background-color: ${theme.secondaryColor};
      transform: translateY(-2px);
    }
    
    /* Footer */
    footer {
      background-color: #f1f1f1;
      padding: 2rem 0;
      text-align: center;
      font-size: 0.875rem;
      color: #666;
    }
    
    /* Responsive adjustments */
    @media (max-width: 768px) {
      .hero {
        padding: 3rem 0;
      }
      
      .hero .description {
        font-size: 1.1rem;
      }
      
      .features, .cta {
        padding: 3rem 0;
      }
    }
  `;
};