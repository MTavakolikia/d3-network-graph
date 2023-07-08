import { useState } from "react";
import MobilePatentSuits from "../components/MobilePatentSuits";
import SelectNode from "../components/SelectNode";
import FileUploader from "../components/FileUploader";
import HomeButton from "../components/HomeButton";

const MobilePatentSuitsPage = () => {
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

  console.log(data);
  return (
    <div className="flex w-full h-screen items-center justify-center  relative">
      <HomeButton />
      <FileUploader jsonData={jsonData} csvData={csvData} />
      {data && (
        <div className="w-full h-full">
          <SelectNode SelectedNode={selectNode} nodes={data.nodes} />
          <MobilePatentSuits {...data} selectedNode={selectedNode} />
        </div>
      )}
    </div>
  );
};

export default MobilePatentSuitsPage;
