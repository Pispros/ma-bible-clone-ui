export interface NoteInterface {
    id?: number;
    title: string;
    content: string;
    tags?: Array<string>;
    createdAt: string;
    updatedAt?: string
}