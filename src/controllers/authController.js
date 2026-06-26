require("dotenv").config();

const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        `
        INSERT INTO users
        (
            name,
            email,
            password,
            role
        )

        VALUES (?,?,?,?)
        `,
        [
            name,
            email,
            hashedPassword,
            role || "user"
        ],

        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Register berhasil"
            });

        }

    );

};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (results.length === 0)
        return res.status(404).json({ message: "User tidak ditemukan" });

      const user = results[0];
      const match = await bcrypt.compare(password, user.password);

      if (!match)
        return res.status(401).json({ message: "Password salah" });

            const token = jwt.sign(
          {
              id: user.id,
              role: user.role
          },
          process.env.JWT_SECRET,
          {
              expiresIn: "1h"
          }
      );

      res.json({ token });
    }
  );
};

exports.profile = (req, res) => {
  res.json({ user: req.user });
};