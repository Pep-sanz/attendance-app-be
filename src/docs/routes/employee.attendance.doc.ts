/**
 * @swagger
 * /employee/attendance/check-in:
 *   post:
 *     summary: Check-in (employee)
 *     tags: [Employee - Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckInRequest'
 *     responses:
 *       200:
 *         description: Check-in successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceResponse'
 *       400:
 *         description: Validation error
 *
 * /employee/attendance/check-out:
 *   post:
 *     summary: Check-out (employee)
 *     tags: [Employee - Attendance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckOutRequest'
 *     responses:
 *       200:
 *         description: Check-out successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceResponse'
 *       400:
 *         description: Validation error
 *
 * /employee/attendance/history:
 *   get:
 *     summary: Attendance history (employee)
 *     tags: [Employee - Attendance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *         example: 2024-05-01
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *         example: 2024-05-31
 *     responses:
 *       200:
 *         description: Attendance history fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AttendanceHistoryResponse'
 */
export {};
