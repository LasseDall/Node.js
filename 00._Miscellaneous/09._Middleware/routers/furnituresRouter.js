import { Router } from "express";

const router = Router();

router.get("/chair", (req, res, next) => {
    res.send({ data: "Fed stol" });
});

router.get("/lamp", (req, res, next) => {
    res.send({ data: "Fed lampe" });
});

export default router;