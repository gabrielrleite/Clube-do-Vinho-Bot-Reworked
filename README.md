
# Clube do Vinho Reworked

Discord Bot desenvolvido em NodeJS a partir da biblioteca [discord.js](https://discord.js.org)


## Funcionalidades

- Reprodução de músicas ([DisTube](https://distube.js.org/#/)):
````
    - /play link_ou_nome  | Adiciona uma música a fila
    - /pause              | Pausa a reprodução
    - /resume             | Retoma a reprodução
    - /stop               | Para a reprodução e limpa a fila
    - /volume número      | Muda o volume
````
- Conversor de moedas ([Banco Central do Brasil](https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/aplicacao#!/recursos)):
````
    - /exchange nome_da_moeda quantidade
````
- Comandos diversos:
````
    - /avatar | Exibe o avatar do usuario selecionado.
    - /uptime | Exibe o tempo de atividade da aplicação.
````


## Melhorias

- Reformulação da estrutura do código;
- Adição da sicronização com banco de dados `(MySQL)`;
- Funções de Moderação `(Limpeza de chat)`;



## Futuras melhorias

- Adicionar comandos para moderação `(Ban, Kick, Mute, etc)`;
- Adicionar a função TTS `(Text to Speech)`;
- Adicionar função Anti-Phishing. `(Bloqueador de links suspeitos)`


## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/gabrielrleite/Clube-do-Vinho-Bot-Reworked.git
```

Entre no diretório do projeto

```bash
  cd Clube-do-Vinho-Bot-Reworked
```

Instale as dependências

```bash
  npm install
```

Preencha o arquivo `config.json`

Inicie o projeto

```bash
  node index.js
```


## Stack utilizada

**Back-end:** Node, Express, MySQL

