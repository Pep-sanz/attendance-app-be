/**
 * @swagger
 * components:
 *   schemas:
 *     Division:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         company_id:
 *           type: string
 *         name:
 *           type: string
 *           example: Engineering
 *         description:
 *           type: string
 *           nullable: true
 *           example: Product engineering team
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     CreateDivisionRequest:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           example: Engineering
 *         description:
 *           type: string
 *           nullable: true
 *           example: Product engineering team
 *
 *     UpdateDivisionRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Engineering
 *         description:
 *           type: string
 *           nullable: true
 *           example: Product engineering team
 */
export {};
