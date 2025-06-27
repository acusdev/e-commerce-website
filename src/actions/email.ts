import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, text }: { to: string; subject: string; text: string }) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      text: text,
    });
    console.log(data);
    if (error) {
      return {
        success: false,
        message: "Failed to send email. Please try again later.",
      };
    }
    return {
      success: true,
      message: "Email sent successfully!",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    };
  }
}
