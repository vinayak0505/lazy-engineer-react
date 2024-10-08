import { useState } from 'react';

export const AddChip = ({
	title,
	dropDownOption,
	className,
}: {
	title: string;
	dropDownOption: { name: string; onSelected: () => void }[];
	className?: string;
}) => {
	const [open, setOpen] = useState(false);

	const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
		e.preventDefault();
		setOpen(false);
		dropDownOption[index].onSelected();
	};

	return (
		<>
			<button
				id="dropdownDefaultButton"
				data-dropdown-toggle="dropdown"
				className={
					className ??
					'me-2 inline-flex items-center rounded bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800 text-white dark:bg-blue-900 dark:text-blue-300'
				}
				type="button"
				onClick={() => setOpen(!open)}
			>
				{title + ' '}
				<svg
					className="ms-3 h-2.5 w-2.5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 10 6"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m1 1 4 4 4-4"
					/>
				</svg>
			</button>

			<div
				id="dropdown"
				className={
					'absolute z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700' +
					(open ? ' block' : ' hidden')
				}
			>
				<ul
					className="py-2 text-sm text-gray-700 dark:text-gray-200"
					aria-labelledby="dropdownDefaultButton"
				>
					{dropDownOption.map((option, key) => {
						return (
							<li key={key} onClick={(e) => handleClick(e, key)}>
								<div className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
									{option.name}
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default AddChip;
