/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         latitude:
 *           type: number
 *           example: -6.21462
 *         longitude:
 *           type: number
 *           example: 106.84513
 *         is_active:
 *           type: boolean
 *         created_at:
 *           type: string
 *         updated_at:
 *           type: string
 *
 *     CreateCompanyRequest:
 *       type: object
 *       required:
 *         - name
 *         - phone
 *         - latitude
 *         - longitude
 *       properties:
 *         name:
 *           type: string
 *           example: Acme Corp
 *         phone:
 *           type: string
 *           example: "0211234567"
 *         address:
 *           type: string
 *           example: "Jl. Sudirman No. 10"
 *         latitude:
 *           type: number
 *           example: -6.21462
 *         longitude:
 *           type: number
 *           example: 106.84513
 *
 *     UpdateCompanyRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         is_active:
 *           type: boolean
 *
 *     CompanyResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Company created
 *         data:
 *           $ref: '#/components/schemas/Company'
 *
 *     CompanyListResponse:
 *       type: object
 *       properties:
 *         page:
 *           type: number
 *           example: 1
 *         limit:
 *           type: number
 *           example: 10
 *         total:
 *           type: number
 *           example: 50
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Company'
 */
export {};
