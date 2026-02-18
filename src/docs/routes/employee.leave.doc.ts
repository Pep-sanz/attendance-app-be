/**
 * @swagger
 * /employee/leave/categories:
 *   get:
 *     summary: List leave categories
 *     tags: [Employee - Leave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of leave categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LeaveCategory'
 *       500:
 *         description: Failed to fetch categories
 *
 * /employee/leave/request:
 *   post:
 *     summary: Request leave
 *     tags: [Employee - Leave]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLeaveRequest'
 *     responses:
 *       201:
 *         description: Leave request submitted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeaveRequestResponse'
 *       400:
 *         description: Validation error
 *
 * /employee/leave/request/me:
 *   get:
 *     summary: List my leave requests
 *     tags: [Employee - Leave]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of leave requests
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeaveRequestListResponse'
 *       500:
 *         description: Failed to fetch leave requests
 */
export {};
