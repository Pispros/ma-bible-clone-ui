import { POST_ACTION, UPDATE_ACTION } from "@/constants/state.conts";
import { NoteInterface } from "@/interfaces/note.type";
import { action } from "easy-peasy";

export const noteStore = {
    notes: [],
    // Same function to update or create a new note in the store
    saveNote: action((state: any, payload: NoteInterface) : { state: string; value?: any } => {
        console.log(state?.notes);        
        let isUpdated = false;
        if (state.notes === undefined) {
            state.notes = [];
        }
        for (let index = 0; index < state?.notes?.length; index++) {
            const element: NoteInterface = state.notes[index];
            if (element.id === payload.id) {
                state.notes[index] = payload;
                isUpdated = true;
                break;
            }
        }
        if (isUpdated) {
            return { state: UPDATE_ACTION };
        } else {
            payload.id = state.notes.length + 1;
            state.notes.push({...payload});
            return {
                state: POST_ACTION,
                value: payload
            };
        }
    }),
    removeNote: action((state, payload: NoteInterface) => {

    }),
}