// src/app/api/sendMarketingEmail/route.tsx
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import db from "@/db/db";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { Company, Name, Email, Phone, Budget, Notes } = await req.json();

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"1Cato Brand Marketing" <${process.env.SMTP_USER}>`,
      to: process.env.CATERING_EMAIL,
      subject: "New Brand Marketing Collaboration Request",
      html: `
        <h2>New Brand Marketing Collaboration Request</h2>
        <p><b>Company:</b> ${Company}</p>
        <p><b>Contact:</b> ${Name}</p>
        <p><b>Email:</b> ${Email}</p>
        <p><b>Phone:</b> ${Phone}</p>
        <p><b>Budget / Exposure:</b> ${Budget || "Not specified"}</p>
        <p><b>Goals / Notes:</b> ${Notes || "None"}</p>
      `,
    });

    await db.marketingLead.create({
      data: {
        company: Company,
        name: Name,
        email: Email,
        phone: Phone,
        budget: Budget || null,
        notes: Notes || null,
      },
    });

    revalidatePath("/admin/marketing");
    revalidatePath("/admin");

    return NextResponse.json({ message: "Request sent successfully" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Failed to send request" }, { status: 500 });
  }
}
