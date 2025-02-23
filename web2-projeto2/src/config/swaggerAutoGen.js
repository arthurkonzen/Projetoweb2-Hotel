import swaggerAutogen from "swagger-autogen";

const outputFile = "./swagger-output.json"; // Caminho para o arquivo gerado
const endpointsFiles = ["../app.js"]; // Arquivos onde estão definidas as rotas

const doc = {
  info: {
    title: "Minha API de web 2 - Rede social",
    description: "Documentação gerada automaticamente",
  },
  host: "localhost:" + process.env.PORT || 3000,
  schemes: ["http"],
};

swaggerAutogen()(outputFile, endpointsFiles, doc);
