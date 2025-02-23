<h1 align="center">
<a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Righteous&pause=1000&color=F1F7F5&background=FF565600&center=true&vCenter=true&width=500&height=70&lines=Projeto+Web+2%3A+API+Rede+social;Dev%3A+Italo+Kaique" alt="Typing SVG" /></a>
<div align="center"> 
  <a href="mailto:italohyu122@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-333333?style=for-the-badge&logo=gmail&logoColor=red" />
  </a>
  <a href="https://www.linkedin.com/in/italo-kaique-bertini-bueno-6839a8224?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank" />
  </a>
  <a href="https://theloopcode.com/portfolio/" target="_blank">
     <img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=todoist&logoColor=white" target="_blank" /> <!-- sqlite, safari, google-chrome are other good icon options -->
  </a>
</div>
</h1>

### Informações da API
1. API para rede social básica com comentários, postagens e usuários com validação de login!
2. Versão v1.0.0

### Requisitos
1. Node.js v20.11.1

### Instalação do projeto
1. Executar `npm install`

### Váriaveis de ambiente (.env)
> JWT_SECRET="root"

> VERSION="1"

> PORT=3000

> DATABASE_URL="" (Postgres URL)

### Execução do projeto
1. Gerar banco de dados: `npx prisma migrate dev`
2. Gerar documentação swagger: `npm run swagger-autogen`
3. Executar projeto com nodemon: `npm run dev`
