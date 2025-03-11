export const generateEmailTemplate = ({ userEmail, courseName, lecture, orderId, reminderDate }) => `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 0; background-color: #f4f7fa;">
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
              <td style="background-color: #4a90e2; text-align: center;">
                  <p style="font-size: 54px; line-height: 54px; font-weight: 800;">Course Reminder</p>
              </td>
          </tr>
          <tr>
              <td style="padding: 40px 30px;">                
                  <p style="font-size: 16px; margin-bottom: 25px;">Hello <strong style="color: #4a90e2;">${userEmail}</strong>,</p>
                  
                  <p style="font-size: 16px; margin-bottom: 25px;">Your lecture <strong>${lecture}</strong> for the course <strong>${courseName}</strong> is scheduled on <strong style="color: #4a90e2;">${reminderDate}</strong>.</p>
                  
                  <p style="font-size: 16px; margin-bottom: 25px;">Your order ID for this course: <strong>${orderId}</strong>.</p>
                  
                  <p style="font-size: 16px; margin-top: 30px;">Looking forward to seeing you there!</p>
                  
                  <p style="font-size: 16px; margin-top: 30px;">
                      Best regards,<br>
                      <strong>The Course Team</strong>
                  </p>
              </td>
          </tr>
          <tr>
              <td style="background-color: #f0f7ff; padding: 20px; text-align: center; font-size: 14px;">
                  <p style="margin: 0 0 10px;">
                      Course Platform Inc. | 123 Education St, Learning City, LC 45678
                  </p>
                  <p style="margin: 0;">
                      <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Unsubscribe</a> | 
                      <a href="#" style="color: #4a90e2; text-decoration: none; margin: 0 10px;">Support</a>
                  </p>
              </td>
          </tr>
      </table>
  </div>
`;

export const emailTemplates = [
    {
        label: "7 days before reminder",
        generateSubject: (data) => `📅 Reminder: Your Lecture ${data.lecture} is in 7 Days!`,
        generateBody: (data) => generateEmailTemplate({ ...data }),
    },
    {
        label: "5 days before reminder",
        generateSubject: (data) => `⏳ Your Lecture ${data.lecture} is in 5 Days!`,
        generateBody: (data) => generateEmailTemplate({ ...data }),
    },
    {
        label: "2 days before reminder",
        generateSubject: (data) => `🚀 Only 2 Days Left! Lecture ${data.lecture} Reminder`,
        generateBody: (data) => generateEmailTemplate({ ...data }),
    },
    {
        label: "1 day before reminder",
        generateSubject: (data) => `⚡ Final Reminder: Your Lecture ${data.lecture} is Tomorrow!`,
        generateBody: (data) => generateEmailTemplate({ ...data }),
    },
];