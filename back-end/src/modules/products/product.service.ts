import { injectable,inject } from "tsyringe";
import "reflect-metadata"
import { ProdutoRepository } from "./product.repository"
import { criarProdutoDTO, Produto, ProdutoAtualizado, apagarProdutoDTO } from "./product.entity"
//regras de negocios estão presente aqui,pra fazer a validação dos dados, ou seja, verificar se os dados estão corretos antes de serem inseridos no banco de dados, ou seja, é responsável por garantir a integridade dos dados e a segurança do banco de dados, ou seja, deve ser implementado de forma a evitar SQL Injection e outras vulnerabilidades de segurança. O service é utilizado pelo controller para receber as requisições HTTP e enviar as respostas HTTP. Ele é a camada intermediária entre o controller e o repository, ou seja, é responsável por realizar as operações de negócio e chamar o repository para realizar as operações de CRUD no banco de dados.
//regras de negocios+validações+segurança+integridade dos dados

//injeção de dependência é um padrão de design que permite que as dependências de uma classe sejam injetadas em tempo de execução, ou seja, as dependências são fornecidas para a classe em vez de serem criadas pela própria classe. Isso permite que as classes sejam mais flexíveis e testáveis, pois as dependências podem ser facilmente substituídas por mocks ou stubs durante os testes. A injeção de dependência é geralmente implementada usando um container de injeção de dependência, que é responsável por gerenciar as dependências e fornecer as instâncias das classes quando necessário. No código acima, a classe ProdutoService tem uma dependência do ProdutoRepository, que é injetada através do construtor da classe usando o decorator @inject. O container de injeção de dependência irá criar uma instância do ProdutoRepository e fornecê-la para a classe ProdutoService quando ela for instanciada.
//tive que ativa exprimental decorators e emitDecoratorMetadata no tsconfig.json para usar o @injectable() e o @inject() do tsyringe, pois eles são necessários para a injeção de dependência funcionar corretamente. O @injectable() é usado para marcar a classe como injetável, ou seja, ela pode ser injetada em outras classes. O @inject() é usado para injetar uma dependência em uma classe, ou seja, ele é usado para dizer qual classe deve ser injetada em outra classe. No caso do ProdutoService, ele tem uma dependência do ProdutoRepository, então usamos o @inject(ProdutoRepository) para dizer que o ProdutoRepository deve ser injetado no ProdutoService. Com isso, podemos usar o ProdutoRepository dentro do ProdutoService para realizar as operações de CRUD no banco de dados.
//pra fazer o ts entender decoradores,que muda comportamentos de classes

@injectable()
export class ProdutoService {
    //private produtoRepository: ProdutoRepository;
  constructor(
    @inject(ProdutoRepository) private produtoRepository: ProdutoRepository
  ) {}

  // Buscar todos os produtos
  findAll(): Produto[] {
  return this.produtoRepository.findAll();
}
findById(id: string){
    const produto = this.produtoRepository.findById(id);
    if(!produto){
        throw new Error("Produto não encontrado");
    }
    return produto;
}
// regras pra Criar um novo produto
create(data: criarProdutoDTO): Produto {
    //validações de dados
    if(data.NOME.trim() === ""){
        throw new Error("O nome do produto é obrigatório");
    }
    if(data.QUANTIDADE < 0){
        throw new Error("A quantidade do produto não pode ser negativa");
    }       
    if(data.PRECO < 0){
        throw new Error("O preço do produto não pode ser negativo");
    }
    return this.produtoRepository.create(data);

}


//regras pra atualizar um produto
update(id: string, data: ProdutoAtualizado): Produto {
    //validações de dados
    if(data.NOME && data.NOME.trim() === ""){   
        throw new Error("O nome do produto é obrigatório");
    }
    if(data.QUANTIDADE !== undefined && data.QUANTIDADE < 0){
        throw new Error("A quantidade do produto não pode ser negativa");
    }
    if(data.PRECO !== undefined && data.PRECO < 0){
        throw new Error("O preço do produto não pode ser negativo");
    }
    const produtoAtualizado = this.produtoRepository.update(id, data);
    if(!produtoAtualizado){
        throw new Error("Produto não encontrado");
    }
    return produtoAtualizado;

}

//regras pra apagar um produto
delete(id: string) {
    const result = this.produtoRepository.delete(id);
    if(!result){
        throw new Error("Produto não encontrado");
    }
    return {message:"Produto deletado com sucesso!"};


}
}

