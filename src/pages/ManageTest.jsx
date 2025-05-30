import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "../components/ui/Button.jsx";
import { Card } from "../components/ui/Card.jsx";
import {
  Pencil,
  Trash2,
  Search,
  UserCheck,
  UserX,
  CheckSquare,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

// Dummy students for assignment demo
const dummyStudents = [
  { _id: "s1", name: "Alice Johnson", email: "alice@example.com" },
  { _id: "s2", name: "Bob Smith", email: "bob@example.com" },
  { _id: "s3", name: "Charlie Brown", email: "charlie@example.com" },
];

// Dummy test series for demo
const dummyTests = [
  {
    _id: "t1",
    title: "Aptitude Test 1",
    description: "Basic aptitude questions",
    isActive: true,
    questions: [
      {
        id: "q1",
        text: "What is 2+2?",
        options: ["3", "4", "5", "6"],
        correctAnswerIndex: 1,
      },
      {
        id: "q2",
        text: "Capital of France?",
        options: ["London", "Berlin", "Paris", "Rome"],
        correctAnswerIndex: 2,
      },
    ],
    assignedStudents: ["s1", "s3"],
  },
];

const ManageTest = () => {
  const [tests, setTests] = useState(dummyTests);
  const [students, setStudents] = useState(dummyStudents);
  const [search, setSearch] = useState("");
  const [filteredTests, setFilteredTests] = useState(dummyTests);

  const [showForm, setShowForm] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    // In real, fetch tests and students from API
    setFilteredTests(
      tests.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, tests]);

  // --- CRUD for Test Series ---

  const saveTest = (test) => {
    if (test._id) {
      // Update existing test
      setTests((prev) =>
        prev.map((t) => (t._id === test._id ? { ...test } : t))
      );
    } else {
      // Create new test
      test._id = Date.now().toString();
      test.assignedStudents = [];
      setTests((prev) => [test, ...prev]);
    }
    setShowForm(false);
  };

  const deleteTest = (id) => {
    if (confirm("Are you sure you want to delete this test series?")) {
      setTests((prev) => prev.filter((t) => t._id !== id));
    }
  };

  const toggleTestStatus = (id) => {
    setTests((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, isActive: !t.isActive } : t
      )
    );
  };

  // --- Assign test to students ---

  const [assignTestId, setAssignTestId] = useState(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  const openAssignModal = (test) => {
    setAssignTestId(test._id);
    setSelectedStudentIds(test.assignedStudents || []);
    setShowAssignModal(true);
  };

  const toggleStudentSelection = (studentId) => {
    setSelectedStudentIds((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const saveAssignments = () => {
    setTests((prev) =>
      prev.map((t) =>
        t._id === assignTestId ? { ...t, assignedStudents: selectedStudentIds } : t
      )
    );
    setShowAssignModal(false);
  };

  return (
    <section className="p-6">
        <Helmet>
      <title>Test Series | Kaidhun Institue Of Study</title>
      <meta name="description" content="Create and manage test series for various government job exams like SSC, Railways, and Banking." />
      <meta name="keywords" content="test series, SSC mock tests, online exams, coaching tests, government exam preparation" />
    </Helmet>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Manage Test Series</h2>
        <Button
          onClick={() => {
            setSelectedTest(null);
            setShowForm(true);
          }}
        >
          + Add Test Series
        </Button>
      </div>

      <div className="flex items-center mb-6 gap-2 max-w-md">
        <Search className="text-gray-400" />
        <input
          type="text"
          placeholder="Search test series"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTests.map((test) => (
          <Card
            key={test._id}
            className="p-4 shadow-md rounded-xl bg-white border hover:shadow-xl transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold">{test.title}</h3>
                <p className="text-gray-600 text-sm mb-1">{test.description}</p>
                <p className="text-sm mb-1">
                  <strong>Status:</strong>{" "}
                  {test.isActive ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Inactive</span>
                  )}
                </p>
                <p className="text-sm">
                  <strong>Assigned Students:</strong> {test.assignedStudents.length}
                </p>
              </div>

              <div className="flex flex-col gap-2 items-center">
                <button
                  onClick={() => {
                    setSelectedTest(test);
                    setShowForm(true);
                  }}
                  title="Edit Test"
                >
                  <Pencil className="w-5 h-5 text-blue-600" />
                </button>

                <button
                  onClick={() => deleteTest(test._id)}
                  title="Delete Test"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>

                <button
                  onClick={() => toggleTestStatus(test._id)}
                  title={test.isActive ? "Deactivate Test" : "Activate Test"}
                >
                  {test.isActive ? (
                    <CheckSquare className="w-6 h-6 text-green-600" />
                  ) : (
                    <CheckSquare className="w-6 h-6 text-gray-400" />
                  )}
                </button>

                <button
                  onClick={() => openAssignModal(test)}
                  title="Assign Test to Students"
                >
                  <UserCheck className="w-6 h-6 text-indigo-600" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Test Form Modal */}
      {showForm && (
        <TestFormModal
          test={selectedTest}
          onClose={() => setShowForm(false)}
          onSave={saveTest}
        />
      )}

      {/* Assign Test Modal */}
      {showAssignModal && (
        <AssignTestModal
          students={students}
          selectedStudentIds={selectedStudentIds}
          toggleStudentSelection={toggleStudentSelection}
          onClose={() => setShowAssignModal(false)}
          onSave={saveAssignments}
        />
      )}
    </section>
  );
};

export default ManageTest;

// ------------ Test Form Modal -------------

function TestFormModal({ test, onClose, onSave }) {
  const [title, setTitle] = useState(test?.title || "");
  const [description, setDescription] = useState(test?.description || "");
  const [questions, setQuestions] = useState(
    test?.questions?.map((q) => ({ ...q })) || []
  );

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: "",
        options: ["", "", "", ""],
        correctAnswerIndex: null,
      },
    ]);
  };

  const removeQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestionText = (id, newText) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, text: newText } : q))
    );
  };

  const updateOptionText = (questionId, optionIndex, newOptionText) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, i) =>
                i === optionIndex ? newOptionText : opt
              ),
            }
          : q
      )
    );
  };

  const setCorrectAnswer = (questionId, index) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, correctAnswerIndex: index } : q
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Test Title is required");
      return;
    }

    if (questions.length === 0) {
      alert("Add at least one question");
      return;
    }

    for (const q of questions) {
      if (!q.text.trim()) {
        alert("Question text cannot be empty");
        return;
      }
      if (q.options.some((opt) => !opt.trim())) {
        alert("All options must be filled");
        return;
      }
      if (q.correctAnswerIndex === null) {
        alert("Select correct answer for all questions");
        return;
      }
    }

    onSave({
      _id: test?._id,
      title: title.trim(),
      description: description.trim(),
      questions,
      isActive: test?.isActive ?? true,
      assignedStudents: test?.assignedStudents || [],
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-10 z-50 overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg max-w-3xl w-full shadow-lg"
      >
        <h3 className="text-xl font-bold mb-4">
          {test ? "Edit Test Series" : "Add Test Series"}
        </h3>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Test Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
        </div>

        <div className="mb-4">
          <h4 className="font-semibold mb-2">Questions</h4>

          {questions.map((q, i) => (
            <div
              key={q.id}
              className="border p-4 rounded mb-4 relative bg-gray-50"
            >
              <button
                type="button"
                onClick={() => removeQuestion(q.id)}
                className="absolute top-2 right-2 text-red-600 font-bold"
                title="Remove Question"
              >
                &times;
              </button>

              <label className="block mb-2 font-semibold">
                Question {i + 1}
              </label>
              <input
                type="text"
                value={q.text}
                onChange={(e) => updateQuestionText(q.id, e.target.value)}
                className="border rounded px-3 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Question text"
                required
              />

              <div>
                <label className="block mb-1 font-semibold">Options</label>
                {q.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      name={`correctAnswer-${q.id}`}
                      checked={q.correctAnswerIndex === idx}
                      onChange={() => setCorrectAnswer(q.id, idx)}
                      className="accent-blue-600"
                      required
                    />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) =>
                        updateOptionText(q.id, idx, e.target.value)
                      }
                      className="border rounded px-2 py-1 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Option ${idx + 1}`}
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <Button
            type="button"
            onClick={addQuestion}
            className="bg-green-600 hover:bg-green-700"
          >
            + Add Question
          </Button>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save Test Series</Button>
        </div>
      </form>
    </div>
  );
}

// ------------ Assign Test Modal -------------

function AssignTestModal({
  students,
  selectedStudentIds,
  toggleStudentSelection,
  onClose,
  onSave,
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start pt-10 z-50 overflow-auto">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <h3 className="text-xl font-bold mb-4">Assign Test to Students</h3>

        <div className="max-h-72 overflow-y-auto mb-4 border rounded p-2">
          {students.length === 0 && <p>No students available.</p>}

          {students.map((student) => (
            <label
              key={student._id}
              className="flex items-center gap-3 mb-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedStudentIds.includes(student._id)}
                onChange={() => toggleStudentSelection(student._id)}
                className="accent-indigo-600"
              />
              <span>
                {student.name} ({student.email})
              </span>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save Assignments</Button>
        </div>
      </div>
    </div>
  );
}
