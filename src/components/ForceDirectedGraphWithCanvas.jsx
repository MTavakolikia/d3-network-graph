/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import CardDetail from "./CardDetail";

const ForcedGraphWithCanvas = ({ nodes, links, selectedNode }) => {
  const canvasRef = useRef(null);
  const [cardDetail, setCardDetail] = useState(null);
  const handleCLose = () => {
    setCardDetail(null);
  };
  const color = d3.scaleOrdinal(d3.schemeCategory10);
  useEffect(() => {
    const canvas = d3.select(canvasRef.current).call(
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
    const context = canvas.node().getContext("2d");

    const devicePixelRatio = window.devicePixelRatio || 1;
    const backingStoreRatio =
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio ||
      1;
    const ratio = devicePixelRatio / backingStoreRatio;

    const width = canvas.node().parentNode.clientWidth;
    const height = canvas.node().parentNode.clientHeight;

    canvas.node().width = width * ratio;
    canvas.node().height = height * ratio;
    canvas.node().style.width = `${width}px`;
    canvas.node().style.height = `${height}px`;

    context.scale(ratio, ratio);

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    simulation.on("tick", () => {
      context.clearRect(0, 0, width, height);

      context.save();
      context.beginPath();
      links.forEach((link) => {
        context.moveTo(link.source.x, link.source.y);
        context.lineTo(link.target.x, link.target.y);
        if (link.group != selectedNode && selectedNode != "all") {
          context.globalAlpha = 0.1;
        } else {
          context.globalAlpha = 0.5;
        }
      });
      context.strokeStyle = "#999";
      context.stroke();
      context.restore();

      nodes.forEach((node) => {
        context.beginPath();
        context.moveTo(node.x + 3, node.y);
        context.arc(node.x, node.y, 3, 0, 2 * Math.PI);

        if (node.group != selectedNode && selectedNode != "all") {
          context.globalAlpha = 0.1;
        } else {
          context.globalAlpha = 1;
        }
        context.fillStyle = color(node.group);
        context.strokeStyle = "#fff";
        context.fill();
        context.stroke();
      });
      context.restore();
    });

    return () => simulation.stop();
  }, [nodes, links, selectedNode, color]);

  return (
    <>
      {cardDetail && <CardDetail {...cardDetail} close={handleCLose} />}
      <canvas ref={canvasRef} className="h-screen w-full" />
    </>
  );
};

export default ForcedGraphWithCanvas;
