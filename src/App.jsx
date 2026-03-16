import { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  LinearProgress,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import ColumnMapper  from "./components/ColumnMapper.jsx";

function App() {

  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [mappedFile, setMappedFile] = useState(null);
  const [fileColumns, setFileColumns] = useState([]);
  const [dbColumns] = useState(["full_name", "email", "phone", "city"]);

  const [mapping, setMapping] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleUpload = async () => {

    if (!files || files.length === 0) {
      setMessage({ type: "error", text: "Please select files" });
      return;
    }

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/ingest/upload/multiple",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();
      setResults(data);

      setMessage({ type: "success", text: "Upload successful" });

    } catch {

      setMessage({ type: "error", text: "Upload failed" });

    }

    setLoading(false);
  };


  const handleMappingChange = (e) => {

    setMapping({
      ...mapping,
      [e.target.name]: e.target.value
    });

  };


  const handleMappedUpload = async () => {

    if (!mappedFile) {
      setMessage({ type: "error", text: "Please select mapped file" });
      return;
    }

    const formData = new FormData();

    formData.append("file", mappedFile);
    formData.append("mapping", JSON.stringify(mapping));

    setLoading(true);

    try {

      const response = await fetch(
        "http://localhost:8080/ingest/upload/mapped",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      setResults(data);

      setMessage({ type: "success", text: "Mapped upload successful" });

    } catch {

      setMessage({ type: "error", text: "Mapped upload failed" });

    }

    setLoading(false);
  };
const handleExtractColumns = async () => {

  if (!mappedFile) {
    setMessage({ type: "error", text: "Please select file first" });
    return;
  }

  const formData = new FormData();
  formData.append("file", mappedFile);

  setLoading(true);

  try {

    const response = await fetch(
      "http://localhost:8080/ingest/headers",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    setFileColumns(data);

    setMessage({ type: "success", text: "Columns extracted successfully" });

  } catch {

    setMessage({ type: "error", text: "Column extraction failed" });

  }

  setLoading(false);
};

  return (

    <Container maxWidth="lg" sx={{ mt: 5 }}>

      <Typography variant="h4" gutterBottom>
        File Ingestion Dashboard
      </Typography>

      {message && (
        <Alert severity={message.type} sx={{ mb: 3 }}>
          {message.text}
        </Alert>
      )}

      {loading && <LinearProgress sx={{ mb: 3 }} />}

      {/* Normal Upload */}

      <Card sx={{ mb: 4 }}>
        <CardContent>

          <Typography variant="h6" gutterBottom>
            Normal Upload
          </Typography>

          <input
            type="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />

          <br />

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleUpload}
          >
            Upload
          </Button>

        </CardContent>
      </Card>

      {/* Mapped Upload */}

      <Card sx={{ mb: 4 }}>
        <CardContent>

          <Typography variant="h6" gutterBottom>
            Mapped Upload
          </Typography>

          <input
            type="file"
            onChange={(e) => setMappedFile(e.target.files[0])}
          />
          <Button
            variant="outlined"
            sx={{ mt: 2, ml: 2 }}
            onClick={handleExtractColumns}
          >
            Extract Columns
          </Button>
          {fileColumns.length > 0 && (

            <ColumnMapper
              fileColumns={fileColumns}
              dbColumns={dbColumns}
              setMapping={setMapping}
            />

          )}

          <Typography sx={{ mt: 2 }}>
            Column Mapping
          </Typography>
            {fileColumns.length > 0 && (

              <Grid container spacing={2} sx={{ mt: 2 }}>

                File Columns

                <Grid item xs={6}>

{/*                   <Typography variant="subtitle1"> */}
{/*                     File Columns */}
{/*                   </Typography> */}

{/*                   {fileColumns.map((col, i) => ( */}
{/*                     <Typography key={i} sx={{ p: 1, borderBottom: "1px solid #ddd" }}> */}
{/*                       {col} */}
{/*                     </Typography> */}
{/*                   ))} */}

                </Grid>

                {/* Database Columns */}

                <Grid item xs={2}>

                  <Typography variant="subtitle1">
                    Database Fields
                  </Typography>

                  {dbColumns.map((col, i) => (

                    <TextField
                      key={i}
                      label={col}
                      name={col}
                      value={mapping[col]}
                      onChange={handleMappingChange}
                      fullWidth
                      sx={{ mb: 2 }}
                    />

                  ))}

                </Grid>

              </Grid>

            )}
{/*           <Grid container spacing={2} sx={{ mt: 1 }}> */}

{/*             <Grid item xs={6}> */}
{/*               <TextField */}
{/*                 label="Full Name Column" */}
{/*                 name="full_name" */}
{/*                 value={mapping.full_name} */}
{/*                 onChange={handleMappingChange} */}
{/*                 fullWidth */}
{/*               /> */}
{/*             </Grid> */}

{/*             <Grid item xs={6}> */}
{/*               <TextField */}
{/*                 label="Email Column" */}
{/*                 name="email" */}
{/*                 value={mapping.email} */}
{/*                 onChange={handleMappingChange} */}
{/*                 fullWidth */}
{/*               /> */}
{/*             </Grid> */}

{/*             <Grid item xs={6}> */}
{/*               <TextField */}
{/*                 label="Phone Column" */}
{/*                 name="phone" */}
{/*                 value={mapping.phone} */}
{/*                 onChange={handleMappingChange} */}
{/*                 fullWidth */}
{/*               /> */}
{/*             </Grid> */}

{/*             <Grid item xs={6}> */}
{/*               <TextField */}
{/*                 label="City Column" */}
{/*                 name="city" */}
{/*                 value={mapping.city} */}
{/*                 onChange={handleMappingChange} */}
{/*                 fullWidth */}
{/*               /> */}
{/*             </Grid> */}

{/*           </Grid> */}

          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleMappedUpload}
          >
            Upload With Mapping
          </Button>

        </CardContent>
      </Card>

      {/* Results */}

      {results.length > 0 && (

        <Card>
          <CardContent>

            <Typography variant="h5" gutterBottom>
              Ingestion Results
            </Typography>

            {results.map((res, index) => (

              <Card key={index} sx={{ mb: 3, p: 2 }} >

                <Typography variant="h6">
                  {res.fileName}
                </Typography>

                <Typography>Total: {res.totalCount}</Typography>
                <Typography>Success: {res.successCount}</Typography>
                <Typography>Failed: {res.failedCount}</Typography>

                {res.failedRows?.length > 0 && (

                  <Table sx={{ mt: 2 }}>

                    <TableHead>
                      <TableRow>
                        <TableCell>Row Number</TableCell>
                        <TableCell>Description</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>

                      {res.failedRows.map((row, i) => (

                        <TableRow key={i}>
                          <TableCell>{row.rowNum}</TableCell>
                          <TableCell>{row.description}</TableCell>
                        </TableRow>

                      ))}

                    </TableBody>

                  </Table>

                )}

              </Card>

            ))}

          </CardContent>
        </Card>

      )}

    </Container>
  );
}

export default App;