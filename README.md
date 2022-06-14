# Contacts-Manager (Node.js Challenge)

## Get Started

Instale as dependências do projeto via npm

```bash
$ npm i 
```

Para inicializar o projeto em mode de desenvolvimento

```bash
$ npm run dev 
```

Para inicializar o projeto em mode de produção

```bash
$ npm run build
```

depois

```bash
$ npm start
```

## Estrutura do projeto

├── build                  - Build do projeto (Execute com `npm start`);
├── src                    - Fonte do projeto (Execute con `npm run dev`);
│  ├── common         - Types, interfaces and others global sources;
│  ├── config         - variaveis de configuração;
│  ├── controllers    - Controladores/Gerente dos dados;
│  ├── data           - Arquivos de importação CSV;
│  ├── entities       - entities;
│  ├── services       - Serviços externos (API);
│  ├── utils          - Functions and Tools;
│  ├── app.ts         - Express Class;
│  ├── index.ts       - Processo principal;
│  ├── router.ts      - Api Router;
│  └── startup.ts     - Executable on api Startup;
├── ENDPOINT.md            - endereço do endpoint REST;
├── package.json           - Detalhes do projeto, dependências e scripts de inicialização;
├── README.md              - Este Arquivo;
└── tsconfig.json          - Definições do typescript;
