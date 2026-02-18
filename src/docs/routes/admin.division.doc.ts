/**
 * @swagger
 * /admin/division:
 *   post:
 *     summary: Create division
 *     tags: [Admin - Division]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDivisionRequest'
 *     responses:
 *       201:
 *         description: Division created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Division created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Division'
 *       400:
 *         description: Failed to create division
 *
 *   get:
 *     summary: List divisions
 *     tags: [Admin - Division]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         example: Engineering
 *     responses:
 *       200:
 *         description: Division list retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Division list retrieved
 *                 data:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: number
 *                       example: 1
 *                     limit:
 *                       type: number
 *                       example: 10
 *                     total:
 *                       type: number
 *                       example: 42
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Division'
 *       400:
 *         description: Failed to fetch divisions
 *
 * /admin/division/{id}:
 *   get:
 *     summary: Get division detail
 *     tags: [Admin - Division]
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
 *         description: Division detail retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Division detail retrieved
 *                 data:
 *                   $ref: '#/components/schemas/Division'
 *       404:
 *         description: Division not found
 *
 *   put:
 *     summary: Update division
 *     tags: [Admin - Division]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDivisionRequest'
 *     responses:
 *       200:
 *         description: Division updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Division updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Division'
 *       400:
 *         description: Failed to update division
 *
 *   delete:
 *     summary: Delete division
 *     tags: [Admin - Division]
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
 *         description: Division deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Division deleted successfully
 *                 data:
 *                   $ref: '#/components/schemas/Division'
 *       400:
 *         description: Failed to delete division
 */
export {};
