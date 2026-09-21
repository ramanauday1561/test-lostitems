# HTTPS Domain Configuration Guide

## Current Status ✅
- GitHub Actions workflow properly configured
- CNAME file automatically generated during build
- TypeScript checks and web export working

## Required Manual Steps

### Step 1: Verify GitHub Repository Settings
1. Go to: https://github.com/ramanauday1561/test-lostitems
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under "Custom domain", verify:
   - Domain is set to: `test.lostitemscommunity.com`
   - "Enforce HTTPS" checkbox is **checked** ✓
4. If domain not showing or needs update:
   - Enter: `test.lostitemscommunity.com`
   - Click "Save"

### Step 2: Verify DNS Configuration at GoDaddy
1. Go to: https://www.godaddy.com (login to account)
2. Navigate to DNS Management for `lostitemscommunity.com`
3. Check existing records for CNAME:
   - **Name:** `test`
   - **Type:** `CNAME`
   - **Value:** `ramanauday1561.github.io`
4. If not present, add it:
   - Add CNAME record
   - Name: `test`
   - Points to: `ramanauday1561.github.io`
5. Wait 24-48 hours for DNS propagation

### Step 3: Verify GitHub Pages SSL Certificate
1. Return to GitHub repo **Settings** → **Pages**
2. Look for status messages like:
   - "Your site is published at https://test.lostitemscommunity.com"
   - "Certificate is valid" (green checkmark)
3. GitHub Pages automatically provisions SSL via Let's Encrypt
4. This typically takes 5-10 minutes after domain is correctly configured

### Step 4: Troubleshooting

**If "Domain not configured" error:**
- Wait 5 minutes and refresh GitHub Pages settings
- Verify CNAME record is correct in GoDaddy
- DNS changes can take up to 48 hours

**If certificate not issued:**
- Ensure domain is correctly pointing to GitHub Pages
- GitHub Pages needs to receive requests to validate the domain
- Once validated, certificate is auto-provisioned

**Force refresh:**
1. Remove domain from GitHub Pages settings
2. Wait 2 minutes
3. Re-add domain to GitHub Pages settings

### Step 5: Testing Deployment
1. Push changes to `main` branch (GitHub Actions auto-runs)
2. Wait for workflow to complete (check Actions tab)
3. Visit: https://test.lostitemscommunity.com
4. Should load with HTTPS (green lock icon in browser)

## Automated Process
The workflow handles:
- ✅ Building React Native web app with Expo
- ✅ Type checking with TypeScript
- ✅ Creating CNAME file for custom domain
- ✅ Uploading to GitHub Pages

You only need to:
1. Configure domain in GitHub repo settings
2. Add CNAME record at GoDaddy DNS
3. Let GitHub Pages provision SSL (automatic)

## Files Reference
- Workflow: `.github/workflows/deploy.yml`
- CNAME generation: Line 46 in deploy.yml
- Build output: `lost-items-app/dist/` → deployed to GitHub Pages

## Support
If issues persist:
1. Check GitHub Actions log for build errors
2. Verify DNS propagation: https://www.whatsmydns.net
3. Check GitHub Pages status: https://www.githubstatus.com
