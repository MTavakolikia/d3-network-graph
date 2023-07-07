/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CardDetail from "./CardDetail";

const ForcedGraph = ({ nodes, links, selectedNode }) => {
  const ref = useRef();
  const [cardDetail, setCardDetail] = useState(null);
  const handleCLose = () => {
    setCardDetail(null);
  };
  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100)
          .strength(1)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width, height / 2))
      .force("collision", d3.forceCollide().radius(30));

    svg.call(
      d3
        .zoom()
        .extent([
          [0, 0],
          [460, 460],
        ])
        .scaleExtent([1, 8])
        .on("zoom", zoomed)
    );

    function zoomed({ transform }) {
      svg.attr("transform", transform);
    }

    // Add a line for each link, and a circle for each node.
    const link = svg
      .append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll()
      .data(links)
      .join("line")
      .attr("stroke-width", 1);

    const node = svg
      .append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(nodes)
      .join("circle")
      .attr("r", 10)
      .attr("fill", (d) => color(d.group))
      .on("click", (d) => {
        setCardDetail(d.target.__data__);
      });

    node.append("title").text((d) => d.id);

    // Add a drag behavior.
    node.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    // Set the position attributes of links and nodes each time the simulation ticks.
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });

    // Reheat the simulation when drag starts, and fix the subject position.
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    // Update the subject (dragged node) position during drag.
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    // Restore the target alpha so the simulation cools after dragging ends.
    // Unfix the subject position now that it’s no longer being dragged.
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    node
      .append("text")
      .attr("x", 8)
      .attr("y", "0.31em")
      .text((d) => d.id)
      .clone(true)
      .lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 2);

    node.style("opacity", (d) =>
      d.group == selectedNode || selectedNode == "all" ? 1 : 0.1
    );

    return () => simulation.stop();
  }, [nodes, links, selectedNode]);

  return (
    <>
      {cardDetail && <CardDetail {...cardDetail} close={handleCLose} />}
      <svg ref={ref} className="w-full h-full" width={1000} height={900} />
    </>
  );
};

export default ForcedGraph;
