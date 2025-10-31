import * as React from "react";
import { Chip } from "@mui/material";

export default function HardwareSet({ name, checkedOut }) {
  return <Chip label={`${name}: ${checkedOut} checked out`} variant="outlined" size="small" sx={{ mr: 1, mb: 1 }} />;
}
