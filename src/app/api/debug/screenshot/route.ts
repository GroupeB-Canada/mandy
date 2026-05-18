/**
 * API Route — Debug Screenshot
 * POST /api/debug/screenshot
 *
 * Flow : Next.js API Route → DynamoDB (groupeb_chatbot_debug) + S3 (groupeb-storage)
 * Région AWS : ca-central-1
 * Pas de Lambda/API Gateway nécessaire — AWS SDK direct depuis Next.js
 */

import { NextRequest, NextResponse } from 'next/server';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const REGION = 'ca-central-1';
const TABLE_NAME = 'groupeb_chatbot_debug';
const S3_BUCKET = 'groupeb-storage';
const S3_PREFIX = 'chatbot-debug';

// Clients AWS (credentials depuis env vars Amplify ou IAM role)
const ddb = new DynamoDBClient({ region: REGION });
const s3 = new S3Client({ region: REGION });

// ─── CORS ─────────────────────────────────────────────────────────────────────
const CORS = {
  'Access-Control-Allow-Origin': '*.groupeb.ca',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

// ─── POST /api/debug/screenshot ───────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Ne tourner qu'en mode debug (env var ou query param)
  const debugEnabled = process.env.NEXT_PUBLIC_DEBUG_ENABLED === 'true';
  const queryDebug = req.nextUrl.searchParams.get('debug') === '1';
  if (!debugEnabled && !queryDebug) {
    return NextResponse.json({ error: 'Debug mode disabled' }, { status: 403, headers: CORS });
  }

  let body: {
    siteId?: string;
    screenshotBase64?: string;
    url?: string;
    userAgent?: string;
    viewport?: { w: number; h: number };
    timestamp?: string;
    pageTitle?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400, headers: CORS });
  }

  const {
    siteId = 'unknown',
    screenshotBase64,
    url = '',
    userAgent = '',
    viewport = { w: 0, h: 0 },
    timestamp = new Date().toISOString(),
    pageTitle = '',
  } = body;

  if (!screenshotBase64) {
    return NextResponse.json({ error: 'screenshotBase64 required' }, { status: 400, headers: CORS });
  }

  // Validation taille (max ~5 MB base64 ≈ 3.7 MB image)
  if (screenshotBase64.length > 6_000_000) {
    return NextResponse.json({ error: 'Screenshot trop lourd (max 5 MB)' }, { status: 413, headers: CORS });
  }

  const debugId = crypto.randomUUID();
  const s3Key = `${S3_PREFIX}/${siteId}/${debugId}.png`;

  try {
    // ── 1. Upload PNG vers S3 ───────────────────────────────────────────────
    const imageBuffer = Buffer.from(
      screenshotBase64.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );

    await s3.send(
      new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: s3Key,
        Body: imageBuffer,
        ContentType: 'image/png',
        Metadata: { siteId, debugId, capturedAt: timestamp, pageTitle },
      })
    );

    const screenshotUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${s3Key}`;

    // ── 2. Enregistrer métadonnées dans DynamoDB ────────────────────────────
    // TTL = 30 jours
    const ttl = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30;

    await ddb.send(
      new PutItemCommand({
        TableName: TABLE_NAME,
        Item: {
          pk:             { S: `SITE#${siteId}` },
          sk:             { S: `DEBUG#${timestamp}#${debugId}` },
          debugId:        { S: debugId },
          siteId:         { S: siteId },
          screenshotS3Key: { S: s3Key },
          screenshotUrl:  { S: screenshotUrl },
          url:            { S: url.slice(0, 2000) },
          pageTitle:      { S: pageTitle.slice(0, 500) },
          userAgent:      { S: userAgent.slice(0, 500) },
          viewportW:      { N: String(viewport.w) },
          viewportH:      { N: String(viewport.h) },
          capturedAt:     { S: timestamp },
          createdAt:      { S: new Date().toISOString() },
          ttl:            { N: String(ttl) },
          status:         { S: 'NEW' },
        },
      })
    );

    console.log(`[debug-screenshot] ✅ siteId=${siteId} debugId=${debugId}`);

    return NextResponse.json(
      { success: true, debugId, screenshotUrl },
      { status: 200, headers: CORS }
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    console.error('[debug-screenshot] ❌', msg);
    return NextResponse.json(
      { error: 'Erreur serveur', detail: msg },
      { status: 500, headers: CORS }
    );
  }
}
