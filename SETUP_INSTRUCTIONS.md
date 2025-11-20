# Setup Instructions

## The Error Explained

The error `Cannot find module 'next/server'` occurs because:
- The code is **correct** - `next/server` is the proper import for Next.js 14
- The issue is that **dependencies haven't been installed yet**
- TypeScript can't find the types because `node_modules` doesn't exist

## Solution

### Step 1: Install Node.js
1. Download Node.js from https://nodejs.org/ (LTS version recommended)
2. Install it (this will also install npm)
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

### Step 2: Install Dependencies
Once Node.js is installed, run:
```bash
npm install
```

This will:
- Install all packages listed in `package.json`
- Create the `node_modules` folder
- Install TypeScript types for Next.js
- Resolve the import error

### Step 3: Verify
After installation, the TypeScript error should disappear. The import `import { NextRequest, NextResponse } from "next/server"` is correct for Next.js 14.

## Alternative: If Using WSL

If you're using WSL (Windows Subsystem for Linux), you can install Node.js there:

```bash
# In WSL terminal
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Then navigate to project and install
cd /mnt/c/Users/renan/Desktop/Side_projects/portfolio
npm install
```

## Note

The code in `app/api/contact/route.ts` is **correct** and doesn't need any changes. Once dependencies are installed, the error will resolve automatically.

