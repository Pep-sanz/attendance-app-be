/**
 * @swagger
 * components:
 *   schemas:
 *     Shift:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         company_id:
 *           type: string
 *         name:
 *           type: string
 *           example: Morning Shift
 *         shift_type:
 *           type: string
 *           enum: [FIXED, FLEXIBLE]
 *         start_time:
 *           type: string
 *           example: "09:00"
 *         end_time:
 *           type: string
 *           example: "17:00"
 *         break_start:
 *           type: string
 *           nullable: true
 *           example: "12:00"
 *         break_end:
 *           type: string
 *           nullable: true
 *           example: "13:00"
 *         late_tolerance:
 *           type: number
 *           example: 10
 *         is_active:
 *           type: boolean
 *           example: true
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 *
 *     CreateShiftRequest:
 *       type: object
 *       required:
 *         - name
 *         - start_time
 *         - end_time
 *       properties:
 *         name:
 *           type: string
 *           example: Morning Shift
 *         shift_type:
 *           type: string
 *           enum: [FIXED, FLEXIBLE]
 *         start_time:
 *           type: string
 *           example: "09:00"
 *         end_time:
 *           type: string
 *           example: "17:00"
 *         break_start:
 *           type: string
 *           nullable: true
 *           example: "12:00"
 *         break_end:
 *           type: string
 *           nullable: true
 *           example: "13:00"
 *         late_tolerance:
 *           type: number
 *           example: 10
 *
 *     UpdateShiftRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         shift_type:
 *           type: string
 *           enum: [FIXED, FLEXIBLE]
 *         start_time:
 *           type: string
 *         end_time:
 *           type: string
 *         break_start:
 *           type: string
 *           nullable: true
 *         break_end:
 *           type: string
 *           nullable: true
 *         late_tolerance:
 *           type: number
 *
 *     AssignShiftRequest:
 *       type: object
 *       required:
 *         - employee_id
 *         - shift_id
 *       properties:
 *         employee_id:
 *           type: string
 *         shift_id:
 *           type: string
 */
export {};
