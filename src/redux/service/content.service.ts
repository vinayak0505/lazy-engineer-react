import axios from 'axios';
import API from '../constants/api';
import { NotesDataType, ResponseType as NotesType } from '../reducer/notes.reducer';
import { BookDataType, ResponseType as BooksType } from '../reducer/books.reducer';
import { JobDataType, ResponseType as JobsType } from '../reducer/jobs.reducer';
import { FileDataType, ResponseType as FilesType } from '../reducer/files.reducer';
import { PapersDataType, ResponseType as PapersType } from '../reducer/papers.reducer';
import { FavoriteDataType } from '../reducer/favorite.reducer';
import { AlertType } from '../reducer/alert.reducer';

export type BaseResponse<T> = {
	status: string;
	data: T | null;
	message: string | null;
	error: unknown;
};
class ContentService {
	static async getPapers(skip: number, limit: number): Promise<BaseResponse<PapersType>> {
		const response = await axios.get(API.QUESTIONPAPER, {
			params: {
				skip,
				limit,
			},
		});
		return response.data;
	}

	static async getDetailPaper(id: string): Promise<BaseResponse<PapersDataType>> {
		const response = await axios.get(API.QUESTIONPAPER + `/${id}`, {});
		return response.data;
	}

	static async getJobs(skip: number, limit: number): Promise<BaseResponse<JobsType>> {
		const response = await axios.get(API.JOBS, {
			params: {
				skip,
				limit,
			},
		});
		return response.data;
	}

	static async getDetailJob(id: string): Promise<BaseResponse<JobDataType>> {
		const response = await axios.get(API.JOBS + `/${id}`);
		return response.data;
	}

	static async getBooks(skip: number, limit: number): Promise<BaseResponse<BooksType>> {
		const response = await axios.get(API.BOOKS, {
			params: {
				skip,
				limit,
			},
		});
		return response.data;
	}

	static async getDetailBook(id: string): Promise<BaseResponse<BookDataType>> {
		const response = await axios.get(API.BOOKS + `/${id}`, {});
		return response.data;
	}

	static async getFiles(skip: number, limit: number): Promise<BaseResponse<FilesType>> {
		const response = await axios.get(API.PRACTICLEFILE, {
			params: {
				skip,
				limit,
			},
		});
		return response.data;
	}

	static async getDetailPracticalFile(id: string): Promise<BaseResponse<FileDataType>> {
		const response = await axios.get(API.PRACTICLEFILE + `/${id}`, {});
		return response.data;
	}

	static async getNotes(skip: number, limit: number): Promise<BaseResponse<NotesType>> {
		const response = await axios.get(API.NOTES, {
			params: {
				skip,
				limit,
			},
		});
		return response.data;
	}

	static async getDetailNotes(id: string): Promise<BaseResponse<NotesDataType>> {
		const response = await axios.get(API.NOTES + `/${id}`, {});
		return response.data;
	}

	static async addNotes(formData: FormData): Promise<BaseResponse<string>> {
		const response = await axios.post(API.NOTES, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	}

	static async addPaper(formData: FormData): Promise<BaseResponse<string>> {
		const response = await axios.post(API.QUESTIONPAPER, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	}

	static async addPracticleFile(formData: FormData): Promise<BaseResponse<string>> {
		const response = await axios.post(API.PRACTICLEFILE, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	}

	static async addBooks(formData: FormData): Promise<BaseResponse<string>> {
		const response = await axios.post(API.BOOKS, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	}

	static async addJob(formData: FormData): Promise<BaseResponse<string>> {
		const response = await axios.post(API.JOBS, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	}

	static async setFavorite(
		id: string,
		update: boolean,
		type: FAVORITEENUM,
	): Promise<BaseResponse<string>> {
		const response = await axios.post(API.FAVOURITE, { id, update, type }, {});
		return response.data;
	}

	static async getFavorite(): Promise<BaseResponse<FavoriteDataType>> {
		const response = await axios.get(API.FAVOURITE);
		return response.data;
	}

	static async addAlerts(formData: FormData): Promise<BaseResponse<string>> {
		const response = await axios.post(API.ALERTS, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
		return response.data;
	}

	static async getAlerts(): Promise<BaseResponse<AlertType[]>> {
		const response = await axios.get(API.ALERTS);
		return response.data;
	}
}

export enum FAVORITEENUM {
	NOTE = 'note',
	PAPER = 'question_paper',
	BOOK = 'books',
	FILE = 'practicleFile',
	JOB = 'job',
}

export default ContentService;
