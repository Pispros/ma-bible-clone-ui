import { POST_ACTION, UPDATE_ACTION } from "@/constants/state.conts";
import { NoteInterface } from "@/interfaces/note.type";
import { action } from "easy-peasy";

export const noteStore = {
    notes: [],
    // Same function to update or create a new note in the store
    saveNote: action((state: any, payload: NoteInterface) => {
        let isUpdated = false;
        for (let index = 0; index < state?.notes?.length; index++) {
            const element: NoteInterface = state.notes[index];
            if (element.id === payload.id) {
                state.notes[index] = payload;
                isUpdated = true;
                break;
            }
        }
        if (isUpdated) {
            
        } else {
            payload.id = state.notes.length + 1;
            payload.createdAt = new Date().toISOString();
            state.notes.push(payload);
        }
    }),
    removeNote: action((state, payload: NoteInterface) => {

    }),
}