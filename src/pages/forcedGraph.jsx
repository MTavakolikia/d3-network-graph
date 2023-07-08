import { useState } from "react";
import SelectNode from "../components/SelectNode";
import FileUploader from "../components/FileUploader";
import ForcedGraph from "../components/ForcedGraph";
import HomeButton from "../components/HomeButton";

const ForcedGraphPage = () => {
  const [data, setData] = useState(null);
  const [selectedNode, setSelectedNode] = useState("all");
  const selectNode = (e) => {
    setSelectedNode(e);
  };
  const jsonData = (e) => {
    setData(e);
  };
  const csvData = (e) => {
    setData(e);
  };

  return (
    <div className="flex w-full h-screen items-center justify-center  relative">
      <HomeButton />
      <FileUploader jsonData={jsonData} csvData={csvData} />
      {data && (
        <div className="w-full h-full">
          <SelectNode SelectedNode={selectNode} nodes={data.nodes} />
          <ForcedGraph {...data} selectedNode={selectedNode} />
        </div>
      )}
    </div>
  );
};

export default ForcedGraphPage;
