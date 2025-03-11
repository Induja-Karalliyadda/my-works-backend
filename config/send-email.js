import dayjs from 'dayjs';
import transporter, { accountEmail } from '../util/nodemailer.js';

export const sendReminderEmail = async ({ userEmail, courseName, lecture, orderId }) => {
   

    const reminderDate = dayjs().format('MMM D, YYYY');

    const subject = `Reminder: Your Lecture ${lecture} is Coming Up!`;
    const message = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4a90e2;">Course Reminder</h2>
          <p>Hello <strong>${userEmail}</strong>,</p>
          <p>Your lecture <strong>${lecture}</strong> for the course <strong>${courseName}</strong> is scheduled on <strong>${reminderDate}</strong>.</p>
          <p>Your order ID: <strong>${orderId}</strong></p>
          <p>Looking forward to seeing you there!</p>
          <p>Best regards,<br><strong>The Course Team</strong></p>
      </div>
    `;

    const mailOption = {
        from: accountEmail,
        to: userEmail,
        subject: subject,
        html: message,
    };

    try {
        const info = await transporter.sendMail(mailOption);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};