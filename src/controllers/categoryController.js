const db = require("../config/db");

exports.createCategory = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Nama kategori wajib diisi" });
  }

  db.query(
    "INSERT INTO categories (name) VALUES (?)",
    [name],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Kategori berhasil dibuat" });
    }
  );
};

exports.getCategories = (req, res) => {
  db.query("SELECT * FROM categories", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.updateCategory = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Nama kategori wajib diisi" });
  }

  db.query(
    "UPDATE categories SET name = ? WHERE id = ?",
    [name, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Kategori berhasil diupdate" });
    }
  );
};

exports.deleteCategory = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM categories WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Kategori berhasil dihapus" });
  });
};