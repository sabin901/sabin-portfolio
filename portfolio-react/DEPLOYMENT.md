# Deployment Guide

## Pre-Deployment Checklist

✅ All sections have proper IDs for navigation
✅ Smooth scrolling implemented
✅ All external links have `rel="noopener noreferrer"`
✅ All images have proper paths
✅ SEO meta tags are complete
✅ Responsive design tested
✅ Accessibility attributes added (aria-labels)
✅ Build completes without errors

## Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist/` folder.

## Deployment Options

### Option 1: Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and your site will be live!

### Option 2: Netlify

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Build and deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

### Option 3: GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to package.json scripts:
```json
"deploy": "npm run build && gh-pages -d dist"
```

3. Deploy:
```bash
npm run deploy
```

### Option 4: Traditional Hosting

1. Build the project:
```bash
npm run build
```

2. Upload the `dist/` folder contents to your web server

3. Configure your server to:
   - Serve `index.html` for all routes (SPA routing)
   - Enable gzip compression
   - Set proper cache headers

## Environment Variables

No environment variables are required for this project. All configuration is in the codebase.

## Post-Deployment

1. Test all links
2. Verify SEO meta tags
3. Check mobile responsiveness
4. Test form submissions (if applicable)
5. Verify analytics tracking (if added)

## Performance Optimization

The build includes:
- Code splitting
- Tree shaking
- Minification
- Asset optimization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Build Errors
- Run `npm install` to ensure all dependencies are installed
- Clear `node_modules` and reinstall if needed
- Check TypeScript errors: `npm run build`

### Routing Issues
- Ensure your hosting provider supports SPA routing
- Configure redirects to `index.html` for all routes

### Asset Loading Issues
- Verify all image paths are correct
- Check that public folder assets are copied during build
