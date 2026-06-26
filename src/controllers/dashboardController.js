const db = require("../config/db");

exports.getDashboard = (req, res) => {

    const role = req.user.role;

    
    if (role === "admin") {

        db.query(
            `
            SELECT
                (SELECT COUNT(*) FROM documents) AS total_documents,

                (SELECT COUNT(*) FROM documents 
                WHERE status = 'draft') AS draft,

                (SELECT COUNT(*) FROM documents 
                WHERE status = 'revision') AS revision,

                (SELECT COUNT(*) FROM documents 
                WHERE status = 'approved') AS approved,

                (SELECT COUNT(*) FROM documents 
                WHERE status = 'rejected') AS rejected,

                (SELECT COUNT(*) FROM documents 
                WHERE status = 'archived') AS archived,

                (SELECT COUNT(*) FROM users) AS total_users,

                (SELECT COUNT(*) FROM categories) AS total_categories,

                (SELECT COUNT(*) FROM document_versions) AS total_versions
            `,
            (err, result) => {

                if (err)
                    return res.status(500).json(err);

                res.json({
                    role: "admin",
                    dashboard: result[0]
                });

            }
        );

    }

    
    else if (role === "user") {

    db.query(
        `
        SELECT
            COUNT(*) AS total_documents,

            COALESCE(SUM(status = 'draft'), 0) AS draft,

            COALESCE(SUM(status = 'revision'), 0) AS revision,

            COALESCE(SUM(status = 'approved'), 0) AS approved,

            COALESCE(SUM(status = 'rejected'), 0) AS rejected

        FROM documents

        WHERE user_id = ?
        `,
        [req.user.id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                role: "user",
                dashboard: result[0]
            });

        }
    );

}

    else if (role === "reviewer") {

        db.query(
            `
            SELECT
                COUNT(*) AS total_review,

                SUM(status = 'approved') AS approved,

                SUM(status = 'rejected') AS rejected

            FROM approvals

            WHERE reviewer_id = ?
            `,
            [req.user.id],
            (err, result) => {

                if (err)
                    return res.status(500).json(err);

                res.json({
                    role: "reviewer",
                    dashboard: result[0]
                });

            }
        );

    }

    else {

        res.status(403).json({
            message: "Role tidak dikenali"
        });

    }

};