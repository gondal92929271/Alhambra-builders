const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  // Check if email credentials are properly configured
  const isConfigured = process.env.EMAIL_USER && 
                      process.env.EMAIL_PASS && 
                      !process.env.EMAIL_USER.includes('your-email') &&
                      !process.env.EMAIL_PASS.includes('your-app-password');

  if (!isConfigured) {
    console.log('⚠️  Email not configured - using mock mode');
    // Return a mock transporter for development
    return {
      sendMail: async (options) => {
        console.log('📧 Mock Email would be sent:');
        console.log('To:', options.to);
        console.log('Subject:', options.subject);
        console.log('From:', options.from);
        console.log('Reply-To:', options.replyTo);
        console.log('---');
        return { messageId: 'mock-' + Date.now() };
      }
    };
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const getQuoteEmailTemplate = (formData) => {
  return {
    subject: `New Quote Request from ${formData.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #d4af37; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .section { margin-bottom: 20px; }
          .label { font-weight: bold; color: #d4af37; }
          .value { margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Quote Request</h1>
          </div>
          <div class="content">
            <div class="section">
              <h2>Personal Information</h2>
              <div class="label">Name:</div>
              <div class="value">${formData.name}</div>
              
              <div class="label">Email:</div>
              <div class="value">${formData.email}</div>
              
              <div class="label">Phone:</div>
              <div class="value">${formData.phone}</div>
              
              <div class="label">Address:</div>
              <div class="value">${formData.address}</div>
            </div>
            
            <div class="section">
              <h2>Project Details</h2>
              <div class="label">Project Type:</div>
              <div class="value">${formData.project_type}</div>
              
              ${formData.other_project ? `
                <div class="label">Other Project Type:</div>
                <div class="value">${formData.other_project}</div>
              ` : ''}
              
              <div class="label">Project Description:</div>
              <div class="value">${formData.project_description}</div>
              
              ${formData.budget ? `
                <div class="label">Budget:</div>
                <div class="value">${formData.budget}</div>
              ` : ''}
              
              ${formData.timeframe ? `
                <div class="label">Timeframe:</div>
                <div class="value">${formData.timeframe}</div>
              ` : ''}
            </div>
            
            ${formData.additional_info ? `
              <div class="section">
                <h2>Additional Information</h2>
                <div class="value">${formData.additional_info}</div>
              </div>
            ` : ''}
            
            ${formData.hear_about_us ? `
              <div class="section">
                <h2>How They Heard About Us</h2>
                <div class="value">${formData.hear_about_us}</div>
              </div>
            ` : ''}
            
            <div class="section">
              <p style="color: #d4af37; font-weight: bold;">Please respond to this quote request within 24-48 hours.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

const getContactEmailTemplate = (formData) => {
  return {
    subject: `New Contact Message from ${formData.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #d4af37; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .section { margin-bottom: 20px; }
          .label { font-weight: bold; color: #d4af37; }
          .value { margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Message</h1>
          </div>
          <div class="content">
            <div class="section">
              <div class="label">Name:</div>
              <div class="value">${formData.name}</div>
              
              <div class="label">Email:</div>
              <div class="value">${formData.email}</div>
              
              ${formData.phone ? `
                <div class="label">Phone:</div>
                <div class="value">${formData.phone}</div>
              ` : ''}
              
              ${formData.subject ? `
                <div class="label">Subject:</div>
                <div class="value">${formData.subject}</div>
              ` : ''}
            </div>
            
            <div class="section">
              <h2>Message</h2>
              <div class="value" style="background: white; padding: 15px; border-left: 4px solid #d4af37;">
                ${formData.message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div class="section">
              <p style="color: #d4af37; font-weight: bold;">Please respond to this inquiry promptly.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

// Send quote email
const sendQuoteEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    const emailTemplate = getQuoteEmailTemplate(formData);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      replyTo: formData.email
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Quote email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending quote email:', error);
    return { success: false, error: error.message };
  }
};

// Send contact email
const sendContactEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    const emailTemplate = getContactEmailTemplate(formData);
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: emailTemplate.subject,
      html: emailTemplate.html,
      replyTo: formData.email
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Contact email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending contact email:', error);
    return { success: false, error: error.message };
  }
};

// Send confirmation email to customer
const sendConfirmationEmail = async (customerEmail, customerName, type = 'quote') => {
  try {
    const transporter = createTransporter();
    
    const isQuote = type === 'quote';
    const subject = isQuote ? 'Quote Request Received - Alhamra Builders' : 'Message Received - Alhamra Builders';
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #d4af37; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .footer { background-color: #333; color: white; padding: 15px; text-align: center; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Alhamra Builders Ltd</h1>
          </div>
          <div class="content">
            <p>Dear ${customerName},</p>
            
            <p>Thank you for ${isQuote ? 'your quote request' : 'contacting us'}. We have received your ${isQuote ? 'request' : 'message'} and our team will review it shortly.</p>
            
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our team will review your ${isQuote ? 'project requirements' : 'message'} within 24-48 hours</li>
              <li>We will contact you to ${isQuote ? 'schedule a site visit or discuss your project in detail' : 'provide a response'}</li>
              ${isQuote ? '<li>We will provide a detailed, written quote for your project</li>' : ''}
            </ul>
            
            <p>If you have any urgent questions, please don't hesitate to call us at <strong>07494 656352</strong>.</p>
            
            <p>Best regards,<br>
            <strong>The Alhamra Builders Team</strong></p>
          </div>
          <div class="footer">
            <p>Alhamra Builders Ltd | 247 East Lancashire Road, Swinton, Manchester M27 5QH</p>
            <p>Phone: 07494 656352 | Email: info@alhamrabuilders.co.uk</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: customerEmail,
      subject: subject,
      html: html
    };
    
    const result = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendQuoteEmail,
  sendContactEmail,
  sendConfirmationEmail
};
