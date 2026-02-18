/**
 * @swagger
 * components:
 *   schemas:
 *     Data Employee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         user_id:
 *           type: string
 *         company_id:
 *           type: string
 *         employee_code:
 *           type: string
 *           example: EMP-001
 *         phone:
 *           type: string
 *           example: "08123456789"
 *         identity_number:
 *           type: string
 *           example: "3201010101010001"
 *         place_of_birth:
 *           type: string
 *           example: Bandung
 *         date_of_birth:
 *           type: string
 *           format: date
 *           example: 1999-05-21
 *         department:
 *           type: string
 *           example: "Finance"
 *         working_type:
 *           type: string
 *           enum: [PROBATION, PERMANENT, CONTRACT]
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, RESIGNED]
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 *
 *     CreateEmployeeRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - place_of_birth
 *         - date_of_birth
 *       properties:
 *         name:
 *           type: string
 *           example: Dimas Setiawan
 *         email:
 *           type: string
 *           example: dimas@gmail.com
 *         employee_code:
 *           type: string
 *           example: EMP-001
 *         phone:
 *           type: string
 *         identity_number:
 *           type: string
 *         place_of_birth:
 *           type: string
 *         date_of_birth:
 *           type: string
 *           format: date
 *         department:
 *           type: string
 *           example: IT
 *         working_type:
 *           type: string
 *           enum: [PROBATION, PERMANENT, CONTRACT]
 *
 *     UpdateEmployeeRequest:
 *       type: object
 *       properties:
 *         phone:
 *           type: string
 *         department:
 *           type: string
 *         working_type:
 *           type: string
 *           enum: [PROBATION, PERMANENT, CONTRACT]
 *         status:
 *           type: string
 *           enum: [ACTIVE, INACTIVE, RESIGNED]
 */
export {};
