import axios from 'axios';
import API from '../constants/api';
import { ResponseType as NotesType } from '../reducer/notes.reducer';
import { ResponseType as BooksType } from '../reducer/books.reducer';
import { ResponseType as JobsType } from '../reducer/jobs.reducer';
import { ResponseType as FilesType } from '../reducer/files.reducer';
import { ResponseType as PapersType } from '../reducer/papers.reducer';

export type BaseResponse<T> = {
    status: string;
    data: T | null;
    message: string | null;
    error: unknown;
}
class ContentService {
    static async getPapers(skip: number, limit: number): Promise<BaseResponse<PapersType>> {
        const response = await axios.get(API.QUESTIONPAPER, {
            params: {
                skip,
                limit
            }
        });
        return response.data;
    }
    static async getJobs(skip: number, limit: number): Promise<BaseResponse<JobsType>> {
        const response = await axios.get(API.JOBS, {
            params: {
                skip,
                limit
            }
        });
        return response.data;
    }

    static async getBooks(skip: number, limit: number): Promise<BaseResponse<BooksType>> {
        const response = await axios.get(API.BOOKS, {
            params: {
                skip,
                limit
            }
        });
        return response.data;
    }

    static async getFiles(skip: number, limit: number): Promise<BaseResponse<FilesType>> {
        const response = await axios.get(API.PRACTICLEFILE, {
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

    static async addNotes(formData: FormData): Promise<BaseResponse<string>> {
        const response = await axios.post(API.NOTES, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async addPaper(formData: FormData): Promise<BaseResponse<string>> {
        const response = await axios.post(API.QUESTIONPAPER, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async addPracticleFile(formData: FormData): Promise<BaseResponse<string>> {
        const response = await axios.post(API.PRACTICLEFILE, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async addBooks(formData: FormData): Promise<BaseResponse<string>> {
        const response = await axios.post(API.BOOKS, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async addJob(formData: FormData): Promise<BaseResponse<string>> {
        const response = await axios.post(API.JOBS, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;
    }

    static async setFavorite(id: string, update: boolean, type: FAVOURITETYPE): Promise<BaseResponse<string>> {
        const response = await axios.post(API.FAVOURITE, {id, update, type}, {});
        return response.data;
    }
}

export enum FAVOURITETYPE {
    NOTE = "note",
    PAPER = "paper",
    BOOK = "book",
    FILE = "file",
    JOB = "job"
}

export default ContentService;