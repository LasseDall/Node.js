import { Router } from "express";
const router = Router();

router.get("/users", (req, res) => {
    console.log(req.path, ":", req.session);
    if (!req.session.nameOfUser) {
        res.send({ data: "Jeg kender dig ikke!" });
    } else {
        res.send({ data: `Dit navn er ${req.session.nameOfUser}.` });
    }
});

router.get("/users/logout", (req, res) => {
    req.session.destroy(() => {
        res.send({ data: "Du er logget ud!" });
    })
});

router.get("/users/:registerUsersName", (req, res) => {
    req.session.nameOfUser = req.params.registerUsersName;
    res.send({ data: `Dit navn er ${req.session.nameOfUser}.` });
});

export default router;