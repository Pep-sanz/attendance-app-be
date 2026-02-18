import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmployeeDefaultPasswordEmail = async ({
  to,
  name,
  password,
}: {
  to: string;
  name: string;
  password: string;
}) => {
  const loginUrl = `${process.env.FRONTEND_URL}/auth/login`;

  await transporter.sendMail({
    from: `"HR System" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Akun Karyawan Anda Telah Dibuat",
    html: `
      <h2>Halo, ${name}</h2>
      <p>Akun karyawan Anda telah dibuat oleh admin perusahaan.</p>
      <p>Berikut adalah informasi login Anda:</p>

      <b>Email:</b> ${to}<br/>
      <b>Password:</b> ${password}<br/><br/>

      <p>Silakan login menggunakan tautan berikut:</p>
      <a href="${loginUrl}">${loginUrl}</a>

      <p>Harap segera mengganti password setelah login pertama.</p>
    `,
  });
};
