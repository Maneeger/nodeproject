import { Request, Response } from "express";
import multer, { StorageEngine } from "multer";
import path from "path";
import User from "../models/users";

const storage: StorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

export const upload = multer({
  storage: storage,
}).single("image");

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "Image is required", type: "danger" });
      return;
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
    });
    await user.save();

    // res.session.message = {
    //     type: 'success',
    //     message: 'User Created',
    // };
    res.status(200).json({
      message: "User Created",
    });
    // res.redirect('/');
  } catch (err) {
    res.status(500).json({ message: "Error", type: "danger" });
  }
};
