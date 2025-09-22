# FarmWise Setup Guide

This guide will help you set up the FarmWise farmer advisory platform on your local machine.

## Prerequisites

- Node.js 18+ installed
- A Supabase account
- A Google AI Studio account (for Gemini API)

## Step 1: Clone and Install

\`\`\`bash
git clone <your-repo-url>
cd farmer-advisory-app
npm install
\`\`\`

## Step 2: Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (this takes a few minutes)
3. Go to Settings > API to find your project URL and anon key
4. Go to Settings > Database to find your database connection string

## Step 3: Set Up Google Gemini AI

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key" 
4. Create a new API key
5. Copy the API key (keep it secure!)

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

2. Fill in your environment variables in `.env.local`:
   \`\`\`env
   # Supabase (Required)
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   
   # Google Gemini AI (Required)
   GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
   
   # Development (Optional)
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/dashboard
   \`\`\`

## Step 5: Set Up Database

The database tables will be created automatically when you run the SQL scripts:

1. Go to your Supabase project dashboard
2. Click on "SQL Editor" 
3. Run the scripts in the `scripts/` folder in order:
   - `001_create_tables.sql`
   - `002_setup_rls.sql` 
   - `003_add_email_configuration.sql`

Or use the v0 interface to run these scripts automatically.

## Step 6: Configure Email (Optional)

For email verification to work properly:

1. In your Supabase project, go to Authentication > Settings
2. Set up SMTP settings:
   - SMTP Host: `smtp.gmail.com`
   - SMTP Port: `587`
   - SMTP User: `laksh2003suthar@gmail.com`
   - SMTP Password: (Gmail App Password)
   - Sender Name: `FarmWise Team`

## Step 7: Run the Application

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 8: Test the Setup

1. Go to the registration page
2. Create a new farmer account
3. Check your email for verification
4. Log in and test the AI chatbot
5. Try uploading an image for pest detection

## Troubleshooting

### Email Verification Not Working
- Check your Supabase SMTP settings
- Verify the email is not in spam folder
- Make sure you're using a valid Gmail App Password

### AI Chatbot Not Responding
- Verify your `GOOGLE_GENERATIVE_AI_API_KEY` is correct
- Check the browser console for error messages
- Make sure you have credits in your Google AI Studio account

### Database Errors
- Ensure all SQL scripts have been run
- Check that Row Level Security (RLS) is properly configured
- Verify your Supabase connection strings are correct

## Features Included

✅ User registration and authentication
✅ Email verification
✅ AI-powered farming chatbot
✅ Pest detection with image upload
✅ Weather integration
✅ Market price tracking
✅ Soil health monitoring
✅ Crop advisory system
✅ Multi-language support
✅ Mobile-responsive design

## Support

If you need help setting up the application, please check:
1. The error messages in your browser console
2. The Supabase project logs
3. Your environment variable configuration

For additional support, contact the development team.
