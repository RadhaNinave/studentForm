import { useState } from "react";

const GRADES = Array.from({ length: 12 }, (_, i) => String(i + 1));

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [students, setStudents] = useState([]);

  const clearForm = () => {
    setName("");
    setAge("");
    setGrade("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !age || !grade) return;

    const student = {
      id: Date.now() + Math.random(),
      name: name.trim(),
      age,
      grade,
    };

    setStudents((prev) => [...prev, student]);
    clearForm();
  };

  const removeStudent = (id) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div className="card shadow-sm border-0 form-card">
        <div className="card-body p-4">
          <div className="text-center mb-3">
            <h1 className="h3 title mb-1">Student Entry Form</h1>
            <p className="text-muted small mb-0">Add students and review the list below.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  className="form-control form-control-sm"
                  placeholder="e.g. MS Dhoni"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 col-md-4">
                <label htmlFor="age" className="form-label">Age</label>
                <input
                  id="age"
                  type="number"
                  name="age"
                  min="1"
                  className="form-control form-control-sm"
                  placeholder="e.g. 14"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>

              <div className="col-12 col-md-4">
                <label htmlFor="grade" className="form-label">Grade</label>
                <select
                  id="grade"
                  name="grade"
                  className="form-select form-select-sm"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                >
                  <option value="">Select grade</option>
                  {GRADES.map((g) => (
                    <option key={g} value={g}>
                      Class {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex gap-2 mt-3">
              <button type="submit" className="btn btn-primary btn-sm">
                Add Student
              </button>
              <button type="button" className="btn btn-light border btn-sm" onClick={clearForm}>
                Clear
              </button>
            </div>
          </form>

          <div className="mt-3">
            {students.length === 0 ? (
              <div className="empty-box text-center">No students added yet.</div>
            ) : (
              <div className="student-table table-responsive">
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Grade</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((s) => (
                      <tr key={s.id}>
                        <td>{s.name}</td>
                        <td>{s.age}</td>
                        <td>Class {s.grade}</td>
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-remove btn-sm"
                            onClick={() => removeStudent(s.id)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
