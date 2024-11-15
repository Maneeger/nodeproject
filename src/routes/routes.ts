import express, { Request, Response } from "express";
import { createUser, upload } from "../controllers/usercontroller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.render("index");
});

router.get("/add_user", (req: Request, res: Response) => {
  res.render("add_user");
});
router.post("/add_a_user", upload, createUser);

export default router;
