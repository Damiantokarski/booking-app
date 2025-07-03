import PropTypes from "prop-types";

export const SelectField = ({
	id,
	label,
	name,
	value,
	onChange,
	options,
	error,
	required,
}) => {
	SelectField.propTypes = {
		id: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		onChange: PropTypes.func.isRequired,
		options: PropTypes.arrayOf(PropTypes.string).isRequired,
		error: PropTypes.string,
		required: PropTypes.bool,
	};

	SelectField.defaultProps = {
		error: null,
		required: false,
	};

	return (
		<div>
			<label htmlFor={id}>
				{label}
				{required && <span aria-hidden="true">*</span>}
			</label>
			<select
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				aria-required={required}
				aria-invalid={!!error}
				aria-describedby={error ? `${id}-error` : undefined}
			>
				{!required && <option value="">Select an option</option>}
				{options.map((opt) => (
					<option key={opt} value={opt}>
						{opt}
					</option>
				))}
			</select>
			{error && (
				<span role="alert" id={`${id}-error`} style={{ color: "red" }}>
					{error}
				</span>
			)}
		</div>
	);
};
