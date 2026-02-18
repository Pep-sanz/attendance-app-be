/**
 * @swagger
 * components:
 *   schemas:
 *     ResignationRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         user_id:
 *           type: string
 *         last_working_date:
 *           type: string
 *           format: date
 *           example: 2024-06-30
 *         reason:
 *           type: string
 *           nullable: true
 *           example: Career change
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     CreateResignationRequest:
 *       type: object
 *       required:
 *         - last_working_date
 *       properties:
 *         last_working_date:
 *           type: string
 *           format: date
 *           example: 2024-06-30
 *         reason:
 *           type: string
 *           nullable: true
 *           example: Career change
 *
 *     ResignationRequestResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Resignation approved successfully
 *         data:
 *           $ref: '#/components/schemas/ResignationRequest'
 */
export {};
