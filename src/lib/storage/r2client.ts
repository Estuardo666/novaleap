import { S3Client } from '@aws-sdk/client-s3';

// Validate environment variables
const accountId = process.env.R2_ENDPOINT; // Technically we put the full endpoint here but let's double check
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const endpoint = process.env.R2_ENDPOINT;

if (!accessKeyId || !secretAccessKey || !endpoint) {
  throw new Error("Missing R2 configuration in environment variables.");
}

export const r2Client = new S3Client({
  region: 'auto', // Cloudflare R2 always uses 'auto'
  endpoint: endpoint,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});
