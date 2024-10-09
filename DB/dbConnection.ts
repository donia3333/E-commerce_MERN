import mongoose from "mongoose";

export const DbConnection = () => {
  mongoose
    .connect("mongodb://localhost:27017/E-commerce")
    .then(() => {
      console.log("DataBase is connected");
    })
    .catch((error) => {
      console.log("error in dataBase", error);
    });
};
