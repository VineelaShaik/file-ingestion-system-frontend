import ReactFlow, { addEdge } from "reactflow";
import "reactflow/dist/style.css";
import { useState, useCallback } from "react";

export default function ColumnMapper({ fileColumns, dbColumns, setMapping }) {

  const nodes = [
    ...fileColumns.map((col, i) => ({
      id: col,
      position: { x: 0, y: i * 70 },
      data: { label: col },
      sourcePosition: "right"
    })),

    ...dbColumns.map((field, i) => ({
      id: field,
      position: { x: 350, y: i * 70 },
      data: { label: field },
      targetPosition: "left"
    }))
  ];

  const [edges, setEdges] = useState([]);

  const onConnect = useCallback((params) => {

    setEdges((eds) => addEdge(params, eds));

    setMapping((prev) => ({
      ...prev,
      [params.target]: params.source
    }));

  }, [setMapping]);

  return (

    <div style={{ height: 400, border: "1px solid #ddd", marginTop: "20px" }}>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        fitView
      />

    </div>

  );
}