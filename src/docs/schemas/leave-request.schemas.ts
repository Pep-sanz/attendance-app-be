/**
 * @swagger
 * components:
 *   schemas:
 *     LeaveRequest:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         user_id:
 *           type: string
 *         category_id:
 *           type: string
 *         start_date:
 *           type: string
 *           format: date
 *           example: 2024-06-01
 *         end_date:
 *           type: string
 *           format: date
 *           example: 2024-06-03
 *         reason:
 *           type: string
 *           nullable: true
 *           example: Family event
 *         status:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *         approved_by:
 *           type: string
 *           nullable: true
 *         approved_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *         category:
 *           $ref: '#/components/schemas/LeaveCategory'
 *
 *     CreateLeaveRequest:
 *       type: object
 *       required:
 *         - category_id
 *         - start_date
 *         - end_date
 *       properties:
 *         category_id:
 *           type: string
 *         start_date:
 *           type: string
 *           format: date
 *           example: 2024-06-01
 *         end_date:
 *           type: string
 *           format: date
 *           example: 2024-06-03
 *         reason:
 *           type: string
 *           example: Family event
 *
 *     LeaveRequestResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Leave request submitted
 *         data:
 *           $ref: '#/components/schemas/LeaveRequest'
 *
 *     LeaveRequestListResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/LeaveRequest'
 *
 *     RejectLeaveRequest:
 *       type: object
 *       properties:
 *         reason:
 *           type: string
 *           example: Not enough coverage for requested dates
 *
 *     EmployeeLeaveBalance:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         employee_id:
 *           type: string
 *         category_id:
 *           type: string
 *         remaining_days:
 *           type: number
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */
export {};
