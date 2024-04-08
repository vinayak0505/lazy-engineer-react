import { useEffect, useState } from 'react';
import ContentService, { FAVORITEENUM } from '../../redux/service/content.service';
import { NavLink, useParams } from 'react-router-dom';
import Chip from '../../components/chips/Chip';
import { UserType } from '../../redux/reducer/auth.reducer';
import FavoriteRounded from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useAppDispatch } from '../../store';
import { helperAction } from '../../redux/reducer/helper.reducer';
import { JobDataType } from '../../redux/reducer/jobs.reducer';

const JobDetailPage = () => {
	const id = useParams().id;
	const dispatch = useAppDispatch();

	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<JobDataType | null>(null);

	useEffect(() => {
		(async () => {
			if (id == undefined) return;
			try {
				const res = await ContentService.getDetailJob(id);
				if (res.status != 'success') throw new Error(res.message ?? 'Something went wrong');
				setData(res.data);
			} catch (error: any) {
				dispatch(helperAction.customToast(error?.message ?? 'Something went wrong'));
			}
			setLoading(false);
		})();
	}, []);

	const onFavoriteClick = async () => {
		const checked = data?.isFavorited;
		if (checked == null || id == null || data == null) return;
		const res = await ContentService.setFavorite(id, !checked, FAVORITEENUM.JOB);
		if (res.status == 'success') setData({ ...data, isFavorited: !checked });
	};

	if (loading) return <>Loading</>;
	return (
		<div className="text-white">
			<div className="flex  mb-4 sm:mb-0">
				<img
					className=" w-10 mr-4 object-contain h-min rounded border"
					src={data?.mediaLink}
					alt=""
				/>
				<h2 className="mb-2 text-3xl font-bold text-white">{data?.title}</h2>
			</div>

			<div className="flex flex-wrap mt-4 flex-col-reverse sm:flex-nowrap sm:flex-row mb-4 sm:mb-0">
				<div>
					<NavLink to={`/profile/${(data?.userId as UserType)?._id}`}>
						<Separator title="Uploaded By" value={(data?.userId as UserType)?.fullName} />
					</NavLink>
					<Separator title="Company" value={data?.company} />
					<Separator title="Location" value={data?.location} />
					<Separator title="Date Posted" value={data?.datePosted} />
					<Separator title="Job Type" value={data?.jobType} />
					<Separator title="Experience Level" value={data?.experienceLevel} />
					<Separator className="mb-4" title="Salary Range" value={data?.expectedSalary} />
					{(data?.isFavorited === true || data?.isFavorited === false) && (
						<button
							type="button"
							onClick={(e) => {
								e.preventDefault();
								onFavoriteClick();
							}}
							className="mb-4 inline-flex items-center text-gray-900  bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
						>
							{data.isFavorited ? (
								<>
									Remove From Favourite
									<FavoriteRounded className="ml-2  text-red-500" />
								</>
							) : (
								<>
									Add To Favourite
									<FavoriteBorderRounded className="ml-2 text-red-500" />
								</>
							)}
						</button>
					)}
					<a href={data?.applyLink} target="_blank" rel="noreferrer">
						<button
							type="button"
							className="inline-flex items-center  text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Apply
							<NavigateNextRoundedIcon className="ml-2" />
						</button>
					</a>
				</div>
				<img
					className=" w-80 mb-4 object-contain h-min rounded border"
					src={data?.imageLink}
					alt=""
				/>
			</div>

			<p className="text-xl font-bold text-white underline">Description </p>
			<p className="text-grey-100 text-xl mb-4">{data?.profile}</p>
			<p className="text-xl font-bold text-white underline">Skills Needed </p>
			<div className="mb-4 mt-4">
				{data?.skillsNeeded?.map((skill, index) => (
					<Chip key={index} title={skill} />
				))}
			</div>
			<p className="text-xl font-bold text-white underline">About Company </p>
			<p className="text-grey-100 text-xl mb-4">{data?.aboutCompany}</p>
		</div>
	);
};

const Separator = ({
	title,
	value,
	className
}: {
	title: string;
	value?: string;
	className?: string;
}) => {
	return (
		<p className={className}>
			<span className="text-xl font-bold text-white">{title} :- </span>
			<span className="text-grey-100 text-xl">{value}</span>
		</p>
	);
};
export default JobDetailPage;
