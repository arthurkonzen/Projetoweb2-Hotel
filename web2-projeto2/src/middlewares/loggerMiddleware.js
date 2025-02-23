export const logger = (req, res, next) => {
  const { method, url } = req;
  const start = process.hrtime(); // Alta precisão para medir o tempo

  res.on("finish", () => {
    const [seconds, nanoseconds] = process.hrtime(start); // Retorna tempo em segundos e nanossegundos
    const durationMs = (seconds * 1e3 + nanoseconds / 1e6).toFixed(5); // Convertendo para milissegundos com precisão de 5 casas

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${durationMs.split(".")[1]}`;

    console.log(`[${new Date().toISOString()}] ${method} ${url} ${res.statusCode} - ${formattedTime}`);
  });

  next();
};