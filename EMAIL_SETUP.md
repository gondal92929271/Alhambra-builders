# Email Setup Instructions for Alhamra Builders

## Email Configuration

The email system is now set up to send emails when users submit the contact form or quote request form. Follow these steps to configure your email credentials:

### 1. Update Environment Variables

Edit the `.env` file and replace the placeholder values with your actual email credentials:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com              # SMTP server (Gmail example)
EMAIL_PORT=587                         # SMTP port
EMAIL_SECURE=false                     # Use TLS (false for port 587, true for port 465)
EMAIL_USER=your-actual-email@gmail.com # Your email address
EMAIL_PASS=your-app-password           # Your app password (not regular password)
EMAIL_FROM=your-actual-email@gmail.com # From email address
ADMIN_EMAIL=info@alhamrabuilders.co.uk # Email where form submissions will be sent
```

### 2. Gmail Setup (if using Gmail)

If you're using Gmail, you need to:

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `EMAIL_PASS`, not your regular Gmail password

### 3. Other Email Providers

For other email providers, update the SMTP settings accordingly:

#### Outlook/Hotmail:
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

#### Yahoo:
```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_SECURE=false
```

#### Custom SMTP:
Contact your hosting provider for SMTP settings.

### 4. Features Implemented

✅ **Quote Form Email**: Sends detailed quote requests to admin email
✅ **Contact Form Email**: Sends contact messages to admin email  
✅ **Customer Confirmation**: Sends confirmation emails to customers
✅ **HTML Email Templates**: Professional branded email templates
✅ **Error Handling**: Shows error messages if email sending fails
✅ **Field Validation**: Validates required fields before sending

### 5. Testing

1. Start the server: `npm start`
2. Fill out the contact form or quote form
3. Check that:
   - Admin receives the form submission email
   - Customer receives confirmation email
   - Success message appears on the website

### 6. Security Notes

- Never commit your actual email credentials to version control
- Keep the `.env` file in `.gitignore`
- Use app passwords instead of regular passwords
- Consider using environment-specific configurations for production

### 7. Troubleshooting

If emails aren't sending:
1. Check console logs for error messages
2. Verify SMTP credentials are correct
3. Ensure "Less secure app access" is enabled (for some providers)
4. Check spam folders for test emails
5. Verify network allows SMTP connections

## Email Templates

The system includes professional HTML email templates with:
- Alhamra Builders branding
- Responsive design
- Clear formatting of form data
- Contact information in footer

Both admin notification emails and customer confirmation emails are automatically sent for each form submission.
