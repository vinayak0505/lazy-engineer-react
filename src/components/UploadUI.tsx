const UploadUI = ({
	children,
	setFile,
	accept = '*/*',
	className = '',
	required = false
}: {
	children: JSX.Element;
	setFile: React.Dispatch<React.SetStateAction<File | null>>;
	accept?: string;
	className?: string;
	required?: boolean;
}) => (
	<div className="relative">
		<input
			className={className + ' absolute z-10 opacity-0 cursor-pointer w-full h-full'}
			type="file"
			id="avatar"
			name="avatar"
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
