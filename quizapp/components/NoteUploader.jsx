"use client"; // If using Next.js App Router
import { useState } from "react";

export default function NotesUpload() {
  const [file, setFile] = useState(null);
  const [note, setNote] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    if (!file && !note) return alert("Please upload a file or write a note.");

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("note", note);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Note uploaded successfully!");
        setFile(null);
        setNote("");
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading note:", error);
    }
  };

  return (
    <section className="max-w-lg mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md my-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">
        Upload Your Notes
      </h2>
      <form onSubmit={handleUpload} className="flex flex-col space-y-4">
        <textarea
          className="p-3 border rounded-md w-full dark:bg-gray-700 dark:text-white"
          placeholder="Write your note here..."
          value={note}
          onChange={handleNoteChange}
        ></textarea>
        <input
          type="file"
          onChange={handleFileChange}
          className="p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </section>
  );
}
