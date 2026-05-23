# 🚀 Guide: Deploying Your Portfolio to the Web & Getting Ranked on Google

This guide walk you through how to host your Next.js portfolio online for free, link a custom domain (like `https://arpitsharma.engineer`), and get indexed by Google so you rank at the top of search results.

---

## 🗺️ High-Level Overview

To make your website public like your friend's portfolio, you need two main pieces:
1. **Hosting Server (Free)**: A platform to run and serve your portfolio online 24/7. **Vercel** is the gold standard for Next.js apps.
2. **Custom Domain (Approx. $2–$10/year)**: A custom URL (e.g., `arpitsharma.engineer`) that points to your Vercel server.
3. **Google Indexing (Free)**: Registering with Google Search Console so Google crawlers scan your site and display it when people search "Arpit Sharma".

---

## 🛠️ Step 1: Push Your Code to GitHub
Vercel deploys directly from GitHub. Every time you push a change to GitHub, Vercel will automatically redeploy your live website!

1. Open your terminal in the `arpit-portfolio` directory.
2. Create a new GitHub repository named `arpit-portfolio` (make it **Public**).
3. Run the following commands in your local directory to push your code:
   ```bash
   git init
   git add .
   git commit -m "feat: complete portfolio setup with SEO"
   git branch -M main
   git remote add origin https://github.com/PILOT-SHARMA/arpit-portfolio.git
   git push -u origin main
   ```

---

## 🌐 Step 2: Deploy to Vercel (100% Free)
Vercel is the creator of Next.js, and they offer a generous, completely free tier for personal portfolios.

1. Go to [vercel.com](https://vercel.com/) and sign up using your **GitHub account**.
2. Click the **"Add New..."** button and select **"Project"**.
3. Import your `arpit-portfolio` repository.
4. Keep the default settings (Vercel automatically detects Next.js configurations).
5. Click **"Deploy"**.
6. Within 1–2 minutes, your site will be live! Vercel will give you a free public link like `https://arpit-portfolio.vercel.app`.

---

## 🎫 Step 3: Get a Custom Domain
To get a clean URL like `arpitsharma.engineer` instead of `.vercel.app`:

1. Buy your preferred domain name (e.g., `arpitsharma.engineer` or `portfolioarpitsharma.engineer`) using a registrar such as:
   - **Hostinger**
   - **Namecheap**
   - **GoDaddy**
2. In your Vercel dashboard:
   - Go to your project page.
   - Click **Settings** ➔ **Domains**.
   - Type your new domain (e.g., `arpitsharma.engineer`) and click **Add**.
3. Vercel will show you two DNS records (usually an `A record` and a `CNAME record`).
4. Log into your domain registrar (where you bought the domain), go to **DNS Zone Editor / DNS Settings**, and copy-paste the values Vercel gave you.
5. Within a few minutes to hours, your domain will be fully secure (HTTPS) and live!

---

## 🔍 Step 4: SEO Optimization & Google Ranking (SEO)
Your portfolio is already built with **premium SEO foundations** inside the code. 
- A single, clear `<h1>` element (**Arpit Sharma**) on the home page.
- Full Next.js layout metadata including keywords, descriptive summaries, OpenGraph tags, and index permissions (`index: true`).

To tell Google to index your new URL immediately:

1. Go to **[Google Search Console](https://search.google.com/search-console/about)** and log in.
2. Select **"URL prefix"** or **"Domain"** and enter your custom URL (e.g., `https://arpitsharma.engineer`).
3. Verify ownership: Google will give you a simple TXT record. Add this to your domain registrar's DNS settings (just like you did for Vercel).
4. **Generate a Sitemap**: Next.js automatically supports sitemaps. You can create a file `src/app/sitemap.ts` to help Google index all your pages, or let Vercel handle it.
5. In Google Search Console, click on **Sitemaps** on the left menu and submit your sitemap URL (e.g., `https://arpitsharma.engineer/sitemap.xml`).
6. Click **URL Inspection**, enter your home URL, and click **"Request Indexing"**.

Google will crawl your site within a few days, and your portfolio will begin ranking when someone searches **"Arpit Sharma"**!
