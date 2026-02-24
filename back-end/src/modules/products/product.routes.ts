import { Router } from "express";
import { container } from "tsyringe";
import { ProdutoController } from "./product.controller";

export const productRouter = Router();

const controller = container.resolve(ProdutoController);

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Gerenciamento de estoque
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
productRouter.get("/", controller.findAll);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Busca produto por ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto encontrado
 *       404:
 *         description: Produto não encontrado
 */
productRouter.get("/:id", controller.findById);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - NOME
 *               - QUANTIDADE
 *               - PRECO
 *             properties:
 *               NOME:
 *                 type: string
 *                 example: Notebook Dell
 *               DESCRICAO:
 *                 type: string
 *                 example: Notebook profissional
 *               QUANTIDADE:
 *                 type: number
 *                 example: 10
 *               PRECO:
 *                 type: number
 *                 example: 3500.00
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
productRouter.post("/", controller.create);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Products]
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
 *             type: object
 *             properties:
 *               NOME:
 *                 type: string
 *               DESCRICAO:
 *                 type: string
 *               QUANTIDADE:
 *                 type: number
 *               PRECO:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       404:
 *         description: Produto não encontrado
 */
productRouter.put("/:id", controller.update);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Deleta um produto
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Produto deletado
 *       404:
 *         description: Produto não encontrado
 */
productRouter.delete("/:id", controller.delete);