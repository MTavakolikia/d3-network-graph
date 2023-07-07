/* eslint-disable react/prop-types */
const CardDetail = ({ id, group, index, close }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden bg-slate-100 shadow-lg shadow-slate-700 absolute top-2 right-2 z-50">
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-gray-900 mb-2  border-b-2 border-stone-300 pb-2 ">
          Node Detail
        </div>
        <p className="text-gray-800 font-semibold">
          ID: <span className="font-medium">{id}</span>
        </p>
        <p className="text-gray-800 font-semibold">
          Group: <span className="font-medium">{group}</span>
        </p>
        <p className="text-gray-800 font-semibold">
          Index: <span className="font-medium">{index}</span>
        </p>
        <button
          onClick={close}
          className="bg-slate-700 hover:bg-slate-500 text-white font-bold py-1 px-4 mt-4 rounded"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default CardDetail;
