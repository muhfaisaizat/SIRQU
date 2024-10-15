const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { Op } = require("sequelize");

const JWT_SECRET = process.env.JWT_SECRET;

// Fungsi register
exports.register = async (req, res) => {
  console.log("Register function called"); // Tambahkan log ini
  const { name, email, password, role } = req.body;

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
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: { ...user.dataValues, password: undefined },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Fungsi login
exports.login = async (req, res) => {
  const { email, password } = req.body;

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
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      user: { ...user.dataValues, password: undefined },
    }); // Hapus password dari response
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.forgotPassword = async (req, res) => {
  console.log("Forgot password request received:", req.body);
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a 4-digit reset token
    const resetToken = Math.floor(1000 + Math.random() * 9000).toString(); // Hasilkan angka acak 4 digit
    user.ResetPasswordToken = resetToken;
    user.ResetTokenExpires = Date.now() + 3 * 60 * 1000; // Token berlaku selama 3 menit
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
      from: process.env.EMAIL_USER,
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

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      where: {
        ResetPasswordToken: token,
        ResetTokenExpires: { [Op.gt]: Date.now() }, // Memeriksa apakah token masih berlaku
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token." });
    }

    user.password = await argon2.hash(newPassword); // Ganti password baru
    user.ResetPasswordToken = null; // Reset token
    user.ResetTokenExpires = null; // Reset expiry
    await user.save();

    res.status(200).json({ message: "Password has been reset." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
