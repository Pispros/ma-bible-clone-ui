import { NoteInterface } from "@/interfaces/note.type";
import { action, computed } from "easy-peasy";

export const noteStore = {
    notes: [],
    saveNote: action((state, payload: NoteInterface) => {

    }),
    removeNote: action((state, payload: NoteInterface) => {

    }),
}