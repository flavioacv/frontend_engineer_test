# Projeto de Catálogo - Vue.js 3 + Bootstrap + Vite

Este projeto é um exemplo de um catálogo de categorias e subcategorias, desenvolvido utilizando Vue.js 3, Bootstrap e Vite. O projeto segue os princípios de Clean Code e Clean Architecture para garantir código limpo, legível e bem estruturado.

## Tecnologias

- **Vue.js 3**: Framework JavaScript para a construção de interfaces de usuário reativas e dinâmicas.
- **Bootstrap**: Framework CSS para criação de layouts responsivos e com design moderno.
- **Vite**: Ferramenta de build e desenvolvimento rápido para Vue.js e outras tecnologias modernas.
- **Pinia**: Gerenciamento de estado centralizado.
- **Axios**: Biblioteca para requisições HTTP.

## Estrutura do Projeto

A estrutura do projeto segue os princípios da Clean Architecture, organizando os componentes e camadas de forma clara e modular.


## Instalação

1. Clone este repositório:
    ```bash
    git clone https://github.com/flavioacv/frontend_engineer_test.git
    ```

2. Navegue até a pasta do projeto:
    ```bash
    cd frontend_engineer_test
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

5. Acesse a aplicação em [http://localhost:8080](http://localhost:3000).

## Funcionalidades

- **Categorias e Subcategorias**: O projeto permite a criação, visualização e organização de categorias e subcategorias de produtos.
- **Responsividade**: A interface é totalmente responsiva, adaptando-se a diferentes tamanhos de tela (Desktop, Tablet e Mobile) com o uso do Bootstrap.
- **Carregamento Assíncrono**: Dados são carregados dinamicamente através de requisições HTTP.

## Estrutura de Componentes

O projeto é dividido em componentes reutilizáveis para facilitar a manutenção e garantir um código limpo e organizado.

- **HeaderCustom**: Componente de cabeçalho.
- **CategoryMenu**: Componente para exibir uma lista de categorias e subcategorias.
- **ButtonAddSubcategory**: Botão para adicionar novas subcategorias.

## Gerenciamento de Estado

O projeto utiliza **Pinia** para gerenciamento de estado, mantendo o estado centralizado e facilitando a comunicação entre os componentes.

- **categoryStore**: Armazena as categorias e subcategorias, além de controlar o estado de carregamento e erros.

## Arquitetura Limpa (Clean Architecture)

O código segue as práticas de Clean Architecture, onde cada camada é separada de forma clara:

- **Controllers**: Responsáveis pela lógica de negócios.
- **Models**: Estruturas de dados (como `CategoryModel` e `SubCategoryModel`).
- **Views**: Componentes de interface do usuário (UI).
- **Stores**: Gerenciamento de estado.
- **Services**: Funcionalidades auxiliares, como requisições HTTP.

## Contribuindo

1. Faça um fork do repositório.
2. Crie uma nova branch (`git checkout -b feature/nova-feature`).
3. Faça as modificações e commite-as (`git commit -am 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais informações.

---

Desenvolvido com ❤️ por [Flavio A](https://github.com/flavioacv)
