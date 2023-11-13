import { Router } from "express";
const router = Router();

router.get("/api/diaries/mette", (req, res) => {
    res.send({ data: "Mettes dagbog" });
}); 

router.get("/api/diaries/lars", (req, res) => {
    console.log(req.session);
    res.send({ data: "Lars' dagbog" });
}); 

export default router;