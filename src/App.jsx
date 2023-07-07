import { useState } from "react";
import Disjoint from "./components/Disjoint";
import SelectNode from "./components/SelectNode";
import FileUploader from "./components/FileUploader";

const App = () => {
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
      <FileUploader jsonData={jsonData} csvData={csvData} />
      {data && (
        <div className="w-full h-full">
          <SelectNode SelectedNode={selectNode} nodes={data.nodes} />
          <Disjoint {...data} selectedNode={selectedNode} />
        </div>
      )}
    </div>
  );
};

export default App;
