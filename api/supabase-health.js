export default async function handler(req, res) {
  const endpoint = 'https://nyodlyoffwqyoequxrdw.supabase.co/rest/v1/app_assets?version=eq.5.3.0&select=idx,data&order=idx.asc';
  const apiKey = 'sb_publishable_tybczeLoU_O8gNr08NevEw_nsZFUvV2';

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    let response;
    try {
      response = await fetch(endpoint, {
        headers: { apikey: apiKey },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    const body = await response.text();
    res.status(200).json({
      reachable: true,
      ok: response.ok,
      status: response.status,
      bytes: body.length,
      contentType: response.headers.get('content-type'),
    });
  } catch (error) {
    res.status(200).json({
      reachable: false,
      ok: false,
      error: String(error && error.message ? error.message : error),
    });
  }
}
