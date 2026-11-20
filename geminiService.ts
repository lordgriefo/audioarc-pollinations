/**
 * AudioArc Gemini Service (Client-Side Server Proxy)
 * All calls are executed via server-side endpoints on /api/gemini/*
 * Never imports @google/genai or exposes API keys in the browser bundle.
 */

export const Type = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  INTEGER: 'INTEGER',
  BOOLEAN: 'BOOLEAN',
  ARRAY: 'ARRAY',
  OBJECT: 'OBJECT',
} as const;

export interface GeminiResponse {
  text: string;
  candidates?: any[];
  usageMetadata?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
  };
}

export interface StreamChunk {
  text: string;
  usageMetadata?: any;
}

export interface GenerateImageResult {
  base64Data: string;
  mimeType: string;
  usageMetadata?: any;
}

/**
 * Map codenames and model aliases to valid Google AI Studio Generative Language API models
 */
export function mapToGoogleGenerativeModel(model: string): string {
  const clean = (model || '').replace(/^models\//, '').trim();
  if (!clean) return 'gemini-2.5-flash';
  if (clean.includes('hydrogen') || clean.includes('flash-lite') || clean === 'gemini-3.1-flash-lite') {
    return 'gemini-2.5-flash';
  }
  if (clean.includes('argon') || clean.includes('carbon') || clean.includes('pro')) {
    return 'gemini-1.5-pro';
  }
  if (clean.includes('gemini-2.5') || clean.includes('gemini-2.0') || clean.includes('gemini-1.5')) {
    return clean;
  }
  return 'gemini-2.5-flash';
}

/**
 * Generate text or structured content via server-side Gemini endpoint or direct Google API fallback
 */
export async function generateContentServer(params: {
  model: string;
  contents: any;
  config?: any;
}): Promise<GeminiResponse> {
  // Try server endpoint first if available
  try {
    const response = await fetch('/api/gemini/generate-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (response.ok) {
      return response.json();
    }
  } catch {}

  // Fallback to direct client-side Google API
  const clientKey = typeof window !== 'undefined' ? localStorage.getItem('audioarc_gemini_key') || '' : '';
  if (!clientKey) {
    throw new Error('Google Gemini API key missing. Please paste your key in Settings or connect via Pollinations.');
  }

  const cleanModel = mapToGoogleGenerativeModel(params.model);
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${cleanModel}:generateContent?key=${clientKey.trim()}`;

  let contentsPayload: any = [];
  if (typeof params.contents === 'string') {
    contentsPayload = [{ parts: [{ text: params.contents }] }];
  } else if (Array.isArray(params.contents)) {
    contentsPayload = params.contents;
  } else if (params.contents && params.contents.parts) {
    contentsPayload = [params.contents];
  } else {
    contentsPayload = [{ parts: [{ text: JSON.stringify(params.contents) }] }];
  }

  const bodyPayload: any = {
    contents: contentsPayload,
  };

  if (params.config?.responseMimeType) {
    bodyPayload.generationConfig = {
      responseMimeType: params.config.responseMimeType,
      ...(params.config.responseSchema ? { responseSchema: params.config.responseSchema } : {})
    };
  }

  const directRes = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bodyPayload),
  });

  if (!directRes.ok) {
    const errData = await directRes.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Google API error ${directRes.status}`);
  }

  const resJson = await directRes.json();
  const candidateText = resJson.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return {
    text: candidateText,
    candidates: resJson.candidates,
    usageMetadata: resJson.usageMetadata,
  };
}

/**
 * Stream content generation via server-sent events (SSE)
 */
export async function* generateContentStreamServer(params: {
  model: string;
  contents: any;
  config?: any;
}): AsyncGenerator<StreamChunk, void, unknown> {
  // Try server streaming endpoint first if available
  try {
    const response = await fetch('/api/gemini/generate-content-stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (response.ok && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith('data:')) continue;
            const dataStr = trimmed.replace(/^data:\s*/, '');
            if (dataStr === '[DONE]') {
              return;
            }

            try {
              const parsed = JSON.parse(dataStr);
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              yield {
                text: parsed.text || '',
                usageMetadata: parsed.usageMetadata,
              };
            } catch (e: any) {
              if (e.message && !e.message.includes('JSON')) {
                throw e;
              }
            }
          }
        }
        return;
      } finally {
        reader.releaseLock();
      }
    }
  } catch {}

  // Fallback to client-side direct generation (supports direct Google API & Pollinations without 405 errors)
  const fallbackRes = await generateContentServer(params);
  yield {
    text: fallbackRes.text || '',
    usageMetadata: fallbackRes.usageMetadata,
  };
}

/**
 * Generate images using Imagen or Gemini multimodal native image models
 */
export async function generateImageServer(params: {
  engine?: 'gemini' | 'imagen';
  model?: string;
  prompt: string;
  contents?: any;
  config?: any;
}): Promise<GenerateImageResult> {
  const response = await fetch('/api/gemini/generate-images', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    let errorMsg = `Image generation error ${response.status}`;
    try {
      const errorData = await response.json();
      errorMsg = errorData.error || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  return response.json();
}

/**
 * Generate video via server-side Veo/Omni endpoint
 */
export async function generateVideoServer(params: {
  prompt: string;
  imageBase64?: string;
  model?: string;
  config?: {
    resolution?: '360p' | '720p' | '1080p';
    duration?: '5s' | '10s';
    aspectRatio?: '16:9' | '9:16' | '1:1';
    numberOfVideos?: number;
    [key: string]: any;
  };
}): Promise<{ videoUrl: string; prompt?: string; resolution?: string; duration?: string; creditsCost?: number }> {
  const response = await fetch('/api/gemini/generate-videos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    let errorMsg = `Video generation error ${response.status}`;
    try {
      const errorData = await response.json();
      errorMsg = errorData.error || errorMsg;
    } catch {}
    throw new Error(errorMsg);
  }

  return response.json();
}

/**
 * Ping server Gemini connection or test direct Google Generative Language API
 */
export async function pingGeminiServer(model: string = 'gemini-2.5-flash-lite', explicitKey?: string): Promise<{ ok: boolean; message: string }> {
  const clientKey = explicitKey || (typeof window !== 'undefined' ? localStorage.getItem('audioarc_gemini_key') || '' : '');

  // Try server endpoint first
  try {
    const response = await fetch('/api/gemini/ping', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model }),
    });

    if (response.ok) {
      return { ok: true, message: 'Server connection verified' };
    }
  } catch {}

  // Direct client-side verification
  if (clientKey) {
    try {
      const googleRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${clientKey.trim()}`);
      if (googleRes.ok) {
        return { ok: true, message: 'Google Gemini API key verified directly' };
      }
      const errData = await googleRes.json().catch(() => ({}));
      throw new Error(errData.error?.message || `Google API error ${googleRes.status}`);
    } catch (err: any) {
      throw new Error(err.message || 'Failed to verify Google Gemini API key');
    }
  }

  throw new Error('No Gemini API key provided. Please enter your Google Gemini API key or use Pollinations.');
}

/**
 * Get Gemini status: checks client-stored key or server-side endpoint
 */
export async function checkGeminiStatus(): Promise<{ ok: boolean; hasKey: boolean; message: string }> {
  const clientKey = typeof window !== 'undefined' ? localStorage.getItem('audioarc_gemini_key') || '' : '';
  if (clientKey) {
    return { ok: true, hasKey: true, message: 'Google Gemini key detected locally' };
  }
  try {
    const response = await fetch('/api/gemini/status');
    if (!response.ok) {
      return { ok: false, hasKey: false, message: 'Server endpoint unreachable' };
    }
    return await response.json();
  } catch (err: any) {
    return { ok: false, hasKey: false, message: err.message || 'Status check failed' };
  }
}
