import './Button.scss';
import { bool, func, object, string } from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Button component
 * comes with distinct styles for primary and secondary buttons
 * @param {object} props see propTypes
 * @returns {JSX.Element} the Button
 * @constructor
 */
const Button = (props) => {
  const { icon, iconRight, label, onClick, primary, secondary, text } = props;

  // add css classes button (and primary or secondary)
  let cssClass = 'button';
  if (primary) {
    cssClass += ' primary';
  } else if (secondary) {
    cssClass += ' secondary';
  } else if (text) {
    cssClass += ' text-button';
  }

  return (
    <button type="button" name={label} onClick={onClick}>
      <div className={cssClass}>
        {(icon && !iconRight) ? <FontAwesomeIcon className="fa-icon-left" icon={icon} /> : ''}
        <span>{label}</span>
        {(icon && iconRight) ? <FontAwesomeIcon className="fa-icon-right" icon={icon} /> : ''}
      </div>
    </button>
  );
}

Button.propTypes = {
  /** fontawesome icon object to be displayed (optional) */
  icon: object,
  /** display icon on the right of label? (Default is left) */
  iconRight: bool,
  /** button label */
  label: string.isRequired,
  /** function to be executed on click */
  onClick: func,
  /** optional boolean to apply styling for primary button */
  primary: bool,
  /** optional boolean to apply styling for secondary button */
  secondary: bool,
}

export default Button;
