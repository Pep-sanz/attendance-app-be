/**
 * @swagger
 *
 * /admin/company/me:
 *   get:
 *     summary: Get my company (Admin)
 *     tags: [Admin - Company]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Company detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       403:
 *         description: Forbidden
 *
 * /admin/company/{id}:
 *   get:
 *     summary: Get company detail(admin)
 *     tags: [Admin - Company]
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
 *         description: Company detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found
 *   put:
 *     summary: Update company
 *     tags: [Admin - Company]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCompanyRequest'
 *     responses:
 *       200:
 *         description: Company updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 */
export {};
