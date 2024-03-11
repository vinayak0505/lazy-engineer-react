import { useState, useRef } from 'react';

export const DropDown = ({
	title,
	dropDownOption,
	className
}: {
	title: string;
	dropDownOption: { name: string; onSelected: () => void }[];
	className?: string;
}) => {
	const [open, setOpen] = useState(false);

	const catMenu = useRef<HTMLElement>(null);

	const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
		setOpen(false);
		dropDownOption[index].onSelected();
	};

	const closeOpenMenus = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
		if (open && !catMenu?.current?.contains(e.currentTarget)) {
			setOpen(false);
		}
	};

	return (
		<>
			<button
				id="dropdownDefaultButton"
				data-dropdown-toggle="dropdown"
				className={
					className ??
					'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
				}
				type="button"
				// ref={catMenu}
				onClick={() => setOpen(!open)}
			>
				{title + ' '}
				<svg
					className="w-2.5 h-2.5 ms-3"
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
					'z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700' +
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
