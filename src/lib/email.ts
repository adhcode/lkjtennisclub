import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/auth/verify-email?token=${token}`;

  try {
    await resend.emails.send({
      from: 'LKJ Tennis Club <hello@lkjtennisclub.com>',
      to: email,
      subject: 'Verify your email address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #911b1e; margin: 0;">LKJ Tennis Club</h1>
          </div>
          
          <div style="background-color: #fcf7dc; padding: 30px; border-radius: 8px;">
            <h2 style="color: #911b1e; margin-top: 0;">Verify Your Email Address</h2>
            <p style="color: #333; line-height: 1.6;">
              Thank you for signing up! Please verify your email address by clicking the button below:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="display: inline-block; background-color: #911b1e; color: #fcf7dc; 
                        padding: 14px 32px; text-decoration: none; border-radius: 4px; 
                        font-weight: bold; font-size: 16px;">
                Verify Email Address
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              Or copy and paste this link into your browser:
            </p>
            <p style="color: #666; font-size: 14px; word-break: break-all; background-color: #fff; padding: 10px; border-radius: 4px;">
              ${verificationUrl}
            </p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              This link will expire in 24 hours.
            </p>
            <p style="color: #666; font-size: 14px;">
              If you didn't create an account, you can safely ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
            <p>© ${new Date().getFullYear()} LKJ Tennis Club. All rights reserved.</p>
          </div>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return { success: false, error };
  }
}

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await resend.emails.send({
      from: 'LKJ Tennis Club <hello@lkjtennisclub.com>',
      to: email,
      subject: 'Welcome to LKJ Tennis Club!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #911b1e; margin: 0;">LKJ Tennis Club</h1>
          </div>
          
          <div style="background-color: #fcf7dc; padding: 30px; border-radius: 8px;">
            <h2 style="color: #911b1e; margin-top: 0;">Welcome, ${name}!</h2>
            <p style="color: #333; line-height: 1.6;">
              Your email has been verified successfully! You're now part of the LKJ Tennis Club community.
            </p>
            
            <p style="color: #333; line-height: 1.6;">
              Here's what you can do now:
            </p>
            
            <ul style="color: #333; line-height: 1.8;">
              <li>Browse our shop for tennis equipment</li>
              <li>Register for upcoming events and tournaments</li>
              <li>Join our tennis programs</li>
              <li>Connect with other members</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXTAUTH_URL}" 
                 style="display: inline-block; background-color: #911b1e; color: #fcf7dc; 
                        padding: 14px 32px; text-decoration: none; border-radius: 4px; 
                        font-weight: bold; font-size: 16px;">
                Visit Our Website
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              If you have any questions, feel free to reach out to us.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
            <p>© ${new Date().getFullYear()} LKJ Tennis Club. All rights reserved.</p>
          </div>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error };
  }
}

export async function sendMembershipVerificationEmail(
  email: string,
  name: string,
  membershipId: string,
  verificationCode: string
) {
  try {
    await resend.emails.send({
      from: 'LKJ Tennis Club <hello@lkjtennisclub.com>',
      to: email,
      subject: 'Verify Your Membership Link',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #911b1e; margin: 0;">LKJ Tennis Club</h1>
          </div>
          
          <div style="background-color: #fcf7dc; padding: 30px; border-radius: 8px;">
            <h2 style="color: #911b1e; margin-top: 0;">Link Your Membership</h2>
            <p style="color: #333; line-height: 1.6;">
              Hi ${name},
            </p>
            <p style="color: #333; line-height: 1.6;">
              Someone is trying to link membership <strong>${membershipId}</strong> to their account.
            </p>
            <p style="color: #333; line-height: 1.6;">
              If this was you, please use the verification code below:
            </p>
            
            <div style="text-align: center; margin: 30px 0; background-color: #fff; padding: 20px; border-radius: 8px; border: 2px dashed #911b1e;">
              <div style="font-size: 36px; font-weight: bold; color: #911b1e; letter-spacing: 8px; font-family: monospace;">
                ${verificationCode}
              </div>
            </div>
            
            <p style="color: #666; font-size: 14px; line-height: 1.6;">
              Enter this code on the verification page to complete the linking process.
            </p>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              This code will expire in 10 minutes.
            </p>
            <p style="color: #666; font-size: 14px;">
              If you didn't request this, please ignore this email or contact us if you have concerns.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
            <p>© ${new Date().getFullYear()} LKJ Tennis Club. All rights reserved.</p>
          </div>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to send membership verification email:', error);
    return { success: false, error };
  }
}

export async function sendOrderConfirmationEmail(
  email: string,
  orderNumber: string,
  customerName: string,
  items: Array<{ name: string; quantity: number; price: number; size?: string; color?: string }>,
  subtotal: number,
  shipping: number,
  total: number,
  shippingAddress: string,
  shippingCity: string,
  shippingState: string
) {
  try {
    console.log(`Sending order confirmation email to ${email} for order ${orderNumber}`);

    const itemsHtml = items.map(item => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e5e5;">
          <div style="color: #333; font-weight: 500;">${item.name}</div>
          ${item.size ? `<div style="color: #666; font-size: 12px;">Size: ${item.size}</div>` : ''}
          ${item.color ? `<div style="color: #666; font-size: 12px;">Color: ${item.color}</div>` : ''}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: center; color: #666;">
          ${item.quantity}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e5e5; text-align: right; color: #333; font-weight: 500;">
          ₦${item.price.toLocaleString()}
        </td>
      </tr>
    `).join('');

    const result = await resend.emails.send({
      from: 'LKJ Tennis Club <hello@lkjtennisclub.com>',
      to: email,
      subject: `Order Confirmation - ${orderNumber}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #911b1e; margin: 0;">LKJ Tennis Club</h1>
          </div>
          
          <div style="background-color: #fcf7dc; padding: 30px; border-radius: 8px;">
            <h2 style="color: #911b1e; margin-top: 0;">Order Confirmed!</h2>
            <p style="color: #333; line-height: 1.6;">
              Hi ${customerName},
            </p>
            <p style="color: #333; line-height: 1.6;">
              Thank you for your order! We've received your order and will process it shortly.
            </p>
            
            <div style="background-color: #fff; padding: 15px; border-radius: 8px; margin: 20px 0; border: 2px solid #911b1e;">
              <div style="text-align: center;">
                <div style="color: #666; font-size: 12px; margin-bottom: 5px;">Order Number</div>
                <div style="color: #911b1e; font-size: 20px; font-weight: bold; font-family: monospace;">
                  ${orderNumber}
                </div>
              </div>
            </div>

            <h3 style="color: #911b1e; margin-top: 30px; margin-bottom: 15px;">Order Details</h3>
            <table style="width: 100%; border-collapse: collapse; background-color: #fff; border-radius: 8px; overflow: hidden;">
              <thead>
                <tr style="background-color: #911b1e; color: #fcf7dc;">
                  <th style="padding: 12px; text-align: left;">Item</th>
                  <th style="padding: 12px; text-align: center;">Qty</th>
                  <th style="padding: 12px; text-align: right;">Price</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
                <tr>
                  <td colspan="2" style="padding: 12px; text-align: right; color: #666;">Subtotal:</td>
                  <td style="padding: 12px; text-align: right; color: #333;">₦${subtotal.toLocaleString()}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 12px; text-align: right; color: #666;">Shipping:</td>
                  <td style="padding: 12px; text-align: right; color: #333;">₦${shipping.toLocaleString()}</td>
                </tr>
                <tr style="background-color: #fcf7dc;">
                  <td colspan="2" style="padding: 12px; text-align: right; color: #911b1e; font-weight: bold;">Total:</td>
                  <td style="padding: 12px; text-align: right; color: #911b1e; font-weight: bold; font-size: 18px;">₦${total.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>

            <h3 style="color: #911b1e; margin-top: 30px; margin-bottom: 15px;">Shipping Address</h3>
            <div style="background-color: #fff; padding: 15px; border-radius: 8px;">
              <p style="color: #333; margin: 0; line-height: 1.6;">
                ${shippingAddress}<br>
                ${shippingCity}, ${shippingState}
              </p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXTAUTH_URL}/shop/order-confirmation/${orderNumber}" 
                 style="display: inline-block; background-color: #911b1e; color: #fcf7dc; 
                        padding: 14px 32px; text-decoration: none; border-radius: 4px; 
                        font-weight: bold; font-size: 16px;">
                View Order Details
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              We'll send you another email when your order ships.
            </p>
            <p style="color: #666; font-size: 14px;">
              If you have any questions, feel free to contact us.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
            <p>© ${new Date().getFullYear()} LKJ Tennis Club. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log('Order confirmation email sent successfully:', result);
    return { success: true, result };
  } catch (error) {
    console.error('Failed to send order confirmation email:', error);
    return { success: false, error };
  }
}
