/**
 * Minecraft Docs Worker
 *
 * Handles:
 * - Static asset serving (via ASSETS binding)
 * - Access request form submission with Turnstile verification
 * - Email notifications via Brevo
 */

export interface Env {
  ASSETS: Fetcher;
  TURNSTILE_SECRET_KEY: string;
  BREVO_API_KEY: string;
  ADMIN_EMAIL: string;
  NOTIFICATION_PROVIDER?: string;
}

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
}

interface AccessRequestBody {
  email: string;
  minecraft_username: string;
  platform: 'java' | 'bedrock';
  reason?: string;
  'cf-turnstile-response': string;
}

// Verify Turnstile token
async function verifyTurnstile(token: string, secretKey: string, ip: string): Promise<boolean> {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
      remoteip: ip,
    }),
  });

  const result = await response.json<TurnstileResponse>();
  return result.success;
}

// Send email via Brevo
async function sendBrevoEmail(
  apiKey: string,
  to: string,
  subject: string,
  textContent: string
): Promise<boolean> {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender: { name: 'fnord.lol Minecraft', email: 'noreply@fnord.lol' },
      to: [{ email: to }],
      subject,
      textContent,
    }),
  });

  if (!response.ok) {
    console.error('Brevo error:', await response.text());
    return false;
  }
  return true;
}

// Handle access request form submission
async function handleAccessRequest(request: Request, env: Env): Promise<Response> {
  // Only accept POST
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Parse form data
  const formData = await request.formData();
  const body: AccessRequestBody = {
    email: formData.get('email') as string,
    minecraft_username: formData.get('minecraft_username') as string,
    platform: formData.get('platform') as 'java' | 'bedrock',
    reason: formData.get('reason') as string,
    'cf-turnstile-response': formData.get('cf-turnstile-response') as string,
  };

  // Validate required fields
  if (!body.email || !body.minecraft_username || !body.platform) {
    return new Response(JSON.stringify({ error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Verify Turnstile
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const turnstileValid = await verifyTurnstile(
    body['cf-turnstile-response'],
    env.TURNSTILE_SECRET_KEY,
    ip
  );

  if (!turnstileValid) {
    return new Response(JSON.stringify({ error: 'Captcha verification failed' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Get geo info from CF headers
  const country = request.headers.get('CF-IPCountry') || 'unknown';

  // Build email content
  const emailContent = [
    '🎮 New Minecraft Server Access Request',
    '',
    `📧 Email: ${body.email}`,
    `👤 Minecraft Username: ${body.minecraft_username}`,
    `🎯 Platform: ${body.platform === 'java' ? 'Java Edition' : 'Bedrock Edition'}`,
    `📝 Reason: ${body.reason || '(not provided)'}`,
    '',
    `🌍 IP: ${ip}`,
    `🗺️ Country: ${country}`,
    `⏰ Time: ${new Date().toISOString()}`,
    '',
    '---',
    'To approve, run:',
    '',
    `# On the server:`,
    `whitelist add ${body.minecraft_username}`,
  ].join('\n');

  // Send notification
  const provider = env.NOTIFICATION_PROVIDER || 'brevo';

  if (provider === 'brevo' && env.BREVO_API_KEY) {
    const sent = await sendBrevoEmail(
      env.BREVO_API_KEY,
      env.ADMIN_EMAIL,
      `[MC] Access Request: ${body.minecraft_username}`,
      emailContent
    );

    if (!sent) {
      return new Response(JSON.stringify({ error: 'Failed to send request' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else {
    // Console fallback
    console.log('=== ACCESS REQUEST ===');
    console.log(emailContent);
    console.log('======================');
  }

  // Return success - redirect to thank you page
  return new Response(null, {
    status: 303,
    headers: { 'Location': '/request-access/thanks/' },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle form submission
    if (url.pathname === '/api/request-access') {
      return handleAccessRequest(request, env);
    }

    // Serve static assets for everything else
    return env.ASSETS.fetch(request);
  },
};
