import { Router } from "express";
import { productRouter } from "../modules/products/product.routes";

const router = Router();

router.use("/products", productRouter);

export { router };