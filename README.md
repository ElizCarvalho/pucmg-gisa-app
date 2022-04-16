<br />
<div align="center">
  
  ![C2F553F0-3194-47E5-BF5C-88A70DF98619_4_5005_c](https://user-images.githubusercontent.com/19569999/162860920-04c561a5-5dd2-4b99-9400-bf5d7b083692.jpeg)
  
  <h3 align="center">Boa Saúde APP</h3>
</div>

<!-- ABOUT THE PROJECT -->
## Sobre o projeto
Módulo de apresentação (frontend) da aplicação GISA para POC desenvolvida como parte da entrega do TCC para obtenção do título de 'Especialista em Arquitetura de Software Distribuído' pela PUC-MG.

### Tecnologias
* [NextJS](https://nextjs.org/docs)
* [Material UI](https://mui.com/pt/)
* [Nookies](https://github.com/maticzav/nookies)
* [Axios](https://axios-http.com/ptbr/docs/intro)

## Iniciando

### Pré requisito
Faz-se necessário ter o [Docker](https://docs.docker.com/get-docker/) instalado e funcionando corretamente.

### Instalação
1. Clone o repositório
   ```sh
   git clone https://github.com/ElizCarvalho/pucmg-gisa-app.git
   ```
2. Acesse o diretório da aplicação, por exemplo:
   ```sh
   cd .\repos\pucmg-gisa-app
   ```
3. No terminal, gere a imagem do container
   ```sh
   docker-compose build
   ````
7. No terminal, suba o container
   ```sh
   docker-compose up -d
   ````
8. Acesse o sistema através da url http://localhost
