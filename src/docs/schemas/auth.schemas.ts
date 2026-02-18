/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: admin@company.com
 *         password:
 *           type: string
 *           example: secret123
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         access_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         token_type:
 *           type: string
 *           example: Bearer
 *         expires_in:
 *           type: string
 *           example: 1d
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *             email:
 *               type: string
 *             name:
 *               type: string
 *             role:
 *               type: string
 *               enum: [SUPERADMIN, ADMIN, EMPLOYEE]
 *             company_id:
 *               type: string
 *               nullable: true
 *
 *     AuthMeResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         role:
 *           type: string
 *         company_id:
 *           type: string
 *           nullable: true
 */
export {};
