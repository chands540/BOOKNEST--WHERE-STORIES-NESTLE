import { Spinner } from 'react-bootstrap';

const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="loader-container">
      <div className="text-center">
        <Spinner animation="border" className="spinner-border-custom" />
        <p className="loading-text">{text}</p>
      </div>
    </div>
  );
};

export default Loader;