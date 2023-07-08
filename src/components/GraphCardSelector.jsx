/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import disjointImg from "../assets/images/Disjoint force-directed graph.jpg";
const GraphCardSelector = ({ imgSrc, graphName, url, dlUrl }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={disjointImg} alt={graphName} />
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
            href={`./src/assets/files/${dlUrl}`}
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
