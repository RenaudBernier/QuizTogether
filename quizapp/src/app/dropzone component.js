"use client";

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.mjs';
import { sessionCreation } from "@/app/database/sessionCreation";

pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/build/pdf.worker.mjs';

export default function FileDropzone({ setStatus }) {
  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles[0]) {
      console.error('No file uploaded');
      return;
    }

    const fileData = await acceptedFiles[0].arrayBuffer();
    const pdfDoc = await pdfjsLib.getDocument({ data: fileData }).promise;
    let fullText = '';

    for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
      const page = await pdfDoc.getPage(pageNum);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(' ');
      fullText += pageText + '\n\n';
    }

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: fullText }),
      });
      const result = await response.json();
      await sessionCreation(result, setStatus);

      console.log('File uploaded:', result);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center cursor-pointer hover:border-blue-500 transition"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-500">Drop the files here...</p>
      ) : (
        <p>Drag & drop a PDF file here, or click to select file</p>
      )}
    </div>
  );
}
