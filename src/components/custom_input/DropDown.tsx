import { useState } from 'react';

export const DropDown = ({
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
					'inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				}
				type="button"
				// ref={catMenu}
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

export const InputDropDown = ({
	title,
	options,
	className,
	required = false,
	value,
	onChange,
	name,
	setValue,
}: {
	title: string;
	options: string[];
	className?: string;
	required?: boolean;
	value: string;
	onChange?: React.ChangeEventHandler<HTMLSelectElement>;
	name?: string;
	setValue?: React.Dispatch<React.SetStateAction<string>>;
}) => {
	// const [selected, setSelected] = useState<string>('');

	return (
		<select
			name={name}
			id="dropdownDefaultButton"
			data-dropdown-toggle="dropdown"
			value={value}
			required={required}
			onChange={onChange}
			className={
				className ??
				'dark:shadow-sm-light block inline-flex w-full items-center rounded-lg border border-gray-300 bg-blue-700 bg-gray-50 p-2.5 px-5 py-2.5 text-center text-sm font-medium text-gray-900 text-white shadow-sm hover:bg-blue-800 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-blue-500 dark:border-gray-600 dark:bg-blue-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:hover:bg-blue-700 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:ring-blue-800'
			}
		>
			<option value="" disabled>
				{title}
			</option>
			{options.map((option, key) => {
				return (
					<option
						key={key}
						className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
						onClick={() => setValue && setValue(option)}
					>
						{option}
					</option>
				);
			})}
		</select>
	);
};
