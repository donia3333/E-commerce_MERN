import express from "express";
import multer from "multer";
import { addProduct, getAllProducts } from "./product.controller";

const upload = multer();

const productRouter = express.Router();

productRouter.post("/addProduct", upload.single("image"), addProduct);
productRouter.get("/getAllProduct", getAllProducts);

export default productRouter;
