import { ReactFlow, addEdge, Handle, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useState, useCallback } from "react";
import { Paper, Typography, Box } from "@mui/material";

function FileNode({ data }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 1.5,
        minWidth: 150,
        textAlign: "center",
        borderRadius: 2,
        backgroundColor: "#fff"
      }}
    >
      <Typography variant="body2" fontWeight={500}>
        {data.label}
      </Typography>

      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#1976d2" }}
      />
    </Paper>
  );
}

function DbNode({ data }) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 1.5,
        minWidth: 160,
        textAlign: "center",
        borderRadius: 2,
        backgroundColor: "#e3f2fd"
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#1976d2" }}
      />

      <Typography variant="body2" fontWeight={500}>
        {data.label}
      </Typography>
    </Paper>
  );
}

const nodeTypes = {
  fileNode: FileNode,
  dbNode: DbNode
};

export default function ColumnMapper({ fileColumns, dbColumns, setMapping }) {

  const leftX = 150;
  const rightX = 520;

  const nodes = [
    ...fileColumns.map((col, i) => ({
      id: `file-${col}`,
      type: "fileNode",
      position: { x: leftX, y: i * 80 + 40 },
      data: { label: col }
    })),

    ...dbColumns.map((field, i) => ({
      id: `db-${field}`,
      type: "dbNode",
      position: { x: rightX, y: i * 80 + 40 },
      data: { label: field }
    }))
  ];

  const [edges, setEdges] = useState([]);

  const onConnect = useCallback((params) => {

    setEdges((eds) =>
      addEdge(
        {
          ...params,
          animated: true,
          style: { stroke: "#1976d2", strokeWidth: 2 }
        },
        eds
      )
    );

    const sourceColumn = params.source.replace("file-", "");
    const targetColumn = params.target.replace("db-", "");

    setMapping((prev) => ({
      ...prev,
      [targetColumn]: sourceColumn
    }));

  }, [setMapping]);
 const onEdgesDelete = useCallback((deletedEdges) => {
   deletedEdges.forEach((edge) => {
     const sourceColumn = edge.source.replace("file-", "");
     const targetColumn = edge.target.replace("db-", "");

     setMapping((prev) => {
       const updated = { ...prev };
       delete updated[targetColumn];
       return updated;
     });
   });
 }, [setMapping]);

  return (
    <Box
      sx={{
        height: 550,
        maxWidth: 900,
        mx: "auto",
        mt: 4,
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        backgroundColor: "#fafafa",
        p: 2
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 6,
          mb: 1
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          File Columns
        </Typography>

        <Typography variant="subtitle1" fontWeight={600}>
          Database Fields
        </Typography>
      </Box>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onEdgesDelete={onEdgesDelete}
        fitView
        nodesDraggable={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnDrag={false}
      />
    </Box>
  );
}