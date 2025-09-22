-- Add email configuration for verification emails
-- This script sets up email templates and SMTP configuration

-- Enable email confirmations and set custom email templates
UPDATE auth.config 
SET 
  enable_signup = true,
  enable_confirmations = true,
  email_confirm_url = 'https://your-domain.com/auth/callback',
  smtp_host = 'smtp.gmail.com',
  smtp_port = 587,
  smtp_user = 'laksh2003suthar@gmail.com',
  smtp_pass = 'your-app-password',
  smtp_sender_name = 'FarmWise Team',
  smtp_sender_email = 'laksh2003suthar@gmail.com'
WHERE id = 1;

-- Custom email template for signup confirmation
INSERT INTO auth.email_templates (template_type, subject, body_html, body_text)
VALUES (
  'confirmation',
  'Welcome to FarmWise - Confirm Your Email',
  '<h2>Welcome to FarmWise! 🌱</h2>
   <p>Thank you for joining our farming community. Please confirm your email address by clicking the link below:</p>
   <p><a href="{{ .ConfirmationURL }}" style="background-color: #16a34a; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Confirm Email Address</a></p>
   <p>Once confirmed, you can start getting personalized farming advice from our AI assistant.</p>
   <p>Happy farming!<br>The FarmWise Team</p>',
  'Welcome to FarmWise!

Thank you for joining our farming community. Please confirm your email address by visiting:
{{ .ConfirmationURL }}

Once confirmed, you can start getting personalized farming advice from our AI assistant.

Happy farming!
The FarmWise Team'
)
ON CONFLICT (template_type) DO UPDATE SET
  subject = EXCLUDED.subject,
  body_html = EXCLUDED.body_html,
  body_text = EXCLUDED.body_text;
