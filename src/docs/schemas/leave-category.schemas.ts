/**
 * @swagger
 * components:
 *   schemas:
 *     LeaveCategory:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         company_id:
 *           type: string
 *         name:
 *           type: string
 *           example: Annual Leave
 *         description:
 *           type: string
 *           nullable: true
 *           example: Annual paid leave
 *         quota_days:
 *           type: number
 *           example: 12
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     CreateLeaveCategoryRequest:
 *       type: object
 *       required:
 *         - name
 *         - quota_days
 *       properties:
 *         name:
 *           type: string
 *           example: Annual Leave
 *         description:
 *           type: string
 *           example: Annual paid leave
 *         quota_days:
 *           type: number
 *           example: 12
 *
 *     UpdateLeaveCategoryRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         quota_days:
 *           type: number
 */
export {};
