import { createStore, persist } from 'easy-peasy';
import { noteStore } from './note.store';

export const easyPeasyStore = createStore(persist({
    ...noteStore
}));