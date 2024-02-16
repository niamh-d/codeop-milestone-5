import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  let [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  const getStudents = () => {
    fetch("/api/students")
      .then(response => response.json())
      .then(students => {
        setStudents(students);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <h1>CodeOp's Facebook</h1>
    </div>
  );
}
