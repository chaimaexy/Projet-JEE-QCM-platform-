import React, { useState, useEffect, useRef } from 'react';
import './Results.css';
import api from '../../api/axiosConfig';
import $ from 'jquery';
import 'datatables.net';

const Results = ({ userId }) => {
  const [results, setResults] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.get(`/api/v1/results/creator/${userId}`);
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [userId]);

  useEffect(() => {
    if (results.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [results]);

  return (
    <div className='results container'>
      <h1>Results</h1>
      <div className='frame'>
        <table ref={tableRef} className="display">
          <thead>
            <tr>
              <th>Exam Title</th>
              <th>User Name</th>
              <th>Score</th>
              <th>Passed At</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((result, index) => (
                <tr key={index}>
                  <td>{result.examTitle}</td>
                  <td>{result.userName}</td>
                  <td>{result.score}</td>
                  <td>{new Date(result.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  <p>No exams of yours were passed yet</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Results;
