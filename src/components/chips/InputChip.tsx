import { useMemo } from 'react';
import AddChip from './AddChip';
import Chip from './Chip';

const InputChip = ({
	options,
	selected,
	setSelected,
}: {
	options: string[];
	selected: string[];
	setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
	const addItem = (option: string) => {
		setSelected((prev) => [...prev, option]);
	};

	const removeItem = (option: string) => {
		setSelected((prev) => prev.filter((item) => item !== option));
	};

	const dropDownOption = useMemo(() => {
		const available = options.filter((option) => !selected.includes(option));
		return available.map((option: string) => {
			return {
				name: option,
				onSelected: () => addItem(option),
			};
		});
	}, [selected, options]);
	return (
		<>
			{selected.map((option) => (
				<Chip key={option} title={option} onRemove={() => removeItem(option)} />
			))}
			<AddChip title="Add" dropDownOption={dropDownOption} />
		</>
	);
};

export default InputChip;
