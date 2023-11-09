import { Router } from "express";

const router = Router();

router.get("/api/coffeelovers", (req, res) => {
    res.send({ data: req.session.coffeeLover });
});

router.post("/api/coffeelovers", (req, res) => {
    req.session.coffeeLover = req.body.coffeeLover;
    res.send({ data: req.session.coffeeLover });
});

export default router;