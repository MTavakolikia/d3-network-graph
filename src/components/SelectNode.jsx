/* eslint-disable react/prop-types */

const SelectNode = ({ SelectedNode, nodes }) => {
  return (
    <div className="absolute left-2 top-2 flex flex-col">
      <label htmlFor="group-selector" className="mb-2 text-white">
        Select Nodes By Group
      </label>
      <select
        id="group-selector"
        className=" py-3 px-4 pr-9 w-64 border-gray-200 rounded-md text-sm z-50"
        onChange={(e) => {
          SelectedNode(e.target.value);
        }}
      >
        <option value="all">All</option>
        {nodes?.map((item) => (
          <option key={item.id} value={item.group || item.id}>
            {item.id}
            {item.group && `(${item.group})`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectNode;
