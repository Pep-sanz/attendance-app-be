/**
 * @swagger
 * /admin/shift:
 *   post:
 *     summary: Create shift
 *     tags: [Admin - Shift]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateShiftRequest'
 *     responses:
 *       201:
 *         description: Shift created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Shift'
 *       400:
 *         description: Validation error
 *
 *   get:
 *     summary: List shifts
 *     tags: [Admin - Shift]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of shifts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Shift'
 *
 * /admin/shift/{id}:
 *   put:
 *     summary: Update shift
 *     tags: [Admin - Shift]
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
 *             $ref: '#/components/schemas/UpdateShiftRequest'
 *     responses:
 *       200:
 *         description: Shift updated successfully
 *
 *   delete:
 *     summary: Delete shift (soft delete)
 *     tags: [Admin - Shift]
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
 *         description: Shift deleted successfully
 *
 * /admin/shift/assign:
 *   post:
 *     summary: Assign shift to employee
 *     tags: [Admin - Shift]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignShiftRequest'
 *     responses:
 *       200:
 *         description: Shift assigned to employee
 */
export {};
