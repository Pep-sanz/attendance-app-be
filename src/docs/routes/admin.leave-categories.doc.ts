/**
 * @swagger
 * /admin/leave-categories:
 *   post:
 *     summary: Create leave category
 *     tags: [Admin - Leave Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateLeaveCategoryRequest'
 *     responses:
 *       201:
 *         description: Leave category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeaveCategory'
 *       500:
 *         description: Failed to create leave category
 *
 *   get:
 *     summary: List leave categories
 *     tags: [Admin - Leave Category]
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
 * /admin/leave-categories/{id}:
 *   put:
 *     summary: Update leave category
 *     tags: [Admin - Leave Category]
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
 *             $ref: '#/components/schemas/UpdateLeaveCategoryRequest'
 *     responses:
 *       200:
 *         description: Leave category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LeaveCategory'
 *       500:
 *         description: Failed to update category
 *
 *   delete:
 *     summary: Delete leave category
 *     tags: [Admin - Leave Category]
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
 *         description: Category deleted
 *       500:
 *         description: Failed to delete category
 */
export {};
