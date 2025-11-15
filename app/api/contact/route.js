import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message || !email.includes("@")) {
      return new Response(
        JSON.stringify({ message: "Name, email, and message are required." }),
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.APP_USER,
        pass: process.env.APP_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.APP_USER,
      replyTo: email,
      subject: "New Message from Portfolio Contact Form",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    return Response.json({ message: "Message sent!" });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to send message" }),
      { status: 500 }
    );
  }
}
