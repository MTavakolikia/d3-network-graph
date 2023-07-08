/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import disjointImg from "../assets/images/Disjoint force-directed graph.jpg";
import forcedImg from "../assets/images/Force-directed graph.jpg";
import mobilepatentImg from "../assets/images/Mobile Patent Suits.jpg";

const GraphCardSelector = ({ graphName, url }) => {
  const disjointFile =
    "https://static.observableusercontent.com/files/e3680d5f766e85edde560c9c31a6dba2ddfcf2f66e1dced4afa18d8040f1f205e0bde1b8b234d866373f2bfc5806fafc47e244c5c9f48b60aaa1917c1b80fcb7?response-content-disposition=attachment%3Bfilename*%3DUTF-8%27%27graph.json";
  const forceDirectedFile =
    "https://static.observableusercontent.com/files/31d904f6e21d42d4963ece9c8cc4fbd75efcbdc404bf511bc79906f0a1be68b5a01e935f65123670ed04e35ca8cae3c2b943f82bf8db49c5a67c85cbb58db052?response-content-disposition=attachment%3Bfilename*%3DUTF-8%27%27miserables.json";
  const mobilePatentFile =
    "https://static.observableusercontent.com/files/63c4d2f34c05d62a116fc16daf04215d82790c6bd036ce5783f7d002c5d83f704798ae8d61da50e2cc4cb81af8f629e4b14cc82abeeffd789a0cd425072cf2e6?response-content-disposition=attachment%3Bfilename*%3DUTF-8%27%27suits.csv";
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src={
          graphName === "Disjoint force-directed"
            ? disjointImg
            : graphName === "Force-directed graph"
            ? forcedImg
            : graphName === "Mobile Patent Suits"
            ? mobilepatentImg
            : ""
        }
        alt={graphName}
      />
      <div className="px-6 py-4">
        <div>
          <div className="font-bold text-xl mb-1 text-slate-50">
            {graphName}
          </div>
        </div>
        <div className="flex justify-between">
          <button className="bg-slate-700 hover:bg-slate-500 text-white font-bold py-2 px-4 mt-4 rounded">
            <Link to={`/${url}`}>Show Graph</Link>
          </button>
          <a
            title="download proper file"
            href={
              graphName === "Disjoint force-directed"
                ? disjointFile
                : graphName === "Force-directed graph"
                ? forceDirectedFile
                : graphName === "Mobile Patent Suits"
                ? mobilePatentFile
                : ""
            }
            download={graphName}
            className="bg-slate-700 hover:bg-slate-500 text-white font-bold py-2 pl-2 mt-4 rounded inline-flex items-center"
          >
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default GraphCardSelector;
