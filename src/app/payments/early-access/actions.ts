'use server'

import nodemailer from 'nodemailer'

export async function sendEmail(email: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER, // e.g. your Gmail address
      pass: process.env.SMTP_PASS, // app-specific password
    },
  })

  const mailOptions = {
    from: '"Truefolio Team" <no-reply@truefolio.cv>',
    to: email,
    subject: '🎉 You’re officially on the Truefolio waitlist!',
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #3b82f6;">Welcome to Truefolio 👋</h2>
        <p>Thanks for joining the waitlist — you’re now locked in for early access at <strong>$6/month for life</strong>.</p>

        <p>Stay connected:</p>
        <ul style="list-style: none; padding: 0;">
          <li>🐦 <a href="https://x.com/codewithkin" style="color: #3b82f6;">DM me on X</a></li>
          <li>📞 <a href="https://wa.link/l8jgyg" style="color: #3b82f6;">Message me on WhatsApp</a></li>
          <li>📅 <a href="https://calendly.com/codewithkin/truefolio-feedback-call" style="color: #3b82f6;">Schedule a feedback call</a></li>
        </ul>

        <p style="margin-top: 20px;">Looking forward to building something amazing with you!</p>
        <p>– Kin @ Truefolio</p>
      </div>
    `,
  }

  await transporter.sendMail(mailOptions)
}
