import { injectable } from "tsyringe";
import express from "express";
import { ProdutoService } from "./product.service";

@injectable()
export class ProdutoController {
  constructor(private produtoService: ProdutoService) {}

  findAll = async (req: express.Request, res: express.Response) => {
    try {
      const produtos = await this.produtoService.findAll();
      return res.status(200).json(produtos);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      return res.status(500).json({ message: "Erro ao buscar produtos", error: message });
    }
  };

  findById = async (req: express.Request, res: express.Response) => {
    try {
      const produto = await this.produtoService.findById(req.params.id as string);
      return res.status(200).json(produto);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      return res.status(404).json({ message: "Produto não encontrado", error: message });
    }
  };

  create = async (req: express.Request, res: express.Response) => {
    try {
      const produto = await this.produtoService.create(req.body);
      return res.status(201).json(produto);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      return res.status(400).json({ message: "Erro ao criar produto", error: message });
    }
  };

  update = async (req: express.Request, res: express.Response) => {
    try {
      const produto = await this.produtoService.update(req.params.id as string, req.body);
      return res.status(200).json(produto);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      return res.status(400).json({ message: "Erro ao atualizar produto", error: message });
    }
  };

  delete = async (req: express.Request, res: express.Response) => {
    try {
      await this.produtoService.delete(req.params.id as string);
      return res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro desconhecido";
      return res.status(404).json({ message: "Erro ao deletar produto", error: message });
    }
  };
}