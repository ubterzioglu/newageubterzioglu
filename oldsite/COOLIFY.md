# Coolify Deployment Guide

## Prerequisites

1. A Coolify instance (self-hosted or managed)
2. Domain name pointed to your Coolify server
3. Upstash Redis database (for vote/comment storage)
4. Resend account (for email functionality)

## Environment Variables

Add these in Coolify dashboard > Environment Variables:

```
RESEND_API_KEY=re_your_key_here
TO_EMAIL=ubt@ubterzioglu.de
FROM_EMAIL=ZTOOLFORTOOL <onboarding@resend.dev>
UPSTASH_REDIS_REST_URL=https://your-db.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
ZBOM_ADMIN_KEY=your_secure_admin_key
```

## Deployment Steps

### Option 1: Using Docker Compose (Recommended)

1. In Coolify, create a new resource
2. Select "Docker Compose"
3. Point to your repository
4. Coolify will automatically use `docker-compose.yml`
5. Add environment variables in the dashboard
6. Deploy!

### Option 2: Using Dockerfile

1. In Coolify, create a new resource
2. Select "Dockerfile"
3. Point to your repository
4. Set build context to root
5. Add environment variables
6. Deploy!

## Post-Deployment

1. Set up your domain in Coolify
2. Enable HTTPS/SSL
3. Test API endpoints:
   - `GET /api/zbom-list`
   - `POST /api/send`
   - etc.

## Troubleshooting

- **Port issues**: Ensure PORT=3000 is set
- **CORS errors**: CORS is enabled by default in server.js
- **Static files not loading**: Check that files are in the container root

## Migration from Vercel

If migrating from Vercel:
1. Copy KV_REST_API_URL and KV_REST_API_TOKEN from Vercel to Coolify
2. Update RESEND_API_KEY if needed
3. Update FROM_EMAIL if you had a custom domain configured
4. Deploy and test all functionality
