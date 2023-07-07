/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import * as d3 from "d3";

const NetworkGraph = ({ data }) => {
  const graphRef = useRef(null);
  // Aggregate data to reduce the number of nodes and links

  useEffect(() => {
    const graphContainer = d3.select(graphRef.current);
    const aggregatedDataFn = (data) => {
      // Create a map to store the aggregated nodes
      const aggregatedNodesMap = new Map();

      // Iterate over the data to aggregate nodes
      data.forEach((record) => {
        const nodeId = record.nodeId;
        const nodeLabel = record.nodeLabel;

        // Check if the node already exists in the aggregated nodes map
        if (aggregatedNodesMap.has(nodeId)) {
          // Node already exists, increment its count
          const existingNode = aggregatedNodesMap.get(nodeId);
          existingNode.count++;
        } else {
          // Node doesn't exist, create a new aggregated node
          const newNode = {
            id: nodeId,
            label: nodeLabel,
            count: 1,
          };
          aggregatedNodesMap.set(nodeId, newNode);
        }
      });

      // Convert the aggregated nodes map to an array
      const aggregatedNodes = Array.from(aggregatedNodesMap.values());

      // Create an array to store the aggregated links
      const aggregatedLinks = [];

      // Iterate over the data to aggregate links
      data.forEach((record) => {
        const sourceId = record.sourceId;
        const targetId = record.targetId;

        // Check if both source and target nodes exist in the aggregated nodes map
        if (
          aggregatedNodesMap.has(sourceId) &&
          aggregatedNodesMap.has(targetId)
        ) {
          // Create a new aggregated link
          const newLink = {
            source: sourceId,
            target: targetId,
          };
          aggregatedLinks.push(newLink);
        }
      });

      return {
        nodes: aggregatedNodes,
        links: aggregatedLinks,
      };
    };
    // Set up the graph dimensions
    const width = graphContainer.node().getBoundingClientRect().width;
    const height = graphContainer.node().getBoundingClientRect().height;

    // Aggregate data to reduce the number of nodes and links
    const aggregatedData = aggregatedDataFn(data);
    console.log(aggregatedData);
    // Create a force simulation
    const simulation = d3
      .forceSimulation(aggregatedData.nodes)
      .force(
        "link",
        d3.forceLink(aggregatedData.links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Create SVG container
    const svg = graphContainer
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Create links
    const links = svg
      .selectAll("line")
      .data(aggregatedData.links)
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1);

    // Create nodes
    const nodes = svg
      .selectAll("circle")
      .data(aggregatedData.nodes)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("fill", "#333");

    // Update node and link positions on each tick of the simulation
    simulation.on("tick", () => {
      links
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      nodes.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });

    return () => {
      // Clean up the graph on unmount
      svg.remove();
    };
  }, [data]);

  return <div ref={graphRef} style={{ width: "100%", height: "100%" }} />;
};

export default NetworkGraph;
