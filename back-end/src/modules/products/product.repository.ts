import { injectable } from "tsyringe";
import db from "../../database/database";
import { Produto, criarProdutoDTO, ProdutoAtualizado } from "./product.entity";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class ProdutoRepository {

  findAll(): Produto[] {
    const stmt = db.prepare("SELECT * FROM produtos");
    return stmt.all() as Produto[];
  }

  findById(ID: string): Produto | null {
    const stmt = db.prepare("SELECT * FROM produtos WHERE ID = ?");
    return (stmt.get(ID) as Produto) || null;
  }

  create(data: criarProdutoDTO): Produto {
    const product = {
      ID: uuidv4(),           // ← MAIÚSCULO
      NOME: data.NOME,
      DESCRICAO: data.DESCRICAO ?? "",
      QUANTIDADE: data.QUANTIDADE,
      PRECO: data.PRECO,
      CRIADO_EM: new Date().toISOString(),    // ← string ✅
      ATUALIZADO_EM: new Date().toISOString() // ← string ✅
    };

    db.prepare(`
      INSERT INTO produtos 
      (ID, NOME, DESCRICAO, QUANTIDADE, PRECO, CRIADO_EM, ATUALIZADO_EM) 
      VALUES (@ID, @NOME, @DESCRICAO, @QUANTIDADE, @PRECO, @CRIADO_EM, @ATUALIZADO_EM)
    `).run(product);

    return product as Produto;
  }

  update(ID: string, data: ProdutoAtualizado): Produto | undefined {
    const produtoExistente = this.findById(ID);

    if (!produtoExistente) return undefined;

    const produtoAtualizado = {
      ...produtoExistente,
      ...data,
      ATUALIZADO_EM: new Date().toISOString() // ← string ✅
    };

    db.prepare(`
      UPDATE produtos SET
        NOME = @NOME,
        DESCRICAO = @DESCRICAO,
        QUANTIDADE = @QUANTIDADE,
        PRECO = @PRECO,
        ATUALIZADO_EM = @ATUALIZADO_EM
      WHERE ID = @ID
    `).run(produtoAtualizado);

    return produtoAtualizado as Produto;
  }

  delete(ID: string): boolean {
    const result = db
      .prepare("DELETE FROM produtos WHERE ID = ?")
      .run(ID);

    return result.changes > 0;
  }
}