import { LandingPageData } from '../types';

const API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function generateLandingPage(data: LandingPageData): Promise<{ html: string; css: string }> {
  try {
    const HTML_DELIMITER_START = 'HTML_CODE_START';
    const HTML_DELIMITER_END = 'HTML_CODE_END';
    const CSS_DELIMITER_START = 'CSS_CODE_START';
    const CSS_DELIMITER_END = 'CSS_CODE_END';

    const prompt = `Buatkan landing page modern dan responsif dengan detail berikut:

Nama Produk: ${data.productName}
Deskripsi: ${data.shortDescription}
Keunggulan Produk:
${data.advantages.map(adv => `- ${adv}`).join('\n')}
Harga: ${data.price}
Tombol CTA: ${data.ctaText} (Link: ${data.ctaLink})
Tema: ${data.theme || 'professional'}

Mohon berikan kode HTML dan CSS untuk landing page yang profesional dan menarik yang menampilkan fitur-fitur tersebut secara efektif. Desain harus modern dan responsif untuk mobile. Berikan respons dalam format berikut:

${HTML_DELIMITER_START}
[Kode HTML Anda di sini]
${HTML_DELIMITER_END}

${CSS_DELIMITER_START}
[Kode CSS Anda di sini]
${CSS_DELIMITER_END}`;

    const response = await fetch(`${API_ENDPOINT}?key=${import.meta.env.VITE_GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Gagal generate konten');
    }

    const result = await response.json();
    const generatedText = result.candidates[0].content.parts[0].text;

    const htmlMatch = generatedText.match(new RegExp(`${HTML_DELIMITER_START}\n([\\s\\S]*?)\n${HTML_DELIMITER_END}`));
    const cssMatch = generatedText.match(new RegExp(`${CSS_DELIMITER_START}\n([\\s\\S]*?)\n${CSS_DELIMITER_END}`));

    return {
      html: htmlMatch?.[1] || '',
      css: cssMatch?.[1] || ''
    };
  } catch (error) {
    console.error('Error generating landing page:', error);
    throw new Error('Gagal membuat landing page');
  }
}