import Button from "./Buttons/Button.jsx";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { object } from "prop-types";

/**
 * Error Page allowing the user to reload the page
 *
 * @param props {object} error object
 * @returns {JSX.Element}
 * @constructor
 */
const ErrorPage = (props) => (
  <div className="home">
    <div className="page error-page">
      <h1>Oops!</h1>
      {props.error}
      <Button primary label="Reload Page" icon={faRotateRight} onClick={() => {location.reload() }} />
    </div>
  </div>
);

ErrorPage.propTypes = {
  /** error object */
  error: object.isRequired,
}

export default ErrorPage;

