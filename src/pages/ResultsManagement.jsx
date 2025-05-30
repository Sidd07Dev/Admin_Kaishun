import React, { useState, useEffect } from "react";
import { Download, Search } from "lucide-react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const dummyResults = [
  {
    _id: "r1",
    studentName: "Alice Johnson",
    testTitle: "Math Test Series 2025",
    date: "2025-05-25",
    score: 92,
    totalMarks: 100,
    details: [
      { question: "Q1", answer: "B", correct: true },
      { question: "Q2", answer: "C", correct: true },
      { question: "Q3", answer: "A", correct: false },
    ],
  },
  {
    _id: "r2",
    studentName: "Bob Smith",
    testTitle: "Math Test Series 2025",
    date: "2025-05-25",
    score: 85,
    totalMarks: 100,
    details: [
      { question: "Q1", answer: "B", correct: true },
      { question: "Q2", answer: "B", correct: false },
      { question: "Q3", answer: "A", correct: true },
    ],
  },
  {
    _id: "r3",
    studentName: "Clara Lee",
    testTitle: "Science Test Series 2025",
    date: "2025-05-27",
    score: 97,
    totalMarks: 100,
    details: [
      { question: "Q1", answer: "D", correct: true },
      { question: "Q2", answer: "C", correct: true },
      { question: "Q3", answer: "D", correct: true },
    ],
  },
  // Add more results as needed
];

export default function ResultsManagement() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // TODO: Replace with real API call
    setResults(dummyResults);
  }, []);

  // Filtered results based on search (student name or test title)
  const filteredResults = results.filter(
    (r) =>
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.testTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Top 3 performers
  const topPerformers = [...results]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  // Generate PDF report for one student result
  const generatePDF = (result) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("SS Beverages Pvt. Ltd.", 14, 15);
    doc.setFontSize(12);
    doc.text("Student Result Report", 14, 25);
    doc.setFontSize(10);
    doc.text(`Student: ${result.studentName}`, 14, 35);
    doc.text(`Test: ${result.testTitle}`, 14, 42);
    doc.text(`Date: ${result.date}`, 14, 49);
    doc.text(`Score: ${result.score} / ${result.totalMarks}`, 14, 56);

    // Prepare table data
    const tableColumn = ["Question", "Answer", "Correct"];
    const tableRows = result.details.map((d) => [
      d.question,
      d.answer,
      d.correct ? "Yes" : "No",
    ]);

    doc.autoTable({
      startY: 62,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
    });

    doc.setFontSize(9);
    doc.text(
      "This is system generated so signature not required.",
      14,
      doc.lastAutoTable.finalY + 10
    );

    doc.save(`${result.studentName}_Result_${result.testTitle}.pdf`);
  };

  return (
    <div className="p-6 bg-white rounded shadow max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Results Management</h2>

      {/* Search */}
      <div className="flex items-center mb-6 gap-3 max-w-md">
        <Search className="text-gray-500" />
        <input
          type="text"
          placeholder="Search by student or test title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      {/* Results Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-md text-left">
          <thead className="bg-indigo-100">
            <tr>
              <th className="px-4 py-2 border-r border-gray-300">Student</th>
              <th className="px-4 py-2 border-r border-gray-300">Test Title</th>
              <th className="px-4 py-2 border-r border-gray-300">Date</th>
              <th className="px-4 py-2 border-r border-gray-300">Score</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-gray-500 py-6"
                >
                  No results found.
                </td>
              </tr>
            ) : (
              filteredResults.map((res) => (
                <tr key={res._id} className="hover:bg-indigo-50">
                  <td className="px-4 py-3 border-t border-gray-300">
                    {res.studentName}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-300">
                    {res.testTitle}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-300">{res.date}</td>
                  <td className="px-4 py-3 border-t border-gray-300">
                    {res.score} / {res.totalMarks}
                  </td>
                  <td className="px-4 py-3 border-t border-gray-300">
                    <button
                      onClick={() => generatePDF(res)}
                      className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold"
                      title="Download PDF"
                    >
                      <Download size={18} /> Download
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Analytics: Top Performers */}
      <section className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Top Performers</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {topPerformers.map((student, idx) => (
            <div
              key={student._id}
              className="p-5 border border-indigo-200 rounded-lg bg-indigo-50 shadow-md"
            >
              <div className="text-indigo-700 font-bold text-3xl">{idx + 1}</div>
              <div className="mt-2 text-lg font-semibold">{student.studentName}</div>
              <div className="text-indigo-900">{student.testTitle}</div>
              <div className="mt-1 text-indigo-700 font-semibold text-xl">
                Score: {student.score} / {student.totalMarks}
              </div>
              <div className="text-sm text-indigo-600 mt-1">Date: {student.date}</div>
            </div>
          ))}
          {topPerformers.length === 0 && (
            <p className="text-gray-500 col-span-full">No results available yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
