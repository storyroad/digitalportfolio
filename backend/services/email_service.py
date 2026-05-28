import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import logging

logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        self.smtp_host = os.environ.get('SMTP_HOST', 'smtp.gmail.com')
        self.smtp_port = int(os.environ.get('SMTP_PORT', '587'))
        self.smtp_username = os.environ.get('SMTP_USERNAME', '')
        self.smtp_password = os.environ.get('SMTP_PASSWORD', '')
        self.from_email = os.environ.get('FROM_EMAIL', 'noreply@commarkai.com')
        
    async def send_contact_notification(self, name: str, email: str, message: str):
        """Send email notification when contact form is submitted"""
        try:
            # Create message
            msg = MIMEMultipart('alternative')
            msg['Subject'] = f'New Contact Form Submission from {name}'
            msg['From'] = self.from_email
            msg['To'] = 'ketsiasln@gmail.com'
            
            # Create HTML body
            html_body = f"""
            <html>
              <head>
                <style>
                  body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                  .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
                  .header {{ background: linear-gradient(135deg, #2563eb 0%, #0891b2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }}
                  .content {{ background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px; }}
                  .field {{ margin-bottom: 20px; }}
                  .label {{ font-weight: bold; color: #475569; margin-bottom: 5px; }}
                  .value {{ background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #2563eb; }}
                  .footer {{ text-align: center; margin-top: 30px; color: #64748b; font-size: 14px; }}
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1 style="margin: 0;">🎉 New Contact Form Submission</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">You have a new message from your portfolio website</p>
                  </div>
                  <div class="content">
                    <div class="field">
                      <div class="label">Name:</div>
                      <div class="value">{name}</div>
                    </div>
                    <div class="field">
                      <div class="label">Email:</div>
                      <div class="value">{email}</div>
                    </div>
                    <div class="field">
                      <div class="label">Message:</div>
                      <div class="value">{message}</div>
                    </div>
                  </div>
                  <div class="footer">
                    <p>This email was sent from your COMMARKAI portfolio contact form.</p>
                  </div>
                </div>
              </body>
            </html>
            """
            
            # Attach HTML body
            html_part = MIMEText(html_body, 'html')
            msg.attach(html_part)
            
            # Send email
            if self.smtp_username and self.smtp_password:
                await aiosmtplib.send(
                    msg,
                    hostname=self.smtp_host,
                    port=self.smtp_port,
                    username=self.smtp_username,
                    password=self.smtp_password,
                    start_tls=True
                )
                logger.info(f"Email notification sent to ketsiasln@gmail.com for contact from {name}")
                return True
            else:
                logger.warning("SMTP credentials not configured. Email notification skipped.")
                logger.info(f"Would have sent email to ketsiasln@gmail.com - Contact from: {name} ({email})")
                return False
                
        except Exception as e:
            logger.error(f"Failed to send email notification: {str(e)}")
            return False

email_service = EmailService()
