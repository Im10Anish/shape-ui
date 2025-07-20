# Deployment Guide

This guide covers setting up automated deployment for your Shape UI component library.

## 🎯 Overview

The deployment pipeline consists of:

- **CI/CD**: GitHub Actions workflows
- **Package Publishing**: NPM registry via semantic-release
- **Documentation**: Storybook hosted on Netlify
- **Code Quality**: SonarCloud for comprehensive analysis
- **Test Coverage**: Codecov for detailed coverage reporting
- **Triggers**: Automatic deployment on version tags and releases

## 🚀 Quick Setup

### 1. Netlify Setup

1. **Create Netlify Account**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with your GitHub account

2. **Create New Site**
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build settings:
     - **Build command**: `npm run build-storybook:ci`
     - **Publish directory**: `storybook-static`
   - Click "Deploy site"

3. **Get Credentials**
   - **Site ID**: Found in site settings
   - **Auth Token**: Go to User Settings > Applications > Personal access tokens

### 2. SonarCloud Setup

1. **Create SonarCloud Account**
   - Go to [sonarcloud.io](https://sonarcloud.io)
   - Sign up with your GitHub account

2. **Create Organization**
   - Create a new organization (free for public repos)
   - Set organization key (e.g., `im10anish`)

3. **Create Project**
   - Import your GitHub repository
   - Set project key (e.g., `Im10anish_shape-ui`)
   - Choose analysis method: GitHub Actions

4. **Get SonarCloud Token**
   - Go to Account > Security > Generate Tokens
   - Create a new token with analysis permissions

### 3. Codecov Setup (Optional but Recommended)

1. **Connect Codecov**
   - Go to [codecov.io](https://codecov.io)
   - Sign up with your GitHub account
   - Add your repository

2. **Get Codecov Token** (if needed)
   - Usually not required for public repos
   - Available in project settings if needed

### 4. GitHub Secrets

Add these secrets in your GitHub repository (`Settings > Secrets and variables > Actions`):

| Secret Name          | Description                   | Example                                |
| -------------------- | ----------------------------- | -------------------------------------- |
| `NETLIFY_AUTH_TOKEN` | Netlify personal access token | `ntfy_abc123...`                       |
| `NETLIFY_SITE_ID`    | Your Netlify site ID          | `abc12345-def6-7890-ghij-klmnopqrstuv` |
| `NPM_TOKEN`          | NPM publish token             | `npm_abc123...`                        |
| `SONAR_TOKEN`        | SonarCloud analysis token     | `sqp_abc123...`                        |

### 5. NPM Token Setup

1. **Create NPM Token**:

   ```bash
   npm login
   npm token create --read-only
   ```

2. **For Publishing** (if not already logged in):
   ```bash
   npm token create
   ```

## 🔄 Deployment Workflows

### Automatic Deployment

The following triggers will automatically deploy Storybook:

1. **Version Tags**: Push a tag like `v1.2.3`
2. **Semantic Release**: When semantic-release creates a new version
3. **Manual Trigger**: Use GitHub Actions "workflow_dispatch"

### Workflow Files

- **`.github/workflows/ci.yml`**: Runs on PRs and branch pushes
  - Tests, linting, type checking
  - **SonarCloud scan** for code quality
  - **Codecov upload** for coverage reports
- **`.github/workflows/release.yml`**: Handles releases and triggers deployment
  - **SonarCloud Quality Gate** for release validation
  - Semantic versioning and NPM publishing
  - Storybook deployment to Netlify
- **`.github/workflows/deploy-storybook.yml`**: Dedicated Storybook deployment

## 🛠️ Manual Deployment

### Local Deployment

```bash
# Build Storybook
npm run build-storybook:ci

# Deploy to Netlify (requires Netlify CLI)
npm install -g netlify-cli
netlify login
npm run deploy-storybook
```

### Preview Deployment

```bash
# Deploy preview (not production)
npm run deploy-storybook:preview
```

## 🌐 Alternative Hosting Services

### Vercel

1. **Install Vercel CLI**:

   ```bash
   npm i -g vercel
   ```

2. **Deploy**:

   ```bash
   vercel --prod
   ```

3. **Configuration** (`vercel.json`):
   ```json
   {
     "buildCommand": "npm run build-storybook:ci",
     "outputDirectory": "storybook-static",
     "framework": null
   }
   ```

### GitHub Pages

1. **Add Script** to `package.json`:

   ```json
   {
     "scripts": {
       "deploy-storybook": "storybook-to-ghpages"
     }
   }
   ```

2. **Install Dependency**:

   ```bash
   npm install --save-dev @storybook/storybook-deployer
   ```

3. **Deploy**:
   ```bash
   npm run deploy-storybook
   ```

### AWS S3 + CloudFront

1. **Install AWS CLI** and configure credentials

2. **Create S3 Bucket** and CloudFront distribution

3. **Deploy Script**:

   ```bash
   # Sync to S3
   aws s3 sync storybook-static/ s3://your-bucket-name --delete

   # Invalidate CloudFront cache
   aws cloudfront create-invalidation \
     --distribution-id YOUR_DISTRIBUTION_ID \
     --paths "/*"
   ```

## 🔧 Configuration Files

### Netlify Configuration (`netlify.toml`)

```toml
[build]
  command = "npm run build-storybook:ci"
  publish = "storybook-static"

[build.environment]
  NODE_VERSION = "18"
  NODE_OPTIONS = "--openssl-legacy-provider --max-old-space-size=8192"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### SonarCloud Configuration (`sonar-project.properties`)

```properties
sonar.projectKey=Im10anish_shape-ui
sonar.organization=im10anish
sonar.projectName=Shape UI
sonar.projectVersion=1.0
sonar.sources=src
sonar.tests=src
sonar.test.inclusions=**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx
sonar.exclusions=**/*.stories.tsx,**/node_modules/**,**/dist/**,**/coverage/**
sonar.coverage.exclusions=**/*.stories.tsx,**/*.d.ts,**/index.ts
sonar.javascript.lcov.reportPaths=coverage/lcov.info
sonar.typescript.lcov.reportPaths=coverage/lcov.info
```

### Storybook Configuration

The `.storybook/main.ts` file includes CI-specific optimizations:

```typescript
viteFinal: async (config, { configType }) => {
  if (configType === "PRODUCTION" && process.env.CI) {
    config.build = {
      target: "es2020",
      rollupOptions: {
        external: ["crypto"],
        output: {
          inlineDynamicImports: false,
          manualChunks: {
            vendor: ["react", "react-dom"],
          },
        },
      },
    };
  }
  return config;
};
```

## 🚨 Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (use 18.x)
   - Ensure all dependencies are installed
   - Verify NODE_OPTIONS are set correctly

2. **Deployment Failures**:
   - Verify Netlify credentials
   - Check build logs in Netlify dashboard
   - Ensure `storybook-static` directory exists

3. **SonarCloud Issues**:
   - Verify SONAR_TOKEN is set correctly
   - Check organization and project keys
   - Ensure coverage reports are generated

4. **Performance Issues**:
   - Enable caching headers in `netlify.toml`
   - Optimize bundle size with manual chunks
   - Use CDN for static assets

### Debug Commands

```bash
# Test build locally
npm run build-storybook:ci

# Check build output
ls -la storybook-static/

# Test Netlify deployment locally
netlify dev --dir=storybook-static

# Run SonarCloud analysis locally
npm install -g sonarqube-scanner
sonar-scanner
```

## 📊 Monitoring

### Netlify Analytics

- **Deploy Status**: Check Netlify dashboard
- **Performance**: Use Netlify Analytics
- **Error Tracking**: Monitor build logs

### SonarCloud Dashboard

- **Code Quality**: View quality metrics
- **Security**: Monitor security vulnerabilities
- **Coverage**: Track test coverage trends
- **Technical Debt**: Monitor code maintainability

### Codecov Dashboard

- **Coverage Reports**: Detailed coverage analysis
- **Coverage Trends**: Historical coverage data
- **PR Comments**: Automatic coverage comments

### GitHub Actions

- **Workflow Status**: Check Actions tab
- **Build Logs**: Detailed logs for debugging
- **Release History**: Track version releases

## 🔐 Security

### Best Practices

1. **Secrets Management**:
   - Never commit tokens to repository
   - Use GitHub secrets for sensitive data
   - Rotate tokens regularly

2. **Access Control**:
   - Limit token permissions
   - Use read-only tokens where possible
   - Monitor token usage

3. **Build Security**:
   - Pin dependency versions
   - Use `npm ci` for reproducible builds
   - Scan for vulnerabilities with SonarCloud

## 📈 Performance Optimization

### Build Optimizations

1. **Bundle Splitting**:
   - Vendor chunks for React
   - Lazy loading for stories
   - Tree shaking for unused code

2. **Caching Strategy**:
   - Static asset caching
   - CDN distribution
   - Browser caching headers

3. **Image Optimization**:
   - WebP format support
   - Responsive images
   - Lazy loading

## 🎉 Success Metrics

Monitor these metrics for successful deployment:

- ✅ Build success rate > 95%
- ✅ Deployment time < 5 minutes
- ✅ Storybook load time < 3 seconds
- ✅ 100% test coverage maintained
- ✅ SonarCloud Quality Gate passed
- ✅ Zero security vulnerabilities
- ✅ Code quality rating A or higher
