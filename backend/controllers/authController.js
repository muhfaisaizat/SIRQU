const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { Op } = require("sequelize");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
const moment = require('moment-timezone');

// Extend dayjs dengan plugin utc dan timezone
dayjs.extend(utc);
dayjs.extend(timezone);

function getAdjustedDate() {
  const currentDate = new Date();
  const timezoneOffsetMillis = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
  return new Date(currentDate.getTime() + timezoneOffsetMillis);
}

const JWT_SECRET = process.env.JWT_SECRET;

// Fungsi register
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Regex untuk memvalidasi password harus huruf kapital di depan dan ada angka di belakang
  const passwordRegex = /^[A-Z].*\d$/;

  // Validasi format password
  if (!passwordRegex.test(password)) {
    console.log("Password tidak valid:", password);
    return res.status(400).json({
      message:
        "Password harus diawali dengan huruf kapital dan diakhiri dengan angka.",
    });
  }

  try {
    // Memeriksa apakah email sudah ada
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password sebelum menyimpan
    const hashedPassword = await argon2.hash(password);

    // Membuat user baru
    const user = await User.create({
      name,
      email,
      password: hashedPassword, // Simpan hashed password
      role,
      status: "Active",
      createdAt: getAdjustedDate(),
      updatedAt: getAdjustedDate(),
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: { ...user.dataValues, password: undefined }, // Jangan return password ke client
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// Fungsi login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Regex untuk memvalidasi password harus huruf kapital di depan dan ada angka di belakang
  const passwordRegex = /^[A-Z].*\d$/;

  // Validasi format password
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password harus diawali dengan huruf kapital dan diakhiri dengan angka.",
    });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Bandingkan password menggunakan argon2
    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Buat token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { ...user.dataValues, password: undefined }, // Hapus password dari response
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Fungsi login token
exports.loginToken = async (req, res) => {
  const { tokenLogin } = req.body;

  try {
    // Cari pengguna berdasarkan tokenLogin
    const user = await User.findOne({
      where: { tokenLogin },
      attributes: ['id','image', 'name', 'email', 'password', 'role','status','ResetPasswordToken','ResetTokenExpires','tokenLogin', 'tokenLoginExpires','createdAt'],
    });

    if (!user) {
      return res.status(404).json({
        message: "Token tidak ditemukan atau sudah tidak berlaku.",
      });
    }

    const currentTime = moment().tz("Asia/Jakarta").format('YYYY-MM-DD HH:mm:ss');

    // Jika tokenLoginExpires sudah kadaluwarsa
    if (moment(user.tokenLoginExpires).isBefore(currentTime)) {
      // Set tokenLogin dan tokenLoginExpires menjadi null jika sudah kadaluarsa
      await User.update(
        { tokenLogin: null, tokenLoginExpires: null },
        { where: { id: user.id } }
      );

      return res.status(400).json({
        message: "Token telah kadaluwarsa. Harap generate token baru.",
      });
    }

    // Buat token JWT baru untuk login
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1d" } // JWT token valid untuk 1 hari
    );

    return res.status(200).json({
      message: "Login berhasil.",
      token,
      user,
    });
  } catch (error) {
    console.error("Error during token login:", error);
    return res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

// Fungsi Forgot Password
exports.forgotPassword = async (req, res) => {
  console.log("Forgot password request received:", req.body);
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a 4-digit reset token
    const resetToken = Math.floor(100000 + Math.random() * 900000).toString(); // kode 6 digit
    user.ResetPasswordToken = resetToken;
    const adjustedDate = getAdjustedDate();
    user.ResetTokenExpires = new Date(adjustedDate.getTime() + 3 * 60 * 1000); // Token berlaku selama 3 menit
    await user.save();

    // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // GMAIL user
        pass: process.env.EMAIL_PASS, // GMAIL password
      },
    });

    // const resetUrl = `http://localhost:5000/api/auth/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      from: `"SIRQU" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset",
      html: `<p>You requested a password reset. Your reset token is: <strong style="font-size: 24px;">${resetToken}</strong>. It is valid for 3 minutes.</p>`,
    });

    res.status(200).json({ message: "Reset link sent to email." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
// Fungsi Reset Password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  // Regex untuk memvalidasi password
  const passwordRegex = /^[A-Z].*\d$/;

  if (!passwordRegex.test(newPassword)) {
    return res.status(400).json({
      message: "Password harus diawali dengan huruf kapital dan diakhiri dengan angka.",
    });
  }

  try {
    const adjustedDate = getAdjustedDate();

    const user = await User.findOne({
      where: {
        ResetPasswordToken: token,
        ResetTokenExpires: { [Op.gt]: adjustedDate }, // Memeriksa apakah token masih berlaku
      },
    });

    if (user) {
      console.log("ResetTokenExpires:", user.ResetTokenExpires);
      console.log("Adjusted Date:", adjustedDate);
    }

    if (!user) {
      console.log("User tidak ditemukan atau token kadaluarsa.");
      return res.status(400).json({ message: "Invalid or expired token." });
    } else {
      console.log("User ditemukan:", user);
    }

    const hashedPassword = await argon2.hash(newPassword);

    await User.update(
      {
        password: hashedPassword,
        ResetPasswordToken: null,
        ResetTokenExpires: null,
        updatedAt: adjustedDate,
      },
      {
        where: { id: user.id },
      }
    );

    res.status(200).json({ message: "Password berhasil direset." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};


