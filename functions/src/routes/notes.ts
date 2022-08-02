import { Router } from "express";
import { createNote, getNote, getNotes, removeNote, updateNote } from "../controllers";

import { body } from "express-validator";
import { validate } from "../utils/validate";

export default function (router: Router) {
    router.get("/", getNotes);
    router.get("/:id", getNote);
    router.post("/create", body("title").not().isEmpty().trim().escape(), body("content").not().isEmpty().trim().escape(), validate, createNote);
    router.put("/update/:id", body("title").not().isEmpty().trim().escape(), body("content").not().isEmpty().trim().escape(), validate, updateNote);
    router.delete("/remove/:id", removeNote);

    return router;
}
