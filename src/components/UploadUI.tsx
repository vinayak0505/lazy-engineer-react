const UploadUI = ({
	children,
	setFile,
	accept = '*/*',
	className = '',
	required = false,
	id,
	name,
}: {
	children: JSX.Element;
	setFile: React.Dispatch<React.SetStateAction<File | null>>;
	accept?: string;
	className?: string;
	required?: boolean;
	id?: string;
	name?: string;
}) => (
	<div className="relative">
		<input
			className={className + ' absolute z-10 h-full w-full cursor-pointer opacity-0'}
			type="file"
			id={id}
			name={name}
			required={required}
			accept={accept}
			onChange={(e) => {
				if (e.target.files) {
					setFile(e.target.files[0]);
				}
			}}
		/>
		{children}
	</div>
);
export default UploadUI;
