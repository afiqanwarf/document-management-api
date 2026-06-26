const db = require("../config/db");

exports.createDocument = (req,res)=>{

    const {
        title,
        description,
        category_id
    } = req.body;

    const file_name = req.file.filename;

    const user_id = req.user.id;

    db.query(
        `INSERT INTO documents
        (title,description,file_name,file_path,category_id,user_id)
        VALUES (?,?,?,?,?,?)`,
        [
            title,
            description,
            file_name,
            req.file.path,
            category_id,
            user_id
        ],

        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json({
                message:"Dokumen berhasil diupload"
            });

        }

    );

}
exports.getDocuments = (req, res) => {
  db.query(
    `SELECT documents.*, categories.name AS category_name, users.name AS uploader_name
     FROM documents
     JOIN categories ON documents.category_id = categories.id
     JOIN users ON documents.user_id = users.id`,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

exports.updateDocument = (req, res) => {
  const { id } = req.params;
  const { title, description, file_name, category_id, status } = req.body;

  if (!title || !category_id) {
    return res.status(400).json({
      message: "Title dan category_id wajib diisi"
    });
  }

  db.query(
    `UPDATE documents 
     SET title = ?, description = ?, file_name = ?, category_id = ?, status = ?
     WHERE id = ?`,
    [title, description || "", file_name || "", category_id, status || "draft", id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Dokumen berhasil diupdate" });
    }
  );
};

exports.deleteDocument = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM documents WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Dokumen berhasil dihapus" });
  });
};

exports.searchDocument=(req,res)=>{

    const keyword=req.query.keyword;

    db.query(
        `
        SELECT *
        FROM documents
        WHERE title LIKE ?
        `,
        [`%${keyword}%`],

        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json(result);

        }
    );

}