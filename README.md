# Alhamra Builders Website - Node.js/Express/EJS Migration

This document provides information about the migrated Alhamra Builders website project.

## Project Overview

The original static HTML website has been converted to a modern Node.js application using:
- Express.js framework
- EJS templating engine
- Enhanced styling and animations
- Responsive design for all devices

## Project Structure

```
alhamra_new_project/
├── node_modules/        # Node.js dependencies
├── public/              # Static assets
│   ├── css/             # CSS stylesheets
│   ├── js/              # JavaScript files
│   └── images/          # Image files
├── views/               # EJS templates
│   ├── partials/        # Reusable template parts
│   └── *.ejs            # Page templates
├── app.js               # Main application file
├── package.json         # Project configuration
└── .env                 # Environment variables
```

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Configure email settings (see EMAIL_SETUP.md for detailed instructions):
   ```
   Edit .env file with your SMTP credentials
   ```

3. Start the server:
   ```
   npm start
   ```

3. For development with auto-restart:
   ```
   npm run dev
   ```

4. Access the website at:
   ```
   http://localhost:3000
   ```

## Enhancements

### Styling Improvements
- Modern, professional design
- Consistent color scheme and typography
- Enhanced visual hierarchy
- Smooth animations and transitions
- Improved spacing and layout

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly navigation
- Flexible grid layouts

### Code Structure
- Modular EJS templates with partials
- Organized CSS with variables
- Enhanced JavaScript functionality
- Proper Express routing

### Email Functionality
- Contact form email notifications to admin
- Quote request email notifications to admin
- Automatic confirmation emails to customers
- Professional HTML email templates
- Error handling and validation
- SMTP configuration support

## Customization

### Modifying Pages
Edit the corresponding EJS files in the `views` directory.

### Styling Changes
Modify the CSS files in the `public/css` directory.

### Adding New Pages
1. Create a new EJS file in the `views` directory
2. Add a new route in `app.js`

## Contact

For any questions or support, please contact the developer.
