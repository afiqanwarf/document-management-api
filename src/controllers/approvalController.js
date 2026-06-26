const db = require("../config/db");

exports.approveDocument = (req,res)=>{

    db.query(
        `
        INSERT INTO approvals
        (
            document_id,
            reviewer_id,
            status,
            note
        )

        VALUES(?,?,?,?)
        `,
        [
            req.params.id,
            req.user.id,
            req.body.status,
            req.body.note
        ],

        (err)=>{

            if(err)
                return res.status(500).json(err);

            db.query(
                `
                UPDATE documents
                SET status=?
                WHERE id=?
                `,
                [
                    req.body.status,
                    req.params.id
                ]
            );

            res.json({
                message: "Approval berhasil",
                document_id: req.params.id,
                status: req.body.status,
                note: req.body.note
            });

        }

    );

};