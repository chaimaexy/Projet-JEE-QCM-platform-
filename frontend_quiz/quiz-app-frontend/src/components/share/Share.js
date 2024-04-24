import React from 'react';
import './Share.css';
import { useLocation } from 'react-router-dom';

const Share = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const uniqueCode = searchParams.get('uniqueCode');

  return (
    <div className="share container">
        <form>
      <p>YOUR EXAM CODE IS READY !</p>
      <p>Unique Code: <span className='code-word'>{uniqueCode} </span> </p>
      <h4>share this code with people you want to pass your Quiz and view results in the <span className='result-word'>Result</span> section from the navigation bar</h4>

      </form>
    </div>
  );
};

export default Share;
