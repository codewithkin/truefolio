import nodemailer from "nodemailer"

export const sendMagicLink = async ({ email, token, url }: { email: string; token: string; url: string }, _request: Request | undefined) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER, 
      pass: process.env.SMTP_PASS,
    },
  })

  const subject = "Your Magic Link to Sign In – Truefolio"
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #F9FAFB; padding: 32px; color: #1D1D1D;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 32px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <h1 style="color: #1D1D1D; font-size: 24px; margin-bottom: 16px;">Welcome back to <span>Truefolio</span> 👋</h1>
        <p style="font-size: 16px; margin-bottom: 24px;">Click the button below to sign in instantly with your magic link.</p>
        <a href="${url}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(to right, #3B82F6, #8B5CF6); color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">Sign in to Truefolio</a>
        <p style="font-size: 14px; margin-top: 24px; color: #6B7280;">This link will expire in 15 minutes. If you didn't request it, you can safely ignore this email.</p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #E5E7EB;" />
        <p style="font-size: 12px; color: #9CA3AF;">Made with 💜 by the Truefolio team</p>
      </div>
    </div>
  `

  await transporter.sendMail({
    from: '"Truefolio" <kinzinzombe07@gmail.com>',
    to: email,
    subject,
    html,
  })
}
