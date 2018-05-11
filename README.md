# Aplicação Chart com Express e Node.js

Os seguintes módulos e ferramentas foram utilizados para o desenvolvimento da aplicação:

Express:

http://expressjs.com/en/guide/writing-middleware.html

Pug HTML
https://pugjs.org/api/getting-started.html

Axios:

https://github.com/axios/axios

body-parser:

https://github.com/expressjs/body-parser

## Instalação e execução

Para testar a aplicação, você deve ter o MySQL instalado, com a estrutura de banco de dados e tabela já criados. Você pode executar o script a seguir para gerar esta estrutura!

```sql
  CREATE DATABASE `db`;
  USE `db`;

  DROP TABLE IF EXISTS `charts`;
  CREATE TABLE IF NOT EXISTS `charts` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `nome` varchar(20) DEFAULT NULL,
    `sexo` int(11) DEFAULT NULL,
    `date` datetime DEFAULT NULL,
    `estado` varchar(15) NOT NULL,
    PRIMARY KEY (`id`)
  ) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;

  INSERT INTO `charts` (`id`, `nome`, `sexo`, `date`, `estado`) VALUES
  (1, 'João', 1, '2018-04-30 00:00:00', 'Sul'),
  (2, 'Pedro', 1, '2018-04-28 00:00:00', 'Sul'),
  (3, 'Adolfo', 1, '2018-04-01 00:00:00', 'Sul'),
  (4, 'Joana', 2, '2018-01-02 00:00:00', 'Sul'),
  (5, 'Richard', 1, '2018-01-02 00:00:00', 'Sul'),
  (6, 'Natanael', 1, '2018-01-01 00:00:00', 'Sul'),
  (7, 'Daniel', 1, '2018-05-02 00:00:00', 'Norte'),
  (8, 'Astolfo', 1, '2018-05-02 23:16:15', 'Norte'),
  (9, 'José', 1, '2018-05-02 23:19:13', 'Nordeste'),
  (10, 'Melissa', 2, '2018-05-02 23:20:02', 'Norte'),
  (11, 'Katarina', 2, '2018-05-02 23:47:42', 'Norte'),
  (12, 'José', 1, '2018-05-02 23:50:04', 'Nordeste'),
  (13, 'José', 1, '2018-05-02 23:50:35', 'Nordeste'),
  (14, 'Mariana', 2, '2018-05-02 23:50:44', 'Nordeste'),
  (15, 'leonardo', 1, '2018-05-03 00:21:48', 'Nordeste'),
  (16, 'leonardo', 1, '2018-05-03 01:28:54', 'Nordeste'),
  (17, 'Arlindo', 1, '2018-05-03 02:29:26', 'Centro-Oeste');
  COMMIT;
```

No arquivo index.js,  se encontra as configuração do MySQL.

```javascript
var knex = require('knex');

const db = knex({

    client: "mysql",
    connection:{
        host: "127.0.0.1",
        user: "root",
        password: "",
        database: "db"
    }
})
```
Instalção:

Acesse o terminal e execute o comando `npm i -g nodemon` para instalar o nodemon como global.

Em seguida, dentro da pasta do projeto, execute

npm install
```
```
Após concluída a instalação, execute o comando `nodemon index.js`

```
Acesso http://localhost:5000
```
