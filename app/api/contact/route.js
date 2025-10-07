export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "All fields are required" }), { status: 400 });
    }

    // Here you can send email via Nodemailer, SendGrid, or store in DB
    console.log("New contact message:", { name, email, message });

    return new Response(JSON.stringify({ message: "Message sent successfully!" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
