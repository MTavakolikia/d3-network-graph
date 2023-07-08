import GraphCardSelector from "./GraphCardSelector";

const Home = () => {
  return (
    <div className=" flex items-center justify-center flex-col py-10 h-full  overflow-auto">
      <div className="text-slate-300 text-center mb-10 ">
        <h1 className="text-3xl text-slate-800 font-bold bg-slate-400 inline-block px-4 py-1 mb-3 rounded-md">
          Welcome To The Data Visualization App
        </h1>
        <h3 className="text-lg">
          In Order To Visualize Your Data Select The Graph Type And Also For
          Proper Data You Can Download On Of The Below Files
        </h3>
        <h5 className="text-sm mt-1">Powered By D3.js Library</h5>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-7 px-7">
          <GraphCardSelector
            graphName="Disjoint force-directed"
            url="disjoint"
          />
          <GraphCardSelector
            graphName="Force-directed graph"
            url="forced-graph"
          />
          <GraphCardSelector
            graphName="Mobile Patent Suits"
            url="mobile-patent-suits"
          />
          <GraphCardSelector
            graphName="Force-directed Graph With Canvas"
            url="forced-graph-canvas"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
