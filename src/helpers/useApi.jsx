import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";

function useApi(urls = "") {
  const { token } = useSelector((s) => s.users);

  const [requests, setRequests] = useState({
    baseURL: process.env.REACT_APP_DATABASE_VERCEL || urls,
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${token.token}`,

      // Authorization: `Bearer ${token.token}`,
      //'role': data[0].roles
    },
  });

  useEffect(() => {
    setRequests({
      ...requests,
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token.token}`,

        // Authorization: `Bearer ${token.token}`,
        // 'role': token.role
      },
    });
  }, []);

  return axios.create(requests);
}

function useApiMulti(urls = "") {
  const { token } = useSelector((s) => s.users);
  const [requests, setRequests] = useState({
    baseURL: process.env.REACT_APP_DATABASE_VERCEL || urls,
    headers: {
      "Content-type": "multipart/form-data",
      Authorization: `Bearer ${token.token}`,
      role: token.role,
    },
  });

  useEffect(() => {
    setRequests({
      ...requests,
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${token.token}`,
        // 'role': token.role
      },
    });
  }, []);
  return axios.create(requests);
}

export { useApiMulti };
export default useApi;
