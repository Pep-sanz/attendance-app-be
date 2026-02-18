/**
 * @swagger
 * /employee/resignation-request:
 *   post:
 *     summary: Submit resignation request
 *     tags: [Employee - Resignation Request]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateResignationRequest'
 *     responses:
 *       200:
 *         description: Resignation request submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResignationRequestResponse'
 *       400:
 *         description: Failed to submit resignation request
 *
 *   get:
 *     summary: Get my resignation request
 *     tags: [Employee - Resignation Request]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resignation request fetched
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResignationRequestResponse'
 *       400:
 *         description: Failed to fetch resignation request
 */
export {};
