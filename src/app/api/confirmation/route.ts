import { sendEmail } from "@/app/helper/mailer";
import { db } from "@/app/helper/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { client_id, service_provider_id } = await request.json();

  try {
    const [client] = await db("clients")
      .insert({
        service_booked: "service_booked",
        phone_no: "+975" + Math.floor(Math.random() * 100000000),
        location: "Thimphu",
        user_id: client_id, // user_id is the client_id
      })
      .returning("*");

    const { name: client_name, email: client_email } = await db("users")
      .select("email", "name")
      .where("id", client_id)
      .first();

    const { user_id: service_provider_user_id, full_name: provider_name } =
      await db("service_providers")
        .select("user_id", "full_name")
        .where("id", service_provider_id)
        .first();

    const { email: service_provider_email } = await db("users")
      .select("email")
      .where("id", service_provider_user_id)
      .first();

    const [booking] = await db("bookings")
      .insert({
        client_id: client.id,
        provider_id: service_provider_id,
        booked_time: new Date(),
      })
      .returning("id");

    await sendEmail({
      email: client_email,
      subject: "Booking Confirmed!",
      message: `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap; word-wrap: break-word;">
Dear ${client_name},

Your booking is confirmed!

Details:
ID: ${booking.id}
Date & Time: ${new Date().toLocaleString()}
location: Thimphu

Questions? Reply or email support@betta.com.

Thanks for choosing Betta Service!

Betta Team</pre>`,
    });

    await sendEmail({
      email: service_provider_email,
      subject: "You have a new booking!",
      message: `<pre style="font-family: Arial, sans-serif; white-space: pre-wrap; word-wrap: break-word;">
Dear ${provider_name},

You have a new booking!

Customer Name: ${client_name}
Booking ID: ${booking.id}
Date & Time: ${new Date().toLocaleString()}
location: Thimphu
     
Please prepare accordingly.

If you have any questions, contact support@betta.com.

Thanks for being part of Betta Service!

Best regards,
Betta Team</pre>`,
    });
    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (error: any) {
    console.log(error);
    return new Response("Error", { status: 500 });
  }
}
