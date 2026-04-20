// Public R2 asset proxy at /r2/*.
//
// Only objects whose key starts with `images/` are served here. Everything
// else (notably `files/` — the private PDFs) returns 404 regardless of
// whether an object exists at that key. This means product PDFs stay
// invisible to anyone who guesses a URL — they can only be reached through
// the authenticated, grant-backed download endpoint (Phase 4).
//
// Images are cached aggressively: the R2 key embeds a timestamp + random
// suffix on upload, so a given URL is effectively immutable.

interface Env {
  R2: R2Bucket;
}

const PUBLIC_PREFIX = 'images/';
const IMMUTABLE_CACHE = 'public, max-age=31536000, immutable';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const segments = context.params.path;
  const path = Array.isArray(segments) ? segments.join('/') : String(segments ?? '');
  if (!path || !path.startsWith(PUBLIC_PREFIX)) {
    return new Response('Not Found', { status: 404 });
  }

  const object = await context.env.R2.get(path);
  if (!object) {
    return new Response('Not Found', { status: 404 });
  }

  const headers = new Headers();
  object.writeHttpMetadata(headers); // sets Content-Type, Content-Disposition, etc.
  headers.set('etag', object.httpEtag);
  headers.set('Cache-Control', IMMUTABLE_CACHE);

  return new Response(object.body, { headers });
};

// Explicit HEAD — useful for clients checking existence/size without body.
export const onRequestHead: PagesFunction<Env> = async (context) => {
  const segments = context.params.path;
  const path = Array.isArray(segments) ? segments.join('/') : String(segments ?? '');
  if (!path || !path.startsWith(PUBLIC_PREFIX)) {
    return new Response(null, { status: 404 });
  }

  const object = await context.env.R2.head(path);
  if (!object) return new Response(null, { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('Cache-Control', IMMUTABLE_CACHE);
  headers.set('Content-Length', String(object.size));
  return new Response(null, { headers });
};
