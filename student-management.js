import React, { useState, useEffect } from "react";
import "./App.css";

function App() {

  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [course, setCourse] = useState("");
  const [search, setSearch] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("students"));
    if (data) {
      setStudents(data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = () => {
    if (name === "" || roll === "" || course === "") {
      alert("Please fill all fields");
      return;
    }

    if (editIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[editIndex] = { name, roll, course };
      setStudents(updatedStudents);
      setEditIndex(null);
    } else {
      const newStudent = { name, roll, course };
      setStudents([...students, newStudent]);
    }

    setName("");
    setRoll("");
    setCourse("");
  };

  const deleteStudent = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  const editStudent = (index) => {
    setName(students[index].name);
    setRoll(students[index].roll);
    setCourse(students[index].course);
    setEditIndex(index);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">

      <h1>Student Management Dashboard</h1>

      <input
        placeholder="Search Student"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />

      <input
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Roll Number"
        value={roll}
        onChange={(e) => setRoll(e.target.value)}
      />

      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <button onClick={addStudent}>
        {editIndex !== null ? "Update Student" : "Add Student"}
      </button>

      <h2>Student List</h2>

      <ul>
        {filteredStudents.map((student, index) => (
          <li key={index}>
            {student.name} | {student.roll} | {student.course}

            <div>
              <button onClick={() => editStudent(index)}>Edit</button>
              <button onClick={() => deleteStudent(index)}>Delete</button>
            </div>

          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;