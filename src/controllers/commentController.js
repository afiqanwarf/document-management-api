const db = require("../config/db");

exports.addComment = (req,res)=>{

    const document_id = req.params.id;

    db.query(
        `
        INSERT INTO reviewer_comments
        (
            document_id,
            reviewer_id,
            comment
        )

        VALUES(?,?,?)
        `,
        [
            document_id,
            req.user.id,
            req.body.comment
        ],

        (err)=>{

            if(err)
                return res.status(500).json(err);

            db.query(
                `
                UPDATE documents
                SET status='revision'
                WHERE id=?
                `,
                [document_id]
            );

            res.json({
                message:"Komentar berhasil ditambahkan"
            });

        }

    );

}

exports.getComments = (req,res)=>{

    db.query(
        `
        SELECT
        reviewer_comments.*,
        users.name AS reviewer_name

        FROM reviewer_comments

        JOIN users
        ON users.id=reviewer_comments.reviewer_id

        WHERE document_id=?
        `,
        [req.params.id],

        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json(result);

        }

    );

}