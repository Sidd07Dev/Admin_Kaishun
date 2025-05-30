import React, { useState, useEffect } from "react";
import { Pencil, Eye, Trash2, ToggleRight, ToggleLeft, Search } from "lucide-react";
import { Button } from "../components/ui/Button.jsx";
import { Card } from "../components/ui/Card.jsx";
import StudentFormModal from "../components/StudentFormModal";
import { Helmet } from "react-helmet-async";
const dummyStudents = [
  {
    _id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "123-456-7890",
    isActive: true,
  },
  {
    _id: "2",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "234-567-8901",
    isActive: false,
  },
  {
    _id: "3",
    name: "Carol Davis",
    email: "carol@example.com",
    phone: "345-678-9012",
    isActive: true,
  },
];

const Student = () => {
  const [students, setStudents] = useState(dummyStudents);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState(dummyStudents);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setFiltered(
      students.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) || s.email.includes(search)
      )
    );
  }, [search, students]);

  const handleToggleStatus = (id) => {
    setStudents((prev) =>
      prev.map((student) =>
        student._id === id ? { ...student, isActive: !student.isActive } : student
      )
    );
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents((prev) => prev.filter((student) => student._id !== id));
    }
  };

  const handleSave = (updatedStudent) => {
    if (updatedStudent._id) {
      // Update existing
      setStudents((prev) =>
        prev.map((student) => (student._id === updatedStudent._id ? updatedStudent : student))
      );
    } else {
      // Add new
      const newStudent = {
        ...updatedStudent,
        _id: Date.now().toString(),
        isActive: true,
      };
      setStudents((prev) => [newStudent, ...prev]);
    }
    setShowForm(false);
  };

  return (
    <section className="p-6">
        <Helmet>
      <title>Manage Students | Kaishun Institute Of Study</title>
      <meta name="description" content="View, approve, and manage student accounts and details." />
      <meta name="keywords" content="student list, student management, coaching students, student portal, SS Coaching" />
    </Helmet>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Manage Students</h2>
        <Button
          onClick={() => {
            setSelectedStudent(null);
            setShowForm(true);
          }}
        >
          + Add Student
        </Button>
      </div>

      <div className="flex items-center mb-4 gap-2">
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((student) => (
          <Card key={student._id} className="p-4 shadow-md rounded-xl bg-white border hover:shadow-xl transition">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">{student.name}</h3>
                <p className="text-gray-600 text-sm">{student.email}</p>
                <p className="text-sm mt-1">
                  <strong>Phone:</strong> {student.phone}
                </p>
                <p className="text-sm">
                  <strong>Status:</strong> {student.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <button onClick={() => { setSelectedStudent(student); setShowForm(true); }}>
                  <Pencil className="w-5 h-5 text-blue-600" />
                </button>
                <button onClick={() => alert(JSON.stringify(student, null, 2))}>
                  <Eye className="w-5 h-5 text-green-600" />
                </button>
                <button onClick={() => handleDelete(student._id)}>
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
                <button onClick={() => handleToggleStatus(student._id)}>
                  {student.isActive ? (
                    <ToggleRight className="w-6 h-6 text-green-600" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {showForm && (
        <StudentFormModal
          student={selectedStudent}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </section>
  );
};

export default Student;
