/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CardDetail from "./CardDetail";

const Graph = ({ nodes, links, selectedNode }) => {
  const canvasRef = useRef();
  const [cardDetail, setCardDetail] = useState(null);
  const handleCLose = () => {
    setCardDetail(null);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const width = canvas.width;
    const height = canvas.height;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Create the canvas.
    // const dpi = devicePixelRatio; // _e.g._, 2 for retina screens

    function draw() {
      context.clearRect(0, 0, width, height);

      context.save();
      context.globalAlpha = 0.6;
      context.strokeStyle = "#999";
      context.beginPath();
      links.forEach(drawLink);
      context.stroke();
      context.restore();

      context.save();
      context.strokeStyle = "#fff";
      context.globalAlpha = 1;
      nodes.forEach((node) => {
        context.beginPath();
        drawNode(node);
        context.fillStyle = color(node.group);
        context.strokeStyle = "#fff";
        context.fill();
        context.stroke();
      });
      context.restore();
    }
    function drawLink(d) {
      context.moveTo(d.source.x, d.source.y);
      context.lineTo(d.target.x, d.target.y);
    }

    function drawNode(d) {
      context.moveTo(d.x + 5, d.y);
      context.arc(d.x, d.y, 5, 0, 2 * Math.PI);
    }

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
      .on("tick", draw);

    simulation.on("tick", () => {
      context.clearRect(0, 0, width, height);

      // Draw the links
      context.beginPath();
      links.forEach((link) => {
        context.moveTo(link.source.x, link.source.y);
        context.lineTo(link.target.x, link.target.y);
      });
      context.strokeStyle = "#aaa";
      context.stroke();

      // Draw the nodes
      context.beginPath();
      nodes.forEach((node) => {
        context.moveTo(node.x + 5, node.y);
        context.arc(node.x, node.y, 5, 0, 2 * Math.PI);
      });
      context.fillStyle = "#000";
      context.fill();
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
    d3.select(canvas).call(
      d3
        .drag()
        .subject((event) => {
          const [px, py] = d3.pointer(event, canvas);
          return d3.least(nodes, ({ x, y }) => {
            const dist2 = (x - px) ** 2 + (y - py) ** 2;
            if (dist2 < 400) return dist2;
          });
        })
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );

    return () => simulation.stop();
  }, [nodes, links, selectedNode]);

  return (
    <>
      {cardDetail && <CardDetail {...cardDetail} close={handleCLose} />}
      <canvas
        className="w-full h-full"
        ref={canvasRef}
        width="1000"
        height="900"
      ></canvas>
    </>
  );
};

export default Graph;
