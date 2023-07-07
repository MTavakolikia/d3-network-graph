/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CardDetail from "./CardDetail";

const MobilePatentSuits = ({ nodes, links, selectedNode }) => {
  const [cardDetail, setCardDetail] = useState(null);
  const ref = useRef();

  const handleCLose = () => {
    setCardDetail(null);
  };
  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const types = Array.from(new Set(links.map((d) => d.type)));
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("center", d3.forceCenter(width, height / 2))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("x", d3.forceX())
      .force("y", d3.forceY());
    const drag = (simulation) => {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };
    function linkArc(d) {
      const r = Math.hypot(d.target.x - d.source.x, d.target.y - d.source.y);
      return `
              M${d.source.x},${d.source.y}
              A${r},${r} 0 0,1 ${d.target.x},${d.target.y}
            `;
    }

    // Per-type markers, as they don't inherit styles.
    svg
      .append("defs")
      .selectAll("marker")
      .data(types)
      .join("marker")
      .attr("id", (d) => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 15)
      .attr("refY", -0.5)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", color)
      .attr("d", "M0,-5L10,0L0,5");

    const link = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(links)
      .join("path")
      .attr("stroke", (d) => color(d.type))
      .attr(
        "marker-end",
        (d) => `url(${new URL(`#arrow-${d.type}`, location)})`
      );

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

    const node = svg
      .append("g")
      .attr("fill", "currentColor")
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .call(drag(simulation))
      .on("click", (d) => {
        setCardDetail(d.target.__data__);
      });

    node
      .append("circle")
      .attr("stroke", "white")
      .attr("stroke-width", 1)
      .attr("r", 6);

    node
      .append("text")
      .attr("x", 8)
      .attr("y", "0.31em")
      .text((d) => d.id)
      .clone(true)
      .lower()
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 3);

    simulation.on("tick", () => {
      link.attr("d", linkArc);
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    node.style("opacity", (d) =>
      d.group == selectedNode || selectedNode == "all" ? 1 : 0.1
    );
    link.style("opacity", (d) =>
      d.group == selectedNode || selectedNode == "all" ? 1 : 0.5
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

export default MobilePatentSuits;
