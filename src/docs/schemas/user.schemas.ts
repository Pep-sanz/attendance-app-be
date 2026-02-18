/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       required:
 *         - name
 *         - role
 *         - email
 *         - password
 *         - is_active
 *       properties:
 *         name:
 *           type: string
 *           example: Bahlil
 *         email:
 *           type: string
 *           example: admin@company.com
 *         role:
 *           type: enum
 *           example: SUPERADMIN
 *         password:
 *           type: string
 *           example: secret123
 *
 *     CreateUserResponse:
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
