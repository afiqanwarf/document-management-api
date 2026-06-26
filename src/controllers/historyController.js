const db = require("../config/db");

exports.getHistory = (req,res)=>{

    db.query(
        `
        SELECT
        document_history.*,
        users.name

        FROM document_history

        JOIN users
        ON users.id=document_history.performed_by

        WHERE document_id=?

        ORDER BY created_at DESC
        `,
        [req.params.id],

        (err,result)=>{

            if(err)
                return res.status(500).json(err);

            res.json(result);

        }

    );

};