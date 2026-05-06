Dave Tech Hub 🖤🏆
Premium Tech Landing Page....Next.js 14 + Sanity + Framer Motion
Stack
Next.js 14 (App Router)
Tailwind CSS with custom Gold palette
Framer Motion for animations
Sanity v3 for CMS + Admin Portal
Vercel for hosting
Setup
1. Install dependencies
Bash
2. Configure environment variables
Copy .env.local.example → .env.local and fill in:
Code
Get your project ID from: https://sanity.io/manage
3. Run locally
Bash
Landing page: http://localhost:3000
Admin portal: http://localhost:3000/admin
Deploying to Vercel
Push your repo to GitHub
Import in Vercel
Add env vars in Vercel dashboard:
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
In Sanity dashboard → API → CORS Origins, add your Vercel domain:
Code
✅ Check "Allow credentials"
Connect Sanity to Live Products
In app/page.tsx, replace the MOCK_PRODUCTS array:
Tsx
Then convert page.tsx to a server component (remove "use client" and extract
animated sections to separate client components).
Admin Portal (CEO Guide)
Go to https://your-domain.com/admin
Log in with your Sanity account
Click Product → Create New
Upload image, add name, price, category, badge
Hit Publish — live on site instantly
robots.txt
/admin is already blocked from Google indexing via public/robots.txt.
Update the Sitemap: line with your real domain.
WhatsApp Number
All Buy Now buttons send to 07070440191 (configured in components/ProductCard.tsx).
To change: update WHATSAPP_NUMBER in that file.