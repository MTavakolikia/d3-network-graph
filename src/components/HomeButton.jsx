import { Link } from "react-router-dom";

const HomeButton = () => {
  return (
    <button className="bg-slate-700 z-50  hover:bg-slate-500 -ml-4 text-white font-bold py-2 px-4 mt-4 rounded absolute top-5 left-1/2 ">
      <Link to="/" className="flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          id="back-arrow"
        >
          <g fill="none" fillRule="evenodd">
            <rect width="24" height="24"></rect>
            <g fill="#2CBD3E" transform="translate(1 1)">
              <circle cx="11" cy="11" r="9" fillOpacity=".24"></circle>
              <path
                fillRule="nonzero"
                d="M10,13.5857864 L10,6 C10,5.44771525 10.4477153,5 11,5 C11.5522847,5 12,5.44771525 12,6 L12,13.5857864 L14.2928932,11.2928932 C14.6834175,10.9023689 15.3165825,10.9023689 15.7071068,11.2928932 C16.0976311,11.6834175 16.0976311,12.3165825 15.7071068,12.7071068 L11.7071068,16.7071068 C11.3165825,17.0976311 10.6834175,17.0976311 10.2928932,16.7071068 L6.29289322,12.7071068 C5.90236893,12.3165825 5.90236893,11.6834175 6.29289322,11.2928932 C6.68341751,10.9023689 7.31658249,10.9023689 7.70710678,11.2928932 L10,13.5857864 Z M22,11 C22,17.0751322 17.0751322,22 11,22 C4.92486775,22 3.01561176e-16,17.0751322 6.7355574e-16,11 C1.0455503e-15,4.92486775 4.92486775,0 11,0 C17.0751322,0 22,4.92486775 22,11 Z M20,11 C20,6.02943725 15.9705627,2 11,2 C6.02943725,2 2,6.02943725 2,11 C2,15.9705627 6.02943725,20 11,20 C15.9705627,20 20,15.9705627 20,11 Z"
                transform="rotate(90 11 11)"
              ></path>
            </g>
          </g>
        </svg>
        <span className="ml-2">Back</span>
      </Link>
    </button>
  );
};

export default HomeButton;
