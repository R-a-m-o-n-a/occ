import { ClipLoader } from "react-spinners";

const loaderStyle = {
  display: "block",
  margin: "1rem auto",
};

/**
 * Loading animation
 *
 * @returns {JSX.Element} a div with the word Loading and an animation
 * @constructor
 */
const Loading = () => {

  return (
    <div className="loading-box" style={{marginTop: '4rem'}}>
      <h3>Loading...</h3>
      <ClipLoader cssOverride={loaderStyle} />
    </div>
  );
}

export default Loading;
