import { NoteInterface } from "@/interfaces/note.interface";
import { action } from "easy-peasy";

export const noteStore = {
    searchValue: "",
    notes: [],
    saveNote: action((state: any, payload: NoteInterface) => {
        payload.id = state.notes.length + 1;
        payload.createdAt = new Date().toISOString();
        state.notes.push(payload);
    },),
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
    },),
    removeNote: action((state: any, payload: NoteInterface) => {        
        for (let index = 0; index < state?.notes?.length; index++) {
            const element: NoteInterface = state.notes[index];
            if (element.id === payload.id) {
                state?.notes?.splice(index, 1)
                break;
            }
        }
    }),
    setSearchValue: action((state: any, payload: string) => {        
        state.searchValue = payload;
    }),
}