const db = require("../config/db");

exports.createVersion = (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            message: "File wajib diupload"
        });
    }

    const document_id = req.params.id;

    db.query(
        "SELECT current_version FROM documents WHERE id=?",
        [document_id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            
            if (result.length === 0) {
                return res.status(404).json({
                    message: "Dokumen tidak ditemukan"
                });
            }

            const newVersion = result[0].current_version + 1;

            db.query(
                `
                INSERT INTO document_versions
                (
                    document_id,
                    version_number,
                    file_name,
                    file_path,
                    description,
                    created_by
                )
                VALUES (?,?,?,?,?,?)
                `,
                [
                    document_id,
                    newVersion,
                    req.file.filename,
                    req.file.path,
                    req.body.description,
                    req.user.id
                ],

                (err) => {

                    if (err)
                        return res.status(500).json(err);

                    db.query(
                        `
                        UPDATE documents
                        SET current_version=?
                        WHERE id=?
                        `,
                        [newVersion, document_id],
                        (err) => {

                            if (err)
                                return res.status(500).json(err);

                            res.json({
                                message: "Versi baru berhasil dibuat",
                                version: newVersion
                            });

                        }
                    );

                }

            );

        }
    );

};

exports.getVersions = (req, res) => {

    db.query(
        `
        SELECT *
        FROM document_versions
        WHERE document_id = ?
        ORDER BY version_number
        `,
        [req.params.id],

        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);

        }

    );

};