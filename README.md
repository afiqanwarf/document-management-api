document-management-system/
│
├── src/
│   ├── config/
│   │   ├── db.js
│   │   └── jwt.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   ├── categoryController.js
│   │   ├── documentController.js
│   │   ├── versionController.js
│   │   ├── revisionController.js
│   │   ├── commentController.js
│   │   ├── approvalController.js
│   │   ├── historyController.js
│   │   └── dashboardController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   │   └── uploadMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── documentRoutes.js
│   │   ├── versionRoutes.js
│   │   ├── revisionRoutes.js
│   │   ├── commentRoutes.js
│   │   ├── approvalRoutes.js
│   │   ├── historyRoutes.js
│   │   └── dashboardRoutes.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── documentService.js
│   │   ├── versionService.js
│   │   ├── revisionService.js
│   │   └── approvalService.js
│   │
│   └── utils/
│       ├── response.js
│       └── helper.js
│
├── uploads/
├── .env
├── package.json
├── server.js
└── README.md

Run: 