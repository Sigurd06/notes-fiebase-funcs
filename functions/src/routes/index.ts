import cors from "cors";
import { json, Router, urlencoded } from "express";

import notesRoutes from "./notes";

export default function () {
    const router = Router();
    const apiRouter = Router();

    apiRouter
        .use(cors({ origin: "*" }))
        .use(json({ limit: "100mb" }))
        .use(urlencoded({ extended: true, limit: "100mb" }));

    apiRouter.use("/notes", notesRoutes(router));

    router.use("/api/v1", apiRouter);

    return router;
}
