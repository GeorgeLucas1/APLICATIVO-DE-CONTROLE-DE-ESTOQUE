//aqui é o contrato da tabelas products, ou seja, a estrutura que os dados devem seguir para serem inseridos no banco de dados


export interface Produto {
    ID?: string; //id é opcional porque ele é gerado automaticamente pelo banco de dados
    NOME: string;
    DESCRICAO?: string; //descrição é opcional
    QUANTIDADE: number;
    PRECO: number;
    CRIADO_EM?: string; //data de criação é opcional porque ela é gerada automaticamente pelo banco de dados
    ATUALIZADO_EM?: string; //data de atualização é opcional porque ela é gerada automaticamente pelo banco de dados
}

export interface ProdutoAtualizado {
    ID: string; //id é obrigatório para atualizar um produto, pois é necessário identificar qual produto deve ser atualizado
    NOME?: string; //nome é opcional para atualização, pois nem sempre é necessário atualizar o nome do produto
    DESCRICAO?: string; //descrição é opcional para atualização, pois nem sempre é necessário atualizar a descrição do produto
    QUANTIDADE?: number; //quantidade é opcional para atualização, pois nem sempre é necessário atualizar a quantidade do produto
    PRECO?: number; //preço é opcional para atualização, pois nem sempre é necessário atualizar o preço do produto
    ATUALIZADO_EM?: string; //data de atualização é opcional para atualização, pois ela será gerada automaticamente pelo banco de dados
}


export interface criarProdutoDTO {
    NOME: string;
    DESCRICAO?: string;
    QUANTIDADE: number;
    PRECO: number;
}

export interface apagarProdutoDTO {
    ID: string;
}


//OBS SE POR ACASO OS ATRIBUTOS ESTEJAM MAIUSCULO OU MINUSCULO, DEVE SER MANTIDO ASSIM EM TODO O CÓDIGO, POIS O BANCO DE DADOS É CASE SENSITIVE, OU SEJA, ELE DIFERENCIA MAIUSCULO DE MINUSCULO, ENTÃO SE O ATRIBUTO FOR NOME, ELE DEVE SER NOME EM TODO O CÓDIGO, SE FOR nome, ELE DEVE SER nome EM TODO O CÓDIGO, E ASSIM POR DIANTE.