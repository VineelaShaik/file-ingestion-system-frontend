import {
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  TextField
} from "@mui/material";

export default function TransformationEditor({
  selectedField,
  sources,
  transformations,
  setTransformations
}) {

  if (!selectedField) return null;

  const rule = transformations[selectedField] || {
    operation: "direct",
    value: ""
  };

  const handleOperationChange = (e) => {

    setTransformations(prev => ({
      ...prev,
      [selectedField]: {
        ...prev[selectedField],
        operation: e.target.value,
        sources
      }
    }));

  };

  const handleValueChange = (e) => {

    setTransformations(prev => ({
      ...prev,
      [selectedField]: {
        ...prev[selectedField],
        value: e.target.value,
        sources
      }
    }));

  };

  return (

    <Card sx={{ mt: 3 }}>

      <CardContent>

        <Typography variant="h6">
          Transformation Editor
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Target Field: <b>{selectedField}</b>
        </Typography>

        <Typography sx={{ mt: 2 }}>
          Sources
        </Typography>

        {sources.map((s,i)=>(
          <Typography key={i}>{s}</Typography>
        ))}

        <Typography sx={{ mt: 2 }}>
          Operation
        </Typography>

        <Select
          value={rule.operation}
          onChange={handleOperationChange}
          fullWidth
        >
          <MenuItem value="direct">Direct</MenuItem>
          <MenuItem value="concat">Concat</MenuItem>
          <MenuItem value="sum">Sum</MenuItem>
          <MenuItem value="multiply">Multiply</MenuItem>
        </Select>

        {rule.operation === "multiply" && (

          <TextField
            label="Value"
            value={rule.value}
            onChange={handleValueChange}
            fullWidth
            sx={{ mt: 2 }}
          />

        )}

      </CardContent>

    </Card>
  );
}