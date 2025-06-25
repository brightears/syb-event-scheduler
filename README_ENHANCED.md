# SYB Event Scheduler - Enhanced Version

This is an enhanced version of the Soundtrack Event Scheduler with added security, monitoring, and deployment features.

## New Features

### 1. Environment Variable Validation
- Required environment variables are validated on startup
- Clear error messages if configuration is missing
- Validates data types for numeric values

### 2. Enhanced Health Checks
- `/-/alive` - Basic liveness check
- `/-/ready` - Readiness check with database and worker status

### 3. Production-Ready Dockerfile
- Multi-stage build for smaller images
- Non-root user for security
- Proper signal handling with dumb-init

### 4. Render Deployment Support
- `render.yaml` configuration for easy deployment
- Auto-scaling configuration
- Health check integration

## Deployment to Render

### Prerequisites
1. A Render account
2. A GitHub repository with this code
3. A PostgreSQL database (can be created on Render)
4. Soundtrack API credentials

### Step 1: Push to GitHub
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### Step 2: Deploy to Render
1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Render will detect the `render.yaml` file automatically

### Step 3: Configure Environment Variables
In the Render dashboard, set these environment variables:
- `SOUNDTRACK_API_TOKEN` - Your Soundtrack API token
- `DB_URI` - PostgreSQL connection string (e.g., `postgres://user:pass@host:5432/dbname`)

### Step 4: Deploy
Click "Create Web Service" and Render will build and deploy your application.

## Local Development

1. Copy `.env.sample` to `.env` and fill in your credentials:
```bash
cp .env.sample .env
```

2. Install dependencies:
```bash
pnpm install
```

3. Start with database sync (first time only):
```bash
SYNC_DB=true pnpm dev
```

4. Subsequent runs:
```bash
pnpm dev
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `SOUNDTRACK_API_URL` | Yes | Soundtrack API URL |
| `SOUNDTRACK_API_TOKEN` | Yes | Your API token |
| `DB_URI` | No | Database connection string |
| `WORKER_INTERVAL` | No | Worker check interval (default: 60) |
| `PORT` | No | Server port (default: 5173) |

## Docker Deployment

Build and run locally:
```bash
docker build -t syb-scheduler .
docker run -p 5173:5173 --env-file .env syb-scheduler
```

## Security Notes

- This application requires authentication to be added before public deployment
- Ensure your database credentials are kept secure
- Use HTTPS in production
- Consider adding rate limiting for API endpoints

## Future Enhancements

- [ ] User authentication and authorization
- [ ] API rate limiting
- [ ] Comprehensive error handling
- [ ] Test coverage
- [ ] Performance monitoring
- [ ] Audit logging