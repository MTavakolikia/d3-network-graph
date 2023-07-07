/* eslint-disable react/prop-types */
import * as d3 from "d3";

const FileUploader = ({ csvData, jsonData }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;

      // Check if file is JSON
      if (file.type === "application/json") {
        jsonData(JSON.parse(content));
      }
      // Check if file is CSV
      else if (
        file.type === "text/csv" ||
        file.type === "application/vnd.ms-excel"
      ) {
        const links = d3.csvParse(content);
        const data = {
          nodes: Array.from(
            new Set(links.flatMap((l) => [l.source, l.target])),
            (id) => ({ id })
          ),
          links,
        };

        csvData({ ...data });
      }
    };
    reader.readAsText(file);
  };
  return (
    <div className="absolute bottom-2 left-2 animate-pulse  delay-300 z-50">
      <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg  shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-slate-500">
        <svg
          className="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-base leading-normal">Select a file</span>
        <input
          type="file"
          accept=".json,.csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default FileUploader;
