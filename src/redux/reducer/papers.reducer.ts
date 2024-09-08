import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import ContentService, { BaseResponse, FAVORITEENUM } from '../service/content.service';
import { UserType } from './auth.reducer';

export type PapersDataType = {
	_id: string;
	userId: string | UserType;
	title: string;
	about: string;
	semester: string;
	subject: string;
	unit: string;
	chapter: string;
	topic: string;
	tags: string[];
	mediaLink: string;
	imageLink: string;
	isFavorited?: boolean;
};
type InitialStateType = {
	loading: boolean;
	data: PapersDataType[];
	error: string | null;
	pagination: {
		canGetMore: boolean;
		limit: number;
		totalCount: number;
		skip: number;
	};
};
const initialState: InitialStateType = {
	loading: true,
	data: [],
	error: null,
	pagination: {
		canGetMore: false,
		limit: 10,
		totalCount: 0,
		skip: 0,
	},
};

export type ResponseType = {
	result: PapersDataType[];
	totalCount: number;
	skip: number;
	limit: number;
};

export const getPaper = createAsyncThunk<
	BaseResponse<ResponseType>,
	{ refresh?: boolean },
	{ state: RootState }
>('papers/getPaper', async ({ refresh = false }, thunkApi) => {
	const { skip, limit } = thunkApi.getState().papersReducer.pagination;
	const data = await ContentService.getPapers(refresh ? 0 : skip, limit);
	if (data.status !== 'success') throw new Error(data.message ?? 'Something went wrong');
	return data;
});

export const setPaperFav = createAsyncThunk<
	BaseResponse<string>,
	{ id: string; isFavorited: boolean },
	{ state: RootState }
>('papers/setFavorite', async ({ id, isFavorited }, thunkApi) => {
	const { user, error } = thunkApi.getState().authReducer;
	if (user == null) throw new Error(error ?? 'User not Logined');
	const data = await ContentService.setFavorite(id, isFavorited, FAVORITEENUM.PAPER);
	if (data.status !== 'success') throw new Error(data.message ?? 'Something went wrong');
	return data;
});

const papersSlice = createSlice({
	name: 'papers',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder: ActionReducerMapBuilder<InitialStateType>): void => {
		builder
			.addCase(getPaper.pending, (state) => {
				state.loading = true;
			})
			.addCase(getPaper.rejected, (state, action) => {
				state.loading = false;
				state.error = action?.error?.message ?? null;
			})
			.addCase(getPaper.fulfilled, (state, action) => {
				const data = action?.payload?.data?.result ?? [];
				state.loading = false;
				state.data = action.meta.arg.refresh ? data : state.data.concat(data);
				state.error = null;
				state.pagination = {
					canGetMore:
						(action?.payload?.data?.totalCount ?? 0) > (action?.payload?.data?.skip ?? 0),
					limit: action?.payload?.data?.limit ?? 10,
					totalCount: action?.payload?.data?.totalCount ?? 0,
					skip: action?.payload?.data?.totalCount ?? 0,
				};
			})
			.addCase(setPaperFav.fulfilled, (state, action) => {
				state.data = state.data.map((paper) => {
					if (paper._id === action?.meta.arg.id)
						paper.isFavorited = action?.meta.arg.isFavorited;
					return paper;
				});
			})
			.addCase(setPaperFav.rejected, (state, action) => {
				state.error = action?.error?.message ?? null;
			});
	},
});

export const papersAction = papersSlice.actions;
export const papersReducer = papersSlice.reducer;
export const papersSelector = (root: RootState) => root.papersReducer;
