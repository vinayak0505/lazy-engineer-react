import axios from 'axios';
import API from '../constants/api';
import { ResponseType as NotesType } from '../reducer/notes.reducer';
import { ResponseType as BooksType } from '../reducer/books.reducer';

export type BaseResponse<T> = {
    status: string;
    data: T | null;
    message: string | null;
    error: unknown;
}
class ContentService {
    static async getBooks(skip: number, limit: number): Promise<BaseResponse<BooksType>> {
        const response = await axios.get(API.BOOKS, {
            params: {
                skip,
                limit
            }
        });
        return response.data;
    }

    static async getNotes(skip: number, limit: number): Promise<BaseResponse<NotesType>> {
        const response = await axios.get(API.NOTES, {
            params: {
                skip,
                limit
            }
        });
        return response.data;
    }
}

export default ContentService;