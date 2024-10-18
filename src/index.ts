import express from "express";
import { DbConnection } from "../DB/dbConnection";
import productRouter from "./modules/product/product.router";
import userRouter from "./modules/user/user.router";

const app = express();
const port = 3000;
DbConnection();

app.use(express.json());

app.use("/user", userRouter);
app.use("/products", productRouter);

app.listen(port, () => {
  console.log(`server is running at : http://localhost:${port}`);
});
