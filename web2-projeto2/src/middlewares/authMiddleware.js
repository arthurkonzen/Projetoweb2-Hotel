import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Acesso negado. Não foi provido um token." });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Adiciona o usuário decodificado ao objeto `req`.
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido ou expirado." });
  }
};