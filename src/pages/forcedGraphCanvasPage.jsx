import { useState } from "react";
import SelectNode from "../components/SelectNode";
import FileUploader from "../components/FileUploader";
import HomeButton from "../components/HomeButton";
import ForcedGraphWithCanvas from "../components/ForceDirectedGraphWithCanvas";

const ForcedGraphCanvasPage = () => {
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
    <div className="flex w-full h-screen items-center justify-center  relative ">
      <HomeButton />
      <FileUploader jsonData={jsonData} csvData={csvData} />
      {data && (
        <div className="">
          <SelectNode SelectedNode={selectNode} nodes={data.nodes} />
          <ForcedGraphWithCanvas {...data} selectedNode={selectedNode} />
        </div>
      )}
    </div>
  );
};

export default ForcedGraphCanvasPage;
