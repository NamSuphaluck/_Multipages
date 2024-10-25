
import PropTypes from "prop-types";

function Variable({ name, value, setValue }) {
  return (
    <div>
      <label>{name}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
      />
    </div>
  );
}

Variable.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default Variable;
