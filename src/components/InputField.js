import PropTypes from "prop-types";

export const InputField = ({
	id,
	label,
	type,
	name,
	value,
	onChange,
	error,
	min,
	max,
	required,
}) => {
	InputField.propTypes = {
		id: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		onChange: PropTypes.func.isRequired,
		error: PropTypes.string,
		min: PropTypes.number,
		max: PropTypes.number,
		required: PropTypes.bool,
	};

	InputField.defaultProps = {
		error: null,
		min: undefined,
		max: undefined,
		required: false,
	};
	return (
		<div>
			<label htmlFor={id}>
				{label}
				{required && <span aria-hidden="true">*</span>}
			</label>
			<input
				id={id}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				min={min}
				max={max}
				aria-required={required}
				aria-invalid={!!error}
				aria-describedby={error ? `${id}-error` : undefined}
			/>
			{error && (
				<span role="alert" id={`${id}-error`} style={{ color: "red" }}>
					{error}
				</span>
			)}
		</div>
	);
};
