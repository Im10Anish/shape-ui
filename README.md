# Shape UI

React component library for building user interfaces with a focus on accessibility and design consistency.

## 🚀 Deployment

This project uses automated deployment pipelines for both the npm package and Storybook documentation.

### Storybook Deployment

Storybook is automatically deployed to **Netlify** when:

- A new version tag is pushed (e.g., `v1.2.3`)
- A release is created via semantic-release

**Live Storybook URL**: [Your Netlify URL will appear here after first deployment]

### Deployment Services Used

1. **Netlify** - Hosts the Storybook documentation
   - Automatic deployments on releases
   - Custom domain support
   - CDN and performance optimizations

2. **GitHub Actions** - CI/CD Pipeline
   - Automated testing and building
   - Semantic versioning and releases
   - Storybook deployment triggers

3. **SonarCloud** - Code Quality & Security
   - Comprehensive code analysis
   - Security vulnerability scanning
   - Quality gates for releases
   - Technical debt tracking

4. **Codecov** - Test Coverage
   - Detailed coverage reports
   - Coverage trends and history
   - PR coverage comments
   - Coverage badges

### Setup Instructions

#### 1. Netlify Setup

1. Create a Netlify account at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Get your Netlify credentials:
   - **Site ID**: Found in your Netlify dashboard
   - **Auth Token**: Generate in Netlify user settings

#### 2. SonarCloud Setup

1. Create a SonarCloud account at [sonarcloud.io](https://sonarcloud.io)
2. Create an organization and project
3. Get your SonarCloud token from Account > Security

#### 3. Codecov Setup (Optional)

1. Connect your repository at [codecov.io](https://codecov.io)
2. No additional setup required for public repositories

#### 4. GitHub Secrets

Add these secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

```
NETLIFY_AUTH_TOKEN=your_netlify_auth_token
NETLIFY_SITE_ID=your_netlify_site_id
NPM_TOKEN=your_npm_token
SONAR_TOKEN=your_sonarcloud_token
```

#### 5. NPM Token Setup

1. Create an NPM token with publish permissions
2. Add it to GitHub secrets as `NPM_TOKEN`

### Deployment Workflow

1. **Development**: Push to `develop` branch triggers CI tests
2. **Pull Requests**: Triggers CI tests and quality checks (no deployment)
3. **Release**: Push to `master` branch triggers:
   - Semantic versioning
   - NPM package publishing
   - Storybook deployment to Netlify
   - SonarCloud quality gate validation
4. **Manual**: Use GitHub Actions "workflow_dispatch" to manually trigger deployments

### Deployment Triggers

✅ **Storybook deploys when:**

- A version tag is pushed (e.g., `v1.2.3`)
- Semantic-release creates a new version
- Manual trigger via GitHub Actions

❌ **Storybook does NOT deploy when:**

- Pull requests are opened/updated
- Code is pushed to feature branches
- Code is merged to master (without semantic-release)

### Manual Deployment

To manually deploy Storybook:

```bash
# Build Storybook locally
npm run build-storybook:ci

# Deploy to Netlify (if you have Netlify CLI)
netlify deploy --prod --dir=storybook-static
```

### Alternative Deployment Services

If you prefer other services, here are alternatives:

#### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### GitHub Pages

```bash
# Add to package.json scripts
"deploy-storybook": "storybook-to-ghpages"

# Deploy
npm run deploy-storybook
```

#### AWS S3 + CloudFront

```bash
# Install AWS CLI and configure
aws s3 sync storybook-static/ s3://your-bucket-name
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

## 📦 Installation

```bash
npm install @im10anish/shape-ui
```

## 🎨 Usage

```tsx
import { Button } from "@im10anish/shape-ui";

function App() {
  return <Button>Click me</Button>;
}
```

## 🧪 Testing

```bash
npm test
npm run test:coverage
```

## 📚 Documentation

Visit our [Storybook](https://your-netlify-url.netlify.app) for interactive component documentation and examples.

## 🔍 Code Quality

- **SonarCloud**: [View Analysis](https://sonarcloud.io/project/overview?id=Im10anish_shape-ui)
- **Codecov**: [View Coverage](https://codecov.io/gh/Im10anish/shape-ui)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT
