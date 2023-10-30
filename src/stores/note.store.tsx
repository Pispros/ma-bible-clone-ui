import { NoteInterface } from "@/interfaces/note.interface";
import { action, computed } from "easy-peasy";

export const noteStore = {
    notes: [],
    getNotes: computed((state: any) => {
        const currentNotes: Array<NoteInterface> = state?.notes;
        return currentNotes.sort((a, b) => Number(a.id) - Number(b.id));
    }),
    saveNote: action((state: any, payload: NoteInterface) => {
        payload.id = state.notes.length + 1;
        payload.createdAt = new Date().toISOString();
        state.notes.push(payload);
    }),
    saveMultipleNotes: action((state: any, payload: Array<NoteInterface>) => {
        state.notes = payload;
    }),
    updateNote: action((state: any, payload: NoteInterface) => {
        for (let index = 0; index < state?.notes?.length; index++) {
            const element: NoteInterface = state.notes[index];
            if (element.id === payload.id) {
                payload.updatedAt = new Date().toISOString();
                state.notes[index] = payload;
                break;
            }
        }
    }),
    removeNote: action((state: any, payload: NoteInterface) => {
        for (let index = 0; index < state?.notes?.length; index++) {
            const element: NoteInterface = state.notes[index];
            if (element.id === payload.id) {
                state?.notes.splice(index, 1)
                break;
            }
        }
    }),
}