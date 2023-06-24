import "./index.css";

const Switch = ({ rounded = false, isToggled, onToggle, disabled }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className={`slider ${rounded ? "rounded" : ""}`}></span>
    </label>
  );
};

export default Switch;
