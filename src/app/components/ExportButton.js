import axios from 'axios';
import React from 'react';
import { downloadIcon } from '../lib/icons';

const ExportButton = ({ books }) => {
  const handleDownload = async () => {
    try {
      const res = await axios.post('/api/export', JSON.stringify(books), {
        headers: { 'Content-Type': 'application/json' },
        responseType: 'blob',
      });
      const blob = res.data;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'books.csv';
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Failed to download the CSV');
    }
  };

  return <button className="rounded-full border-[1px] border-blue-500 text-blue-500 p-2 button-transition" onClick={handleDownload}>{downloadIcon}</button>;
};

export default ExportButton;
