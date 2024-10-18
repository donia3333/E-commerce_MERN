import cloudinary from "cloudinary";
import { Request, Response } from "express";
import productModel from "../../../DB/models/product.model";

cloudinary.v2.config({
  cloud_name: "dopeb5jes",
  api_key: "143118978845712",
  api_secret: "IbK7Q1HTtiRxd_TFCEds4AYR1Jo",
});

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  const products = await productModel.find();

  if (products) {
    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } else {
    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, price, stock } = req.body;
  const imageFile = req.file;

  try {
    const isProduct = await productModel.findOne({ title });
    if (isProduct) {
      res.status(400).json({
        message: "Product already added",
      });
      return;
    }

    if (!imageFile) {
      res.status(400).json({ message: "Image is required" });
      return;
    }

    const uploadStream = cloudinary.v2.uploader.upload_stream(
      { resource_type: "image" },
      async (error, result) => {
        if (error) {
          res.status(500).json({ message: error.message });
          return;
        }

        await productModel.create({
          title,
          price,
          stock,
          image: result?.secure_url,
        });

        res.status(200).json({ message: "Product added successfully" });
      }
    );

    uploadStream.end(imageFile.buffer);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};
