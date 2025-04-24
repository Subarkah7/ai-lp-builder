import { LandingPageData } from '../types';

const API_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

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

Warna:
- Utama: ${data.colors.primary}
- Sekunder: ${data.colors.secondary}
- Aksen: ${data.colors.accent}
- Background: ${data.colors.background}
- Teks: ${data.colors.text}

Mohon berikan kode HTML dan CSS untuk landing page yang profesional dan menarik yang menampilkan fitur-fitur tersebut secara efektif. Desain harus modern dan responsif untuk mobile. Gunakan warna-warna yang telah ditentukan. Berikan respons dalam format berikut:

${HTML_DELIMITER_START}
[Kode HTML Anda di sini]
${HTML_DELIMITER_END}

${CSS_DELIMITER_START}
[Kode CSS Anda di sini]
${CSS_DELIMITER_END}`;

    // Daftar model yang akan dicoba secara berurutan
    const models = [
      'google/gemini-2.5-pro-preview-03-25',
      'anthropic/claude-3-haiku',    // Mulai dengan yang berhasil
      'anthropic/claude-3-sonnet',  
      'openai/gpt-3.5-turbo',        // Model OpenAI sebagai alternatif
      'google/gemini-1.5-pro'        // Coba model Google sebagai alternatif
    ];

    let generatedText = '';

    // Coba setiap model secara berurutan hingga berhasil
    for (const model of models) {
      try {
        console.log(`Mencoba generate dengan model: ${model}`);
        
        const response = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'AI Landing Page Builder'
          },
          body: JSON.stringify({
            model: model,
            messages: [{
              role: 'user',
              content: prompt
            }]
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Get raw response text
        const responseText = await response.text();
        console.log(`Raw API Response for ${model}:`, responseText);
        
        // Parse the response
        const responseData = JSON.parse(responseText);
        
        // Extract content based on model provider
        if (model.startsWith('anthropic/')) {
          // Anthropic format
          if (responseData.choices && responseData.choices[0]?.message?.content) {
            generatedText = responseData.choices[0].message.content;
          } else {
            throw new Error('Unexpected Anthropic response format');
          }
        } else if (model.startsWith('openai/')) {
          // OpenAI format
          if (responseData.choices && responseData.choices[0]?.message?.content) {
            generatedText = responseData.choices[0].message.content;
          } else {
            throw new Error('Unexpected OpenAI response format');
          }
        } else if (model.startsWith('google/')) {
          // Google format (might be different)
          if (responseData.candidates && responseData.candidates[0]?.content?.parts) {
            // Adjust based on actual Gemini response format via OpenRouter
            generatedText = responseData.candidates[0].content.parts[0].text;
          } else {
            throw new Error('Unexpected Google response format');
          }
        } else {
          // Generic fallback attempt
          if (responseData.choices && responseData.choices[0]?.message?.content) {
            generatedText = responseData.choices[0].message.content;
          } else if (responseData.candidates) {
            generatedText = responseData.candidates[0]?.content?.parts?.[0]?.text || '';
          } else if (responseData.output) {
            generatedText = responseData.output;
          } else {
            throw new Error('Unknown model response format');
          }
        }

        console.log(`Berhasil dengan model: ${model}`);
        console.log('Generated content preview:', generatedText.substring(0, 100) + '...');
        break; // Keluar dari loop jika berhasil
      } catch (e) {
        console.warn(`Gagal dengan model ${model}:`, e);
        // Lanjutkan ke model berikutnya
      }
    }

    if (!generatedText) {
      throw new Error('Semua model gagal digunakan');
    }

    const htmlMatch = generatedText.match(new RegExp(`${HTML_DELIMITER_START}\n([\\s\\S]*?)\n${HTML_DELIMITER_END}`));
    const cssMatch = generatedText.match(new RegExp(`${CSS_DELIMITER_START}\n([\\s\\S]*?)\n${CSS_DELIMITER_END}`));

    if (!htmlMatch || !cssMatch) {
      console.error('Extracted content does not match expected format:', generatedText);
      throw new Error('Tidak dapat mengekstrak HTML atau CSS dari respons');
    }

    return {
      html: htmlMatch[1] || '',
      css: cssMatch[1] || ''
    };
  } catch (error) {
    console.error('Error generating landing page:', error);
    throw new Error(`Gagal membuat landing page!`);
  }
}