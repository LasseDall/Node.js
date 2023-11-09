import { Router } from "express";
const router = Router();

router.get("/api/diaries/mette", (req, res) => {
    res.send({ data: "Mettes dagbog" });
}); 

export default router;