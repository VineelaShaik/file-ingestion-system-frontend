// import { ReactFlow, addEdge, Handle, Position, useNodesState, useEdgesState } from "@xyflow/react";
// import "@xyflow/react/dist/style.css";
// import { useCallback, useMemo } from "react";
//
// /* ── layout constants ───────────────────────────────── */
// const NODE_W  = 160;
// const NODE_H  = 42;
// const GAP_Y   = 10;
// const LEFT_X  = 24;
// const RIGHT_X = 440;
//
// const DB_ICONS = { fullName: "👤", email: "✉️", phone: "📞", city: "🏙️" };
// const DB_TYPES = { fullName: "STRING", email: "STRING · UNIQUE", phone: "STRING", city: "STRING" };
//
// /* ══════════════════════════════════════════════════════
//    FILE NODE  — left side
// ══════════════════════════════════════════════════════ */
// function FileNode({ data }) {
//   return (
//     <div style={{
//       width: NODE_W,
//       height: NODE_H,
//       background: data.connected ? "#dbeafe" : "#ffffff",
//       border: `2px solid ${data.connected ? "#60a5fa" : "#c9bfaa"}`,
//       borderRadius: 14,
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "space-between",
//       padding: "0 12px",
//       fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
//       fontSize: 12,
//       fontWeight: 500,
//       color: data.connected ? "#1e3a8a" : "#1a1512",
//       boxShadow: data.connected
//         ? "0 0 0 4px rgba(26,95,212,0.14), 0 4px 12px rgba(26,95,212,0.12)"
//         : "0 2px 6px rgba(0,0,0,0.07)",
//       transition: "all 0.22s ease",
//       cursor: "default",
//       userSelect: "none",
//       position: "relative",
//     }}>
//       {/* left accent bar */}
//       <div style={{
//         position: "absolute",
//         left: 0, top: 8, bottom: 8,
//         width: 4,
//         borderRadius: "0 4px 4px 0",
//         background: data.connected ? "#1a5fd4" : "#c9bfaa",
//         transition: "background 0.22s",
//       }} />
//
//       <span style={{
//         paddingLeft: 10,
//         overflow: "hidden",
//         textOverflow: "ellipsis",
//         whiteSpace: "nowrap",
//         flex: 1,
//       }}>
//         {data.label}
//       </span>
//
//       {data.connected && (
//         <span style={{
//           fontSize: 10,
//           fontWeight: 600,
//           color: "#1a5fd4",
//           background: "#eff6ff",
//           border: "1px solid #93c5fd",
//           borderRadius: 20,
//           padding: "1px 7px",
//           marginLeft: 10,
//           flexShrink: 0,
//           whiteSpace: "nowrap",
//         }}>
//           mapped
//         </span>
//       )}
//
//       <Handle
//         type="source"
//         position={Position.Right}
//         style={{
//           width: 10, height: 10,
//           background: data.connected ? "#1a5fd4" : "#94a3b8",
//           border: "2px solid #fff",
//           boxShadow: `0 0 0 2px ${data.connected ? "#1a5fd4" : "#94a3b8"}`,
//           right: -6,
//           cursor: "crosshair",
//           transition: "all 0.2s",
//         }}
//       />
//     </div>
//   );
// }
//
// /* ══════════════════════════════════════════════════════
//    DB NODE  — right side
// ══════════════════════════════════════════════════════ */
// function DbNode({ data }) {
//   return (
//     <div style={{
//       width: NODE_W,
//       height: NODE_H,
//       background: data.connected
//         ? "linear-gradient(135deg, #f0fdf4 0%, #f0fdfa 100%)"
//         : "#faf7f0",
//       border: `2px solid ${data.connected ? "#6ee7b7" : "#dbd2bf"}`,
//       borderRadius: 14,
//       display: "flex",
//       alignItems: "center",
//       gap: 8,
//       padding: "0 12px",
//       fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
//       boxShadow: data.connected
//         ? "0 0 0 4px rgba(10,138,126,0.14), 0 4px 14px rgba(10,138,126,0.1)"
//         : "0 2px 6px rgba(0,0,0,0.07)",
//       transition: "all 0.22s ease",
//       cursor: "default",
//       userSelect: "none",
//       position: "relative",
//     }}>
//       <Handle
//         type="target"
//         position={Position.Left}
//         style={{
//           width: 10, height: 10,
//           background: data.connected ? "#0a8a7e" : "#94a3b8",
//           border: "2px solid #fff",
//           boxShadow: `0 0 0 2px ${data.connected ? "#0a8a7e" : "#94a3b8"}`,
//           left: -6,
//           cursor: "crosshair",
//           transition: "all 0.2s",
//         }}
//       />
//
//       {/* icon badge */}
//       <div style={{
//         width: 26, height: 26,
//         borderRadius: 6,
//         flexShrink: 0,
//         background: data.connected ? "#ccfbf1" : "#f0ebe0",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         fontSize: 13,
//         transition: "all 0.22s",
//       }}>
//         {DB_ICONS[data.label] || "🔹"}
//       </div>
//
//       <div style={{ flex: 1, minWidth: 0 }}>
//         <div style={{
//           fontSize: 12,
//           fontWeight: 600,
//           color: data.connected ? "#134e4a" : "#1a1512",
//           overflow: "hidden",
//           textOverflow: "ellipsis",
//           whiteSpace: "nowrap",
//           transition: "color 0.22s",
//         }}>
//           {data.label}
//         </div>
//         <div style={{ fontSize: 10, color: "#a89e93", marginTop: 1 }}>
//           {DB_TYPES[data.label] || "FIELD"}
//         </div>
//       </div>
//
//       {/* right accent bar */}
//       <div style={{
//         position: "absolute",
//         right: 0, top: 8, bottom: 8,
//         width: 4,
//         borderRadius: "4px 0 0 4px",
//         background: data.connected ? "#0a8a7e" : "#dbd2bf",
//         transition: "background 0.22s",
//       }} />
//     </div>
//   );
// }
//
// const NODE_TYPES = { fileNode: FileNode, dbNode: DbNode };
//
// const EDGE_DEFAULTS = {
//   animated: true,
//   style: {
//     stroke: "#1a5fd4",
//     strokeWidth: 2.5,
//     filter: "drop-shadow(0 1px 6px rgba(26,95,212,0.35))",
//   },
//   type: "default",
// };
//
// /* ══════════════════════════════════════════════════════
//    COLUMN MAPPER
// ══════════════════════════════════════════════════════ */
// export default function ColumnMapper({ fileColumns, dbColumns, setMapping }) {
//
//   const maxRows = Math.max(fileColumns.length, dbColumns.length);
//   const canvasH = maxRows * (NODE_H + GAP_Y) + GAP_Y * 3;
//
//   const initialNodes = useMemo(() => [
//     ...fileColumns.map((col, i) => ({
//       id: `file-${col}`,
//       type: "fileNode",
//       position: { x: LEFT_X, y: i * (NODE_H + GAP_Y) + GAP_Y },
//       data: { label: col, connected: false },
//       draggable: false,
//     })),
//     ...dbColumns.map((field, i) => ({
//       id: `db-${field}`,
//       type: "dbNode",
//       position: { x: RIGHT_X, y: i * (NODE_H + GAP_Y) + GAP_Y },
//       data: { label: field, connected: false },
//       draggable: false,
//     })),
//   ], []);
//
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//
//   const setNodeConnected = useCallback((id, connected) => {
//     setNodes(ns => ns.map(n => n.id === id ? { ...n, data: { ...n.data, connected } } : n));
//   }, [setNodes]);
//
//   const onConnect = useCallback((params) => {
//     setEdges(eds => {
//       const filtered = eds.filter(e => e.target !== params.target);
//       filtered.forEach(e => {
//         if (e.target === params.target) setNodeConnected(e.source, false);
//       });
//       return addEdge({ ...EDGE_DEFAULTS, ...params }, filtered);
//     });
//     setNodeConnected(params.source, true);
//     setNodeConnected(params.target, true);
//     const fileCol = params.source.replace("file-", "");
//     const dbCol   = params.target.replace("db-", "");
//     setMapping(prev => ({ ...prev, [dbCol]: fileCol }));
//   }, [setMapping, setNodeConnected]);
//
//   const onEdgesDelete = useCallback((deleted) => {
//     deleted.forEach(edge => {
//       setEdges(eds => {
//         const remaining = eds.filter(e => e.id !== edge.id);
//         if (!remaining.some(e => e.source === edge.source)) setNodeConnected(edge.source, false);
//         if (!remaining.some(e => e.target === edge.target)) setNodeConnected(edge.target, false);
//         return remaining;
//       });
//       const dbCol = edge.target.replace("db-", "");
//       setMapping(prev => { const n = { ...prev }; delete n[dbCol]; return n; });
//     });
//   }, [setMapping, setNodeConnected]);
//
//   const defaultViewport = useMemo(() => ({ x: 0, y: 0, zoom: 1 }), []);
//
//   return (
//     <div style={{
//       borderRadius: 10,
//       border: "1px solid #dbd2bf",
//       overflow: "hidden",
//       background: "linear-gradient(160deg, #f8f4ed 0%, #eef6ff 100%)",
//     }}>
//
//       {/* ── column header bar ── */}
//       <div style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "10px 28px 8px",
//         borderBottom: "1px solid #e9e2d4",
//       }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <div style={{
//             width: 10, height: 10, borderRadius: "50%",
//             background: "#1a5fd4",
//             boxShadow: "0 0 0 4px rgba(26,95,212,0.18)",
//           }} />
//           <span style={{
//             fontFamily: "'JetBrains Mono', monospace",
//             fontSize: 11, fontWeight: 600,
//             letterSpacing: "0.14em",
//             textTransform: "uppercase",
//             color: "#1e3a8a",
//           }}>
//             File Columns
//           </span>
//         </div>
//
//         <div style={{
//           fontFamily: "'JetBrains Mono', monospace",
//           fontSize: 11,
//           color: "#a89e93",
//           background: "#f0ebe0",
//           border: "1px solid #dbd2bf",
//           borderRadius: 20,
//           padding: "2px 12px",
//         }}>
//           drag ● handle → to connect
//         </div>
//
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <span style={{
//             fontFamily: "'JetBrains Mono', monospace",
//             fontSize: 11, fontWeight: 600,
//             letterSpacing: "0.14em",
//             textTransform: "uppercase",
//             color: "#134e4a",
//           }}>
//             DB Fields
//           </span>
//           <div style={{
//             width: 10, height: 10, borderRadius: "50%",
//             background: "#0a8a7e",
//             boxShadow: "0 0 0 4px rgba(10,138,126,0.18)",
//           }} />
//         </div>
//       </div>
//
//       {/* ── ReactFlow canvas ── */}
//       <div style={{ height: canvasH, width: "100%" }}>
//         <ReactFlow
//           nodes={nodes}
//           edges={edges}
//           nodeTypes={NODE_TYPES}
//           onNodesChange={onNodesChange}
//           onEdgesChange={onEdgesChange}
//           onConnect={onConnect}
//           onEdgesDelete={onEdgesDelete}
//           defaultViewport={defaultViewport}
//           fitView={false}
// //           nodesDraggable={false}
// //           panOnDrag={false}
//           panOnScroll={false}
//           zoomOnScroll={false}
//           zoomOnPinch={false}
//           zoomOnDoubleClick={false}
// //           preventScrolling={false}
//           elementsSelectable={true}
//           nodesConnectable={true}
//           proOptions={{ hideAttribution: true }}
//           style={{ background: "transparent" }}
//         />
//       </div>
//
//       {/* ── legend ── */}
//       <div style={{
//         padding: "6px 16px 8px",
//         display: "flex",
//         alignItems: "center",
//         gap: 20,
//         borderTop: "1px solid #e9e2d4",
//       }}>
//         <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#a89e93", fontFamily: "'JetBrains Mono', monospace" }}>
//           <div style={{ width: 22, height: 2, background: "linear-gradient(90deg,#1a5fd4,#0a8a7e)", borderRadius: 2 }} />
//           connection mapped
//         </div>
//         <div style={{ fontSize: 11, color: "#a89e93", fontFamily: "'JetBrains Mono', monospace" }}>
//           · right-click an edge to remove it
//         </div>
//       </div>
//     </div>
//   );
// }
import {
  ReactFlow, addEdge, Handle, Position,
  useNodesState, useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState, useEffect } from "react";

/* ── layout ─────────────────────────────────────────── */
const NODE_W  = 160;
const NODE_H  = 42;
const GAP_Y   = 10;
const LEFT_X  = 24;
const RIGHT_X = 440;

const DB_ICONS = { fullName:"👤", email:"✉️", phone:"📞", city:"🏙️" };
const DB_TYPES = { fullName:"STRING", email:"STRING · UNIQUE", phone:"STRING", city:"STRING" };
const MONO = "'JetBrains Mono','Fira Mono',monospace";

/* ── injected CSS ───────────────────────────────────── */
const CSS = `
@keyframes slideDown { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
.fm-panel { animation: slideDown .2s ease; }
.fm-token {
  display:inline-flex; align-items:center; gap:4px;
  background:#dbeafe; border:1px solid #93c5fd; color:#1e3a8a;
  border-radius:6px; padding:2px 8px;
  font-family:'JetBrains Mono',monospace; font-size:11px; font-weight:600;
  cursor:pointer; transition:all .15s; user-select:none;
}
.fm-token:hover { background:#bfdbfe; }
.fm-op {
  padding:3px 10px; border-radius:6px; font-size:11px; font-weight:600;
  font-family:'JetBrains Mono',monospace; cursor:pointer; border:1px solid;
  transition:all .15s; user-select:none;
}
.fm-op-add { background:#f0fdf4; border-color:#6ee7b7; color:#134e4a; }
.fm-op-add:hover { background:#dcfce7; }
.fm-op-cat { background:#eff6ff; border-color:#93c5fd; color:#1e3a8a; }
.fm-op-cat:hover { background:#dbeafe; }
.fm-op-sub { background:#fef3c7; border-color:#fcd34d; color:#78350f; }
.fm-op-sub:hover { background:#fde68a; }
.fm-op-mul { background:#fdf4ff; border-color:#e879f9; color:#701a75; }
.fm-op-mul:hover { background:#fae8ff; }
.fm-expr {
  width:100%; padding:8px 12px;
  font-family:'JetBrains Mono',monospace; font-size:12px;
  border:1.5px solid #dbd2bf; border-radius:8px;
  background:#faf7f0; color:#1a1512;
  outline:none; resize:vertical; min-height:56px;
  transition:border-color .15s;
}
.fm-expr:focus { border-color:#1a5fd4; background:#fff; }
.fm-badge-multi {
  background:#fef3c7; border:1px solid #fcd34d; color:#92400e;
  border-radius:20px; padding:1px 7px;
  font-size:10px; font-weight:600; font-family:'JetBrains Mono',monospace;
  white-space:nowrap; flex-shrink:0;
}
`;

/* ══════════════════════════════════════════════════════
   FILE NODE
══════════════════════════════════════════════════════ */
function FileNode({ data }) {
  return (
    <div style={{
      width:NODE_W, height:NODE_H,
      background: data.connected ? "#dbeafe" : "#ffffff",
      border:`2px solid ${data.connected ? "#60a5fa" : "#c9bfaa"}`,
      borderRadius:10,
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0 12px",
      fontFamily:MONO, fontSize:12, fontWeight:500,
      color: data.connected ? "#1e3a8a" : "#1a1512",
      boxShadow: data.connected ? "0 0 0 3px rgba(26,95,212,0.14)" : "0 1px 4px rgba(0,0,0,0.07)",
      transition:"all .2s", cursor:"default", userSelect:"none", position:"relative",
    }}>
      <div style={{ position:"absolute", left:0, top:7, bottom:7, width:3,
        borderRadius:"0 3px 3px 0",
        background: data.connected ? "#1a5fd4" : "#c9bfaa", transition:"background .2s" }}/>
      <span style={{ paddingLeft:8, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", flex:1 }}>
        {data.label}
      </span>
      {data.connected && (
        <span style={{ fontSize:10, fontWeight:600, color:"#1a5fd4",
          background:"#eff6ff", border:"1px solid #93c5fd",
          borderRadius:20, padding:"1px 6px", marginLeft:6, flexShrink:0 }}>✓</span>
      )}
      <Handle type="source" position={Position.Right} style={{
        width:10, height:10,
        background: data.connected ? "#1a5fd4" : "#94a3b8",
        border:"2px solid #fff",
        boxShadow:`0 0 0 2px ${data.connected ? "#1a5fd4" : "#94a3b8"}`,
        right:-6, cursor:"crosshair", transition:"all .2s",
      }}/>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   DB NODE
══════════════════════════════════════════════════════ */
function DbNode({ data }) {
  const multi = data.sourceCount > 1;
  return (
    <div style={{
      width:NODE_W, height:NODE_H,
      background: data.connected
        ? (multi ? "linear-gradient(135deg,#fffbeb,#fef3c7)" : "linear-gradient(135deg,#f0fdf4,#f0fdfa)")
        : "#faf7f0",
      border:`2px solid ${data.connected ? (multi ? "#fcd34d" : "#6ee7b7") : "#dbd2bf"}`,
      borderRadius:10,
      display:"flex", alignItems:"center", gap:8, padding:"0 12px",
      fontFamily:MONO,
      boxShadow: data.connected
        ? `0 0 0 3px ${multi ? "rgba(252,211,77,0.25)" : "rgba(10,138,126,0.14)"}`
        : "0 1px 4px rgba(0,0,0,0.07)",
      transition:"all .2s", cursor:"default", userSelect:"none", position:"relative",
    }}>
      <Handle type="target" position={Position.Left} style={{
        width:10, height:10,
        background: data.connected ? (multi ? "#d97706" : "#0a8a7e") : "#94a3b8",
        border:"2px solid #fff",
        boxShadow:`0 0 0 2px ${data.connected ? (multi ? "#d97706" : "#0a8a7e") : "#94a3b8"}`,
        left:-6, cursor:"crosshair", transition:"all .2s",
      }}/>
      <div style={{
        width:26, height:26, borderRadius:6, flexShrink:0,
        background: data.connected ? (multi ? "#fef3c7" : "#ccfbf1") : "#f0ebe0",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:13, transition:"all .2s",
      }}>
        {DB_ICONS[data.label] || "🔹"}
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:12, fontWeight:600,
          color: data.connected ? (multi ? "#92400e" : "#134e4a") : "#1a1512",
          overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", transition:"color .2s" }}>
          {data.label}
        </div>
        <div style={{ fontSize:10, color:"#a89e93", marginTop:1 }}>
          {DB_TYPES[data.label] || "FIELD"}
        </div>
      </div>
      {multi && <span className="fm-badge-multi">{data.sourceCount}→1</span>}
      <div style={{ position:"absolute", right:0, top:7, bottom:7, width:3,
        borderRadius:"3px 0 0 3px",
        background: data.connected ? (multi ? "#d97706" : "#0a8a7e") : "#dbd2bf",
        transition:"background .2s" }}/>
    </div>
  );
}

const NODE_TYPES = { fileNode: FileNode, dbNode: DbNode };

const mkEdgeStyle = (isMulti) => ({
  animated: true,
  style: {
    stroke: isMulti ? "#d97706" : "#1a5fd4",
    strokeWidth: 2,
    filter: `drop-shadow(0 1px 4px ${isMulti ? "rgba(217,119,6,0.4)" : "rgba(26,95,212,0.3)"})`,
  },
  type: "default",
});

/* ══════════════════════════════════════════════════════
   FORMULA PANEL
══════════════════════════════════════════════════════ */
function FormulaPanel({ dbCol, sources, formula, setFormulas }) {
  const insert = (str) => setFormulas(prev => ({
    ...prev,
    [dbCol]: { ...prev[dbCol], formula: (prev[dbCol]?.formula ?? "") + str }
  }));

  return (
    <div className="fm-panel" style={{
      margin:"0 16px 12px",
      background:"#fff", border:"1.5px solid #fcd34d",
      borderRadius:10, padding:"14px 16px",
      boxShadow:"0 2px 12px rgba(0,0,0,0.06)",
    }}>
      {/* title */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
        <span style={{ fontSize:14 }}>⚡</span>
        <span style={{ fontFamily:MONO, fontSize:11, fontWeight:700, color:"#92400e", letterSpacing:".06em" }}>
          FORMULA EDITOR
        </span>
        <span style={{ fontFamily:MONO, fontSize:10, color:"#a89e93", marginLeft:4 }}>→ {dbCol}</span>
      </div>

      {/* token insert buttons */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:8, alignItems:"center" }}>
        <span style={{ fontFamily:MONO, fontSize:10, color:"#a89e93" }}>Fields:</span>
        {sources.map(s => (
          <span key={s} className="fm-token" onClick={() => insert(`{${s}}`)}>
            + {`{${s}}`}
          </span>
        ))}
      </div>

      {/* operator shortcuts */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:10, alignItems:"center" }}>
        <span style={{ fontFamily:MONO, fontSize:10, color:"#a89e93" }}>Ops:</span>
        <span className="fm-op fm-op-add"  onClick={() => insert(" + ")}>+ add</span>
        <span className="fm-op fm-op-cat"  onClick={() => insert(" + ' ' + ")}>⊕ concat</span>
        <span className="fm-op fm-op-sub"  onClick={() => insert(" - ")}>− subtract</span>
        <span className="fm-op fm-op-mul"  onClick={() => insert(" * ")}>× multiply</span>
        <span className="fm-op fm-op-cat"  onClick={() => insert("' '")}>␣ space</span>
        <span className="fm-op fm-op-cat"  onClick={() => insert("', '")}>comma</span>
      </div>

      {/* formula textarea */}
      <textarea
        className="fm-expr"
        value={formula}
        onChange={e => setFormulas(prev => ({
          ...prev, [dbCol]: { ...prev[dbCol], formula: e.target.value }
        }))}
        placeholder={`e.g. {${sources[0]}} + ' ' + {${sources[1] ?? sources[0]}}`}
        spellCheck={false}
      />

      {/* hint */}
      <div style={{ fontFamily:MONO, fontSize:10, color:"#a89e93", marginTop:6, lineHeight:1.6 }}>
        Use <strong style={{color:"#1a5fd4"}}>{`{fieldName}`}</strong> tokens · string literals in <strong style={{color:"#0a8a7e"}}>'quotes'</strong> · operators: + - * /
        <br/>
        <span style={{color:"#64748b"}}>
          concat: <code>{`{firstName} + ' ' + {lastName}`}</code> &nbsp;|&nbsp;
          sum: <code>{`{price} * {qty}`}</code>
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   COLUMN MAPPER
══════════════════════════════════════════════════════ */
export default function ColumnMapper({ fileColumns, dbColumns, setMapping }) {

  const maxRows = Math.max(fileColumns.length, dbColumns.length);
  const canvasH = maxRows * (NODE_H + GAP_Y) + GAP_Y * 3;

  const initialNodes = useMemo(() => [
    ...fileColumns.map((col, i) => ({
      id:`file-${col}`, type:"fileNode",
      position:{ x:LEFT_X, y:i*(NODE_H+GAP_Y)+GAP_Y },
      data:{ label:col, connected:false }, draggable:false,
    })),
    ...dbColumns.map((field, i) => ({
      id:`db-${field}`, type:"dbNode",
      position:{ x:RIGHT_X, y:i*(NODE_H+GAP_Y)+GAP_Y },
      data:{ label:field, connected:false, sourceCount:0 }, draggable:false,
    })),
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [formulas, setFormulas] = useState({}); // { dbCol: { sources, formula } }

  /* helper: recompute node visuals + mapping output from current edges+formulas */
  const syncAll = useCallback((nextEdges, nextFormulas) => {
    // group sources per db col
    const groups = {};
    nextEdges.forEach(e => {
      const db  = e.target.replace("db-","");
      const src = e.source.replace("file-","");
      if (!groups[db]) groups[db] = [];
      if (!groups[db].includes(src)) groups[db].push(src);
    });

    // update node states
    setNodes(ns => ns.map(n => {
      if (n.type === "fileNode") {
        return { ...n, data:{ ...n.data, connected: nextEdges.some(e => e.source===n.id) } };
      }
      const db  = n.id.replace("db-","");
      const cnt = groups[db]?.length ?? 0;
      return { ...n, data:{ ...n.data, connected:cnt>0, sourceCount:cnt } };
    }));

    // recolour edges
    setEdges(es => es.map(e => {
      const db = e.target.replace("db-","");
      const multi = (groups[db]?.length ?? 0) > 1;
      return { ...e, ...mkEdgeStyle(multi) };
    }));

    // build mapping payload
    const out = {};
    Object.entries(groups).forEach(([db, srcs]) => {
      if (srcs.length === 1) {
        out[db] = srcs[0];
      } else {
        const fml = nextFormulas[db]?.formula ?? srcs.map(s=>`{${s}}`).join(" + ");
        out[db] = { sources: srcs, formula: fml };
      }
    });
    setMapping(out);
  }, [setNodes, setEdges, setMapping]);

  /* re-sync whenever formulas text changes */
  useEffect(() => { syncAll(edges, formulas); }, [formulas]);

  const onConnect = useCallback((params) => {
    setEdges(eds => {
      const next = addEdge({ ...mkEdgeStyle(false), ...params }, eds);
      const db   = params.target.replace("db-","");
      const srcs = next.filter(e=>e.target===params.target).map(e=>e.source.replace("file-",""));
      if (srcs.length > 1) {
        setFormulas(prev => ({
          ...prev,
          [db]: { sources:srcs, formula: prev[db]?.formula ?? srcs.map(s=>`{${s}}`).join(" + ") }
        }));
      }
      syncAll(next, formulas);
      return next;
    });
  }, [syncAll, formulas]);

  const onEdgesDelete = useCallback((deleted) => {
    setEdges(eds => {
      const remaining = eds.filter(e => !deleted.some(d=>d.id===e.id));
      deleted.forEach(edge => {
        const db   = edge.target.replace("db-","");
        const srcs = remaining.filter(e=>e.target===edge.target).map(e=>e.source.replace("file-",""));
        if (srcs.length <= 1) setFormulas(prev => { const n={...prev}; delete n[db]; return n; });
      });
      syncAll(remaining, formulas);
      return remaining;
    });
  }, [syncAll, formulas]);

  const defaultViewport = useMemo(() => ({ x:0, y:0, zoom:1 }), []);

  /* which db fields currently have 2+ sources */
  const multiFields = useMemo(() => {
    const groups = {};
    edges.forEach(e => {
      const db=e.target.replace("db-",""), src=e.source.replace("file-","");
      if (!groups[db]) groups[db]=[];
      if (!groups[db].includes(src)) groups[db].push(src);
    });
    return Object.entries(groups).filter(([,s])=>s.length>1);
  }, [edges]);

  return (
    <>
      <style>{CSS}</style>
      <div style={{
        borderRadius:10, border:"1px solid #dbd2bf", overflow:"hidden",
        background:"linear-gradient(160deg,#f8f4ed 0%,#eef6ff 100%)",
      }}>

        {/* header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
          padding:"10px 28px 8px", borderBottom:"1px solid #e9e2d4" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#1a5fd4",
              boxShadow:"0 0 0 3px rgba(26,95,212,0.18)" }}/>
            <span style={{ fontFamily:MONO, fontSize:11, fontWeight:600,
              letterSpacing:".14em", textTransform:"uppercase", color:"#1e3a8a" }}>
              File Columns
            </span>
          </div>
          <div style={{ fontFamily:MONO, fontSize:11, color:"#a89e93",
            background:"#f0ebe0", border:"1px solid #dbd2bf", borderRadius:20, padding:"2px 12px" }}>
            drag ● to connect · multiple fields → one DB field supported
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontFamily:MONO, fontSize:11, fontWeight:600,
              letterSpacing:".14em", textTransform:"uppercase", color:"#134e4a" }}>
              DB Fields
            </span>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"#0a8a7e",
              boxShadow:"0 0 0 3px rgba(10,138,126,0.18)" }}/>
          </div>
        </div>

        {/* ReactFlow canvas */}
        <div style={{ height:canvasH, width:"100%" }}>
          <ReactFlow
            nodes={nodes} edges={edges}
            nodeTypes={NODE_TYPES}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgesDelete={onEdgesDelete}
            defaultViewport={defaultViewport}
            fitView={false}
            nodesDraggable={false}
            panOnDrag={false} panOnScroll={false}
            zoomOnScroll={false} zoomOnPinch={false} zoomOnDoubleClick={false}
            preventScrolling={false}
            elementsSelectable={true} nodesConnectable={true}
            proOptions={{ hideAttribution:true }}
            style={{ background:"transparent" }}
          />
        </div>

        {/* Formula panels */}
        {multiFields.length > 0 && (
          <div style={{ borderTop:"1px solid #fde68a", background:"#fffbeb", paddingTop:12 }}>
            <div style={{ fontFamily:MONO, fontSize:10, color:"#92400e",
              letterSpacing:".12em", textTransform:"uppercase", fontWeight:600,
              padding:"0 16px 8px" }}>
              ⚡ Multi-field formulas — {multiFields.length} active
            </div>
            {multiFields.map(([db, srcs]) => (
              <FormulaPanel
                key={db}
                dbCol={db}
                sources={srcs}
                formula={formulas[db]?.formula ?? srcs.map(s=>`{${s}}`).join(" + ")}
                setFormulas={setFormulas}
              />
            ))}
          </div>
        )}

        {/* legend */}
        <div style={{ padding:"6px 16px 8px", display:"flex", alignItems:"center",
          gap:20, borderTop:"1px solid #e9e2d4" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:"#a89e93", fontFamily:MONO }}>
            <div style={{ width:22, height:2, background:"linear-gradient(90deg,#1a5fd4,#0a8a7e)", borderRadius:2 }}/>
            single
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:"#a89e93", fontFamily:MONO }}>
            <div style={{ width:22, height:2, background:"linear-gradient(90deg,#d97706,#f59e0b)", borderRadius:2 }}/>
            multi → formula
          </div>
          <div style={{ fontSize:11, color:"#a89e93", fontFamily:MONO }}>
            · right-click edge to remove
          </div>
        </div>
      </div>
    </>
  );
}