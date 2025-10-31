import * as React from "react";
import { Card, CardContent, CardActions, Typography, Chip, Stack, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HardwareSet from "./HardwareSet";

export default function ProjectCard({ id, name, description, hardwareSets, joined, onToggleJoin }) {
  return (
    <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>{name}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{description}</Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 1 }} useFlexGap flexWrap="wrap">
          {hardwareSets.map((hs, i) => (
            <HardwareSet key={i} name={hs.name} checkedOut={hs.checkedOut} />
          ))}
        </Stack>

        <Chip label={joined ? "Joined" : "Not Joined"} color={joined ? "success" : "default"} size="small" />
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          color={joined ? "inherit" : "primary"}
          startIcon={joined ? <LogoutIcon /> : <LoginIcon />}
          onClick={() => onToggleJoin(id)}
        >
          {joined ? "Leave Project" : "Join Project"}
        </Button>
      </CardActions>
    </Card>
  );
}
