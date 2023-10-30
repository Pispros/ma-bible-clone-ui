export interface NoteInterface {
    id?: number;
    title: string;
    body: string;
    tags?: Array<string>;
    createdAt: string;
    updatedAt?: string
}