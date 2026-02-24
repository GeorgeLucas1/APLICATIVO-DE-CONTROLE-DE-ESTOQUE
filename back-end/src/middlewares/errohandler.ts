import express, { Request, Response, NextFunction } from "express";

const app = express();

// ... suas rotas aqui ...

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(error.stack);
  res.status(500).json({ error: "Erro interno do servidor" });
}

// Registrar o middleware de erro
app.use(errorHandler);
