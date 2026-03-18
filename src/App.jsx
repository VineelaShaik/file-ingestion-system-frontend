// import { useState } from "react";
// import {
//   Container,
//   Typography,
//   Card,
//   CardContent,
//   Button,
//   Grid,
//   TextField,
//   LinearProgress,
//   Alert,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody
// } from "@mui/material";
// import ColumnMapper  from "./components/ColumnMapper.jsx";
//
// function App() {
//
//   const [files, setFiles] = useState([]);
//   const [results, setResults] = useState([]);
//   const [mappedFile, setMappedFile] = useState(null);
//   const [fileColumns, setFileColumns] = useState([]);
//   const [dbColumns] = useState(["fullName", "email", "phone", "city"]);
//
//   const [mapping, setMapping] = useState({
//     full_name: "",
//     email: "",
//     phone: "",
//     city: ""
//   });
//
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//
//   const handleUpload = async () => {
//
//     if (!files || files.length === 0) {
//       setMessage({ type: "error", text: "Please select files" });
//       return;
//     }
//
//     const formData = new FormData();
//
//     for (let i = 0; i < files.length; i++) {
//       formData.append("files", files[i]);
//     }
//
//     setLoading(true);
//
//     try {
//
//       const response = await fetch(
//         "http://localhost:8080/ingest/upload/multiple",
//         {
//           method: "POST",
//           body: formData
//         }
//       );
//
//       const data = await response.json();
//       setResults(data);
//
//       setMessage({ type: "success", text: "Upload successful" });
//
//     } catch {
//
//       setMessage({ type: "error", text: "Upload failed" });
//
//     }
//
//     setLoading(false);
//   };
//
//
//   const handleMappingChange = (e) => {
//
//     setMapping({
//       ...mapping,
//       [e.target.name]: e.target.value
//     });
//
//   };
//
//
//   const handleMappedUpload = async () => {
//
//     if (!mappedFile) {
//       setMessage({ type: "error", text: "Please select mapped file" });
//       return;
//     }
//
//     const formData = new FormData();
//
//     formData.append("file", mappedFile);
//     formData.append("mapping", JSON.stringify(mapping));
//
//     setLoading(true);
//
//     try {
//
//       const response = await fetch(
//         "http://localhost:8080/ingest/upload/mapped",
//         {
//           method: "POST",
//           body: formData
//         }
//       );
//
//       const data = await response.json();
//
//       setResults(data);
//
//       setMessage({ type: "success", text: "Mapped upload successful" });
//
//     } catch {
//
//       setMessage({ type: "error", text: "Mapped upload failed" });
//
//     }
//
//     setLoading(false);
//   };
// const handleExtractColumns = async () => {
//
//   if (!mappedFile) {
//     setMessage({ type: "error", text: "Please select file first" });
//     return;
//   }
//
//   const formData = new FormData();
//   formData.append("file", mappedFile);
//
//   setLoading(true);
//
//   try {
//
//     const response = await fetch(
//       "http://localhost:8080/ingest/headers",
//       {
//         method: "POST",
//         body: formData
//       }
//     );
//
//     const data = await response.json();
//
//     setFileColumns(data);
//
//     setMessage({ type: "success", text: "Columns extracted successfully" });
//
//   } catch {
//
//     setMessage({ type: "error", text: "Column extraction failed" });
//
//   }
//
//   setLoading(false);
// };
//
//   return (
//
//     <Container maxWidth="lg" sx={{ mt: 5 }}>
//
//       <Typography variant="h4" gutterBottom>
//         File Ingestion Dashboard
//       </Typography>
//
//       {message && (
//         <Alert severity={message.type} sx={{ mb: 3 }}>
//           {message.text}
//         </Alert>
//       )}
//
//       {loading && <LinearProgress sx={{ mb: 3 }} />}
//
//       {/* Normal Upload */}
//
//       <Card sx={{ mb: 4 }}>
//         <CardContent>
//
//           <Typography variant="h6" gutterBottom>
//             Normal Upload
//           </Typography>
//
//           <input
//             type="file"
//             multiple
//             onChange={(e) => setFiles(e.target.files)}
//           />
//
//           <br />
//
//           <Button
//             variant="contained"
//             sx={{ mt: 2 }}
//             onClick={handleUpload}
//           >
//             Upload
//           </Button>
//
//         </CardContent>
//       </Card>
//
//       {/* Mapped Upload */}
//
//       <Card sx={{ mb: 4 }}>
//         <CardContent>
//
//           <Typography variant="h6" gutterBottom>
//             Mapped Upload
//           </Typography>
//
//           <input
//             type="file"
//             onChange={(e) => setMappedFile(e.target.files[0])}
//           />
//           <Button
//             variant="outlined"
//             sx={{ mt: 2, ml: 2 }}
//             onClick={handleExtractColumns}
//           >
//             Extract Columns
//           </Button>
//           {fileColumns.length > 0 && (
//
//             <ColumnMapper
//               fileColumns={fileColumns}
//               dbColumns={dbColumns}
//               setMapping={setMapping}
//             />
//
//           )}
//
//           <Button
//             variant="contained"
//             sx={{ mt: 2 }}
//             onClick={handleMappedUpload}
//           >
//             Upload With Mapping
//           </Button>
//
//         </CardContent>
//       </Card>
//
//       {/* Results */}
//
//       {results.length > 0 && (
//
//         <Card>
//           <CardContent>
//
//             <Typography variant="h5" gutterBottom>
//               Ingestion Results
//             </Typography>
//
//             {results.map((res, index) => (
//
//               <Card key={index} sx={{ mb: 3, p: 2 }} >
//
//                 <Typography variant="h6">
//                   {res.fileName}
//                 </Typography>
//
//                 <Typography>Total: {res.totalCount}</Typography>
//                 <Typography>Success: {res.successCount}</Typography>
//                 <Typography>Failed: {res.failedCount}</Typography>
//
//                 {res.failedRows?.length > 0 && (
//
//                   <Table sx={{ mt: 2 }}>
//
//                     <TableHead>
//                       <TableRow>
//                         <TableCell>Row Number</TableCell>
//                         <TableCell>Description</TableCell>
//                       </TableRow>
//                     </TableHead>
//
//                     <TableBody>
//
//                       {res.failedRows.map((row, i) => (
//
//                         <TableRow key={i}>
//                           <TableCell>{row.rowNum}</TableCell>
//                           <TableCell>{row.description}</TableCell>
//                         </TableRow>
//
//                       ))}
//
//                     </TableBody>
//
//                   </Table>
//
//                 )}
//
//               </Card>
//
//             ))}
//
//           </CardContent>
//         </Card>
//
//       )}
//
//     </Container>
//   );
// }
//
// export default App;
//
//
import { useState, useRef } from "react";
import ColumnMapper from "./components/ColumnMapper.jsx";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }

/* Kill any parent constraint */
html,body { width:100% !important; max-width:none !important; overflow-y:scroll; }
#root { width:100% !important; max-width:none !important; display:block !important; }

/* MUI container overrides */
.MuiContainer-root,.MuiContainer-maxWidthLg,.MuiContainer-maxWidthMd {
  max-width:none !important; padding:0 !important;
}

:root {
  --bg:       #f2ece0;
  --bg2:      #e9e2d4;
  --surface:  #faf7f0;
  --surface2: #f0ebe0;
  --border:   #dbd2bf;
  --border2:  #c9bfaa;
  --blue:     #1a5fd4;
  --blue-lt:  #dbeafe;
  --blue-mid: #93c5fd;
  --blue-dk:  #1e3a8a;
  --teal:     #0a8a7e;
  --teal-lt:  #ccfbf1;
  --teal-dk:  #134e4a;
  --amber-lt: #fef3c7;
  --amber-dk: #78350f;
  --text:     #1a1512;
  --text2:    #6b6057;
  --text3:    #a89e93;
  --ok:       #047857; --ok-bg:#d1fae5; --ok-bd:#6ee7b7;
  --err:      #b91c1c; --err-bg:#fee2e2; --err-bd:#fca5a5;
  --font:     'Plus Jakarta Sans', sans-serif;
  --mono:     'JetBrains Mono', monospace;
  --sh:       0 1px 3px rgba(0,0,0,.07),0 1px 2px rgba(0,0,0,.04);
  --sh-md:    0 4px 18px rgba(0,0,0,.09),0 1px 4px rgba(0,0,0,.05);
  --sh-lg:    0 12px 40px rgba(0,0,0,.12),0 4px 12px rgba(0,0,0,.06);
}

body { background:var(--bg); color:var(--text); font-family:var(--font); -webkit-font-smoothing:antialiased; }

@keyframes rise    { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:none} }
@keyframes popIn   { from{opacity:0;transform:scale(.82)}       to{opacity:1;transform:none} }
@keyframes blink   { 0%,100%{opacity:1} 50%{opacity:.3} }
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
@keyframes toastIn { from{opacity:0;transform:translateX(40px) scale(.92)} to{opacity:1;transform:none} }

/* PAGE — 100vw, content centred */
.fi-page {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 48px 40px 100px;
  background:
    radial-gradient(ellipse 65% 40% at 95% 3%,  rgba(26,95,212,.10) 0%,transparent 55%),
    radial-gradient(ellipse 55% 40% at  4% 97%, rgba(10,138,126,.10) 0%,transparent 55%),
    var(--bg);
}

/* SHELL — the inner content column */
.fi-shell { width:100%; max-width:900px; }

/* TOASTS */
.fi-toasts { position:fixed; top:24px; right:24px; z-index:9999; display:flex; flex-direction:column; gap:10px; pointer-events:none; }
.fi-toast  { pointer-events:all; display:flex; align-items:center; gap:10px; padding:14px 20px; border-radius:10px; font-size:14px; font-weight:500; background:var(--surface); border:1px solid var(--border); box-shadow:var(--sh-lg); animation:toastIn .3s cubic-bezier(.34,1.56,.64,1); max-width:340px; }
.fi-toast-ok  { border-left:3px solid var(--ok); }
.fi-toast-err { border-left:3px solid var(--err); }

/* LOADER */
.fi-loader      { height:3px; background:var(--border); border-radius:3px; overflow:hidden; margin-bottom:24px; }
.fi-loader-fill { height:100%; background:linear-gradient(90deg,var(--teal),var(--blue),var(--teal)); background-size:200% 100%; animation:shimmer 1.4s linear infinite; }

/* HEADER */
.fi-hdr { margin-bottom:36px; padding-bottom:32px; border-bottom:2px solid var(--border); display:flex; align-items:flex-end; justify-content:space-between; flex-wrap:wrap; gap:20px; animation:rise .4s ease both; }
.fi-eye { display:flex; align-items:center; gap:10px; font-family:var(--mono); font-size:12px; font-weight:600; letter-spacing:.18em; text-transform:uppercase; color:var(--teal); margin-bottom:12px; }
.fi-eye::before { content:''; width:22px; height:3px; background:var(--teal); border-radius:2px; }
.fi-h1  { font-size:clamp(30px,4vw,50px); font-weight:800; letter-spacing:-.04em; line-height:1; }
.fi-h1 span { color:var(--blue); }
.fi-sub { margin-top:10px; font-size:15px; color:var(--text2); line-height:1.55; }
.fi-pills { display:flex; flex-direction:column; align-items:flex-end; gap:8px; }
.fi-pill  { display:inline-flex; align-items:center; gap:8px; padding:8px 20px; border-radius:20px; font-family:var(--mono); font-size:13px; font-weight:500; }
.fi-pill-teal  { background:var(--teal-lt); color:var(--teal-dk); border:1px solid #99f6e4; }
.fi-pill-amber { background:var(--amber-lt); color:var(--amber-dk); border:1px solid #fde68a; }
.fi-dot { width:8px; height:8px; border-radius:50%; background:var(--teal); animation:blink 2s infinite; }

/* SECTION */
.fi-sec { margin-bottom:22px; animation:rise .4s ease both; }
.fi-sec:nth-child(3){animation-delay:.07s} .fi-sec:nth-child(4){animation-delay:.13s} .fi-sec:nth-child(5){animation-delay:.20s}
.fi-sec-lbl { display:flex; align-items:center; gap:10px; font-family:var(--mono); font-size:11px; font-weight:600; letter-spacing:.15em; text-transform:uppercase; color:var(--text3); margin-bottom:12px; }
.fi-sec-lbl::after { content:''; flex:1; height:1px; background:var(--border); }
.fi-sec-num { font-size:11px; color:var(--surface); background:var(--text3); border-radius:5px; padding:2px 8px; letter-spacing:0; }

/* CARD */
.fi-card { background:var(--surface); border:1px solid var(--border); border-radius:20px; box-shadow:var(--sh); overflow:hidden; transition:box-shadow .22s,border-color .22s; width:100%; }
.fi-card:hover { box-shadow:var(--sh-md); border-color:var(--border2); }
.fi-card-head { padding:20px 28px; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:20px; }
.fi-ico { width:46px; height:46px; border-radius:13px; display:flex; align-items:center; justify-content:center; font-size:22px; flex-shrink:0; }
.ci-blue{background:var(--blue-lt)} .ci-teal{background:var(--teal-lt)} .ci-amber{background:var(--amber-lt)}
.fi-card-title { font-size:17px; font-weight:700; letter-spacing:-.02em; }
.fi-card-sub   { font-size:12px; color:var(--text2); margin-top:4px; font-family:var(--mono); }
.fi-card-body  { padding:28px; }

/* DROP ZONE */
.fi-dz {
  position:relative; border:2px dashed var(--border2); border-radius:16px;
  padding:40px 32px; text-align:center; cursor:pointer;
  transition:all .2s; background:var(--bg2); width:100%;
}
.fi-dz input { position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; height:100%; }
.fi-dz:hover  { border-color:var(--blue); background:var(--blue-lt); }
.fi-dz.on     { border-color:var(--teal); border-style:solid; background:var(--teal-lt); }
.fi-dz-ring   { width:68px; height:68px; border-radius:50%; border:2px dashed var(--border2); display:flex; align-items:center; justify-content:center; margin:0 auto 20px; font-size:30px; transition:all .2s; }
.fi-dz:hover .fi-dz-ring { border-color:var(--blue); background:white; }
.fi-dz.on    .fi-dz-ring { border-color:var(--teal); border-style:solid; background:white; }
.fi-dz-t    { font-size:18px; font-weight:700; margin-bottom:10px; }
.fi-dz-hint { font-size:15px; color:var(--text2); font-family:var(--mono); }
.fi-dz-hint b { color:var(--blue); font-weight:500; }
.fi-dz.on .fi-dz-hint b { color:var(--teal); }

/* CHIPS */
.fi-chips { display:flex; flex-wrap:wrap; gap:10px; margin-top:22px; justify-content:center; }
.fi-chip  { display:inline-flex; align-items:center; gap:7px; background:white; border:1px solid var(--blue-mid); border-radius:20px; padding:7px 18px; font-size:13px; font-family:var(--mono); color:var(--blue-dk); box-shadow:var(--sh); animation:popIn .2s cubic-bezier(.34,1.56,.64,1); }
.fi-chip-x { background:none; border:none; padding:0; color:var(--text3); font-size:18px; cursor:pointer; line-height:1; transition:color .15s; }
.fi-chip-x:hover { color:var(--err); }

/* BUTTONS */
.fi-brow { display:flex; gap:14px; flex-wrap:wrap; margin-top:26px; }
.fi-btn  { display:inline-flex; align-items:center; gap:8px; padding:11px 24px; border-radius:10px; font-family:var(--font); font-size:14px; font-weight:600; cursor:pointer; border:none; transition:all .16s ease; white-space:nowrap; letter-spacing:-.01em; }
.fi-btn:disabled { opacity:.38; cursor:not-allowed; pointer-events:none; }
.fi-btn:active   { transform:scale(.97); }
.fi-btn-blue  { background:var(--blue); color:white; box-shadow:0 2px 12px rgba(26,95,212,.3); }
.fi-btn-blue:hover  { background:#1550bc; box-shadow:0 6px 24px rgba(26,95,212,.42); transform:translateY(-2px); }
.fi-btn-teal  { background:var(--teal); color:white; box-shadow:0 2px 12px rgba(10,138,126,.3); }
.fi-btn-teal:hover  { background:#087a6f; box-shadow:0 6px 24px rgba(10,138,126,.42); transform:translateY(-2px); }
.fi-btn-ghost { background:var(--surface2); color:var(--text2); border:1.5px solid var(--border); }
.fi-btn-ghost:hover { background:var(--bg2); color:var(--text); border-color:var(--border2); }

.fi-divider { height:1px; background:var(--border); margin:22px 0; }

/* RESULTS */
.fi-result      { border:1px solid var(--border); border-radius:14px; overflow:hidden; background:var(--surface); margin-bottom:16px; box-shadow:var(--sh); animation:rise .3s ease; }
.fi-result-head { padding:18px 32px; border-bottom:1px solid var(--border); display:flex; align-items:center; gap:14px; flex-wrap:wrap; background:var(--surface2); }
.fi-rfname  { font-family:var(--mono); font-size:15px; font-weight:500; color:var(--text); flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.fi-rbadge  { display:inline-flex; align-items:center; gap:6px; padding:5px 16px; border-radius:20px; font-size:13px; font-family:var(--mono); font-weight:500; flex-shrink:0; }
.fi-rbadge-ok   { background:var(--ok-bg); color:#065f46; border:1px solid var(--ok-bd); }
.fi-rbadge-warn { background:var(--err-bg); color:#991b1b; border:1px solid var(--err-bd); }
.fi-rstats { display:flex; border-bottom:1px solid var(--border); }
.fi-rstat  { flex:1; padding:18px 20px; text-align:center; border-right:1px solid var(--border); }
.fi-rstat:last-child { border-right:none; }
.fi-rstat-l { font-size:12px; font-family:var(--mono); color:var(--text3); text-transform:uppercase; letter-spacing:.1em; margin-bottom:8px; }
.fi-rstat-v { font-size:34px; font-weight:800; letter-spacing:-.03em; }
.sv-t{color:var(--text)} .sv-ok{color:var(--ok)} .sv-er{color:var(--err)}
.fi-errlbl { padding:14px 32px 6px; font-size:11px; font-family:var(--mono); font-weight:500; color:var(--err); text-transform:uppercase; letter-spacing:.1em; }
table { width:100%; border-collapse:collapse; }
thead th { padding:12px 32px; text-align:left; font-size:12px; font-family:var(--mono); color:var(--text3); font-weight:500; text-transform:uppercase; letter-spacing:.1em; border-bottom:1px solid var(--border); background:var(--bg2); }
tbody tr { transition:background .12s; }
tbody tr:hover { background:var(--bg2); }
tbody tr+tr { border-top:1px solid var(--border); }
tbody td { padding:14px 32px; font-size:14px; font-family:var(--mono); color:var(--text); }
.td-m { color:var(--text3); font-size:13px; }
.fi-etag { display:inline-flex; align-items:center; background:var(--err-bg); border:1px solid var(--err-bd); color:#991b1b; border-radius:5px; padding:2px 9px; font-size:11px; font-weight:500; margin-right:10px; vertical-align:middle; }

/* RESPONSIVE */
@media(max-width:900px){ .fi-page{padding:40px 28px 80px;} }
@media(max-width:600px){ .fi-page{padding:28px 16px 72px;} .fi-card-body{padding:24px;} .fi-card-head{padding:20px 24px;} .fi-dz{padding:44px 24px;} .fi-brow{flex-direction:column;} .fi-btn{width:100%;justify-content:center;} .fi-pills{display:none;} }
`;

export default function App() {
  const [files, setFiles]             = useState([]);
  const [results, setResults]         = useState([]);
  const [mappedFile, setMappedFile]   = useState(null);
  const [fileColumns, setFileColumns] = useState([]);
  const [dbColumns]                   = useState(["fullName","email","phone","city","totalSalary"]);
  const [mapping, setMapping]         = useState({ full_name:"",email:"",phone:"",city:"" ,totalSalary:""});
  const [loading, setLoading]         = useState(false);
  const [toasts, setToasts]           = useState([]);
  const multiRef   = useRef();
  const singleRef  = useRef();
  const resultsRef = useRef();

  const toast = (type, text) => {
    const id = Date.now();
    setToasts(t => [...t, {id,type,text}]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 4200);
  };
  const post = async (url, body) => { const r = await fetch(url,{method:"POST",body}); return r.json(); };

  const handleUpload = async () => {
    if (!files.length) return toast("err","No files selected.");
    const fd = new FormData();
    files.forEach(f => fd.append("files",f));
    setLoading(true);
    try { setResults(await post("http://localhost:8080/ingest/upload/multiple",fd)); toast("ok",`${files.length} file(s) uploaded.`); setTimeout(()=>resultsRef.current?.scrollIntoView({behavior:"smooth"}),150); }
    catch { toast("err","Upload failed."); }
    setLoading(false);
  };

  const handleExtractColumns = async () => {
    if (!mappedFile) return toast("err","Select a file first.");
    const fd = new FormData(); fd.append("file",mappedFile);
    setLoading(true);
    try { setFileColumns(await post("http://localhost:8080/ingest/headers",fd)); toast("ok","Columns extracted."); }
    catch { toast("err","Extraction failed."); }
    setLoading(false);
  };

  const handleMappedUpload = async () => {
    if (!mappedFile) return toast("err","Select a file.");
    const fd = new FormData(); fd.append("file",mappedFile); fd.append("mapping",JSON.stringify(mapping));
    setLoading(true);
    try { setResults(await post("http://localhost:8080/ingest/upload/mapped",fd)); toast("ok","Mapped upload complete."); setTimeout(()=>resultsRef.current?.scrollIntoView({behavior:"smooth"}),150); }
    catch { toast("err","Mapped upload failed."); }
    setLoading(false);
  };

  return (
    <>
      <style>{STYLES}</style>
      <div className="fi-toasts">
        {toasts.map(t=>(
          <div key={t.id} className={`fi-toast fi-toast-${t.type}`}>
            {t.type==="ok"?"✅":"❌"} {t.text}
          </div>
        ))}
      </div>

      <div className="fi-page">
        <div className="fi-shell">

          {/* HEADER */}
          <header className="fi-hdr">
            <div>
              <div className="fi-eye">Data Pipeline</div>
              <h1 className="fi-h1">File <span>Ingest</span></h1>
              <p className="fi-sub">Upload, map and validate your data files.</p>
            </div>
            <div className="fi-pills">
              <div className="fi-pill fi-pill-teal"><span className="fi-dot"/>API Online</div>
              <div className="fi-pill fi-pill-amber">v2.0.0</div>
            </div>
          </header>

          {loading && <div className="fi-loader"><div className="fi-loader-fill"/></div>}

          {/* 01 BATCH UPLOAD */}
          <div className="fi-sec">
            <div className="fi-sec-lbl"><span className="fi-sec-num">01</span> Batch Upload</div>
            <div className="fi-card">
              <div className="fi-card-head">
                <div className="fi-ico ci-blue">📂</div>
                <div>
                  <div className="fi-card-title">Multiple File Upload</div>
                  <div className="fi-card-sub">Ingest several files simultaneously</div>
                </div>
              </div>
              <div className="fi-card-body">
                <div className={`fi-dz${files.length?" on":""}`} onClick={()=>multiRef.current.click()}>
                  <input ref={multiRef} type="file" multiple onChange={e=>setFiles(Array.from(e.target.files))} onClick={e=>e.stopPropagation()}/>
                  <div className="fi-dz-ring">📁</div>
                  <div className="fi-dz-t">{files.length?`${files.length} file(s) selected`:"Drop files here"}</div>
                  <div className="fi-dz-hint">or <b>click to browse</b> your computer</div>
                  {files.length>0&&(
                    <div className="fi-chips">
                      {files.map((f,i)=>(
                        <span key={i} className="fi-chip">
                          📄 {f.name}
                          <button className="fi-chip-x" onClick={e=>{e.stopPropagation();setFiles(fs=>fs.filter((_,j)=>j!==i));}}>×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="fi-brow">
                  <button className="fi-btn fi-btn-blue" onClick={handleUpload} disabled={loading||!files.length}>↑ Upload {files.length>0&&`(${files.length})`}</button>
                  {files.length>0&&<button className="fi-btn fi-btn-ghost" onClick={()=>setFiles([])}>Clear all</button>}
                </div>
              </div>
            </div>
          </div>

          {/* 02 MAPPED UPLOAD */}
          <div className="fi-sec">
            <div className="fi-sec-lbl"><span className="fi-sec-num">02</span> Mapped Upload</div>
            <div className="fi-card">
              <div className="fi-card-head">
                <div className="fi-ico ci-teal">🗂️</div>
                <div>
                  <div className="fi-card-title">Upload with Column Mapping</div>
                  <div className="fi-card-sub">Draw connections between file columns and database fields</div>
                </div>
              </div>
              <div className="fi-card-body">
                <div className={`fi-dz${mappedFile?" on":""}`} onClick={()=>singleRef.current.click()}>
                  <input ref={singleRef} type="file" onChange={e=>{setMappedFile(e.target.files[0]);setFileColumns([]);}} onClick={e=>e.stopPropagation()}/>
                  <div className="fi-dz-ring">📋</div>
                  <div className="fi-dz-t">{mappedFile?mappedFile.name:"Choose a single file"}</div>
                  <div className="fi-dz-hint">{mappedFile?`${(mappedFile.size/1024).toFixed(1)} KB · click to change`:<><b>Click to browse</b> — CSV, XLSX…</>}</div>
                </div>
                <div className="fi-brow">
                  <button className="fi-btn fi-btn-teal" onClick={handleExtractColumns} disabled={loading||!mappedFile}>⚡ Extract Columns</button>
                  {mappedFile&&<button className="fi-btn fi-btn-ghost" onClick={()=>{setMappedFile(null);setFileColumns([]);}}>Clear</button>}
                </div>
                {fileColumns.length>0&&(
                  <>
                    <div className="fi-divider"/>
                    <ColumnMapper fileColumns={fileColumns} dbColumns={dbColumns} setMapping={setMapping}/>
                  </>
                )}
                <div className="fi-brow" style={{marginTop:fileColumns.length>0?32:26}}>
                  <button className="fi-btn fi-btn-blue" onClick={handleMappedUpload} disabled={loading}>↑ Upload with Mapping</button>
                </div>
              </div>
            </div>
          </div>

          {/* 03 RESULTS */}
          {results.length>0&&(
            <div className="fi-sec" ref={resultsRef}>
              <div className="fi-sec-lbl"><span className="fi-sec-num">03</span> Results</div>
              <div className="fi-card">
                <div className="fi-card-head">
                  <div className="fi-ico ci-amber">📊</div>
                  <div>
                    <div className="fi-card-title">Processing Summary</div>
                    <div className="fi-card-sub">{results.length} file(s) processed</div>
                  </div>
                </div>
                <div className="fi-card-body">
                  {results.map((res,i)=>(
                    <div key={i} className="fi-result">
                      <div className="fi-result-head">
                        <span className="fi-rfname">📄 {res.fileName}</span>
                        <span className={`fi-rbadge ${res.failedCount>0?"fi-rbadge-warn":"fi-rbadge-ok"}`}>
                          {res.failedCount>0?`${res.failedCount} errors`:"✓ Success"}
                        </span>
                      </div>
                      <div className="fi-rstats">
                        <div className="fi-rstat"><div className="fi-rstat-l">Total</div><div className="fi-rstat-v sv-t">{res.totalCount}</div></div>
                        <div className="fi-rstat"><div className="fi-rstat-l">Inserted</div><div className="fi-rstat-v sv-ok">{res.successCount}</div></div>
                        <div className="fi-rstat"><div className="fi-rstat-l">Failed</div><div className="fi-rstat-v sv-er">{res.failedCount}</div></div>
                      </div>
                      {res.failedRows?.length>0&&(
                        <>
                          <div className="fi-errlbl">⚠ Failed rows</div>
                          <table>
                            <thead><tr><th>Row</th><th>Description</th></tr></thead>
                            <tbody>
                              {res.failedRows.map((row,j)=>(
                                <tr key={j}>
                                  <td className="td-m">#{row.rowNum}</td>
                                  <td><span className="fi-etag">ERR</span>{row.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}