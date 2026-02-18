/**
 * @swagger
 * /admin/resignation-request:
 *   get:
 *     summary: List resignation requests
 *     tags: [Admin - Resignation Request]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDING, APPROVED, REJECTED]
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: List of resignation requests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Resignation requests fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ResignationRequest'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 42
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total_pages:
 *                       type: integer
 *                       example: 5
 *       400:
 *         description: Failed to fetch resignation requests
 *
 * /admin/resignation-request/{id}/approve:
 *   post:
 *     summary: Approve resignation request
 *     tags: [Admin - Resignation Request]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resignation approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResignationRequestResponse'
 *       400:
 *         description: Failed to approve resignation request
 *
 * /admin/resignation-request/{id}/reject:
 *   post:
 *     summary: Reject resignation request
 *     tags: [Admin - Resignation Request]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resignation rejected
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResignationRequestResponse'
 *       400:
 *         description: Failed to reject resignation request
 */
export {};
