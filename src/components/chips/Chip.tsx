const Chip = ({ title, onRemove }: { title: string; onRemove?: () => void }) => {
	return (
		<span
			id="badge-dismiss-default"
			className="mb-2 me-2 inline-flex items-center rounded bg-blue-100 px-2 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300"
		>
			{title}
			{onRemove && (
				<button
					type="button"
					className="ms-2 inline-flex items-center rounded-sm bg-transparent p-1 text-sm text-blue-400 hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
					data-dismiss-target="#badge-dismiss-default"
					aria-label="Remove"
					onClick={onRemove}
				>
					<svg
						className="h-2 w-2"
						aria-hidden="true"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 14 14"
					>
						<path
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
						/>
					</svg>
					<span className="sr-only">Remove badge</span>
				</button>
			)}
		</span>
	);
};

export default Chip;
