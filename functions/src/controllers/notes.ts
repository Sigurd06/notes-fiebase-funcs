import { Request, Response } from "express";
import { db } from "../firebase";

export async function getNotes(req: Request, res: Response) {
    const querySnapshot = await db.collection("notes").get();
    const response = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        content: doc.data().content,
    }));

    return res.status(200).json(response);
}

export async function getNote(req: Request, res: Response) {
    const response = await db.collection("notes").doc(req.params.id).get();
    if (!response.data()) {
        return res.status(404).json({
            message: "Note not found",
        });
    }

    return res.status(200).json(response.data());
}

export async function createNote(req: Request, res: Response) {
    await db.collection("notes").add({
        title: req.body.title,
        content: req.body.content,
    });
    return res.status(201).json({ message: "Note created successfully" });
}

export async function updateNote(req: Request, res: Response) {
    const response = await db.collection("notes").doc(req.params.id).get();
    if (!response.data()) {
        return res.status(404).json({
            message: "Note not found",
        });
    }
    await db.collection("notes").doc(req.params.id).update({
        title: req.body.title,
        content: req.body.content,
    });

    return res.status(200).json({ message: "Note updated successfully" });
}

export async function removeNote(req: Request, res: Response) {
    const response = await db.collection("notes").doc(req.params.id).get();
    if (!response.data()) {
        return res.status(404).json({
            message: "Note not found",
        });
    }
    await db.collection("notes").doc(req.params.id).delete();

    return res.status(200).json({ message: "Note remove successfully" });
}
