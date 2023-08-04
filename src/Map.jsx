import { useState, useEffect } from "react";

const Map = () => {
  const [zoomLevel, setZoomLevel] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulating data fetching based on zoom level
    fetchData();
  }, [zoomLevel]);

  const handleScroll = (event) => {
    const newZoomLevel = Math.round(event.deltaY / 100);
    setZoomLevel((prevZoomLevel) => prevZoomLevel + newZoomLevel);
  };

  const fetchData = () => {
    // Simulating data fetching based on zoom level
    // Replace this with your actual data simulation logic
    const newData = simulateDataFetch(zoomLevel);
    setData(newData);
  };

  const simulateDataFetch = (zoomLevel) => {
    // Simulating data based on zoom level
    let newData = [];

    if (zoomLevel >= 5) {
      newData = [
        { id: 1, name: "Location 1", latitude: 40.7128, longitude: -74.006 },
        { id: 2, name: "Location 2", latitude: 34.0522, longitude: -118.2437 },
        { id: 3, name: "Location 3", latitude: 51.5074, longitude: -0.1278 },
      ];
    } else {
      newData = [
        { id: 4, name: "Location 4", latitude: 37.7749, longitude: -122.4194 },
        { id: 5, name: "Location 5", latitude: 35.6895, longitude: 139.6917 },
        { id: 6, name: "Location 6", latitude: 52.52, longitude: 13.405 },
      ];
    }

    return newData;
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <h1>Zoom Level: {zoomLevel}</h1>

      <ul>
        {data.map((location) => (
          <li key={location.id}>
            {location.name} - ({location.latitude}, {location.longitude})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Map;
