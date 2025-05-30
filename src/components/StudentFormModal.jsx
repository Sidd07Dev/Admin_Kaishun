import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "./ui/Button.jsx";
import axios from "axios";

const StudentFormModal = ({ student, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name,
        email: student.email,
        phone: student.phone,
      });
    }
  }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (student) {
        await axios.put(`/api/students/${student._id}`, formData);
      } else {
        await axios.post("/api/students", formData);
      }
      onSave();
      onClose();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <Dialog.Overlay className="fixed inset-0 bg-black/30" />
      <div className="bg-white rounded-lg p-6 w-full max-w-lg z-50 shadow-xl">
        <Dialog.Title className="text-xl font-bold mb-4">
          {student ? "Edit Student" : "Add Student"}
        </Dialog.Title>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            type="text"
            placeholder="Full Name"
            value={formData.name}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={formData.email}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            required
            type="text"
            placeholder="Phone"
            value={formData.phone}
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit">{student ? "Update" : "Create"}</Button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};

export default StudentFormModal;
