/**
 * @swagger
 * components:
 *   schemas:
 *     Attendance:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         user_id:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *           example: 2024-05-01
 *         check_in:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         check_out:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         status:
 *           type: string
 *           enum: [PRESENT, LATE, ABSENT]
 *         work_minutes:
 *           type: number
 *           nullable: true
 *         distance_meter:
 *           type: number
 *           nullable: true
 *         check_in_lat:
 *           type: number
 *           nullable: true
 *         check_in_lng:
 *           type: number
 *           nullable: true
 *         check_out_lat:
 *           type: number
 *           nullable: true
 *         check_out_lng:
 *           type: number
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *
 *     CreateAttendanceRequest:
 *       type: object
 *       required:
 *         - user_id
 *         - date
 *       properties:
 *         user_id:
 *           type: string
 *         date:
 *           type: string
 *           format: date
 *           example: 2024-05-01
 *         check_in:
 *           type: string
 *           format: date-time
 *         check_out:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [PRESENT, LATE, ABSENT]
 *         work_minutes:
 *           type: number
 *         distance_meter:
 *           type: number
 *         check_in_lat:
 *           type: number
 *         check_in_lng:
 *           type: number
 *         check_out_lat:
 *           type: number
 *         check_out_lng:
 *           type: number
 *
 *     UpdateAttendanceRequest:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *         check_in:
 *           type: string
 *           format: date-time
 *         check_out:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *           enum: [PRESENT, LATE, ABSENT]
 *         work_minutes:
 *           type: number
 *         distance_meter:
 *           type: number
 *         check_in_lat:
 *           type: number
 *         check_in_lng:
 *           type: number
 *         check_out_lat:
 *           type: number
 *         check_out_lng:
 *           type: number
 *
 *     CheckInRequest:
 *       type: object
 *       required:
 *         - lat
 *         - lng
 *       properties:
 *         lat:
 *           type: number
 *           example: -6.21462
 *         lng:
 *           type: number
 *           example: 106.84513
 *
 *     CheckOutRequest:
 *       type: object
 *       properties:
 *         lat:
 *           type: number
 *           example: -6.21462
 *         lng:
 *           type: number
 *           example: 106.84513
 *
 *     AttendanceResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/Attendance'
 *
 *     AttendanceListResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Attendance'
 *
 *     AttendanceHistoryResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Attendance history fetched
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Attendance'
 */
export {};
