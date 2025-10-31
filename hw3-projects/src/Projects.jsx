// src/Projects.jsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Stack,
} from "@mui/material";

const API_BASE = "https://alex-hw6-flask-4d0655bb41c5.herokuapp.com";

// --- Child component ---
function ProjectRow({ project, onToggleJoin, onCheckIn, onCheckOut }) {
  const { id, name, hw1, hw2, joined } = project;
  const [qty, setQty] = useState("");

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Project ID: {id}
        </Typography>

        <Typography variant="body1" sx={{ mt: 1 }}>
          Hardware Set 1: {hw1}
        </Typography>
        <Typography variant="body1">Hardware Set 2: {hw2}</Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
          <TextField
            label="Qty"
            variant="outlined"
            size="small"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            sx={{ width: "80px" }}
          />
          <Button
            variant="contained"
            color="success"
            onClick={() => onCheckIn(id, qty)}
          >
            Check In
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onCheckOut(id, qty)}
          >
            Check Out
          </Button>
        </Stack>

        <Button
          variant={joined ? "outlined" : "contained"}
          color={joined ? "error" : "primary"}
          sx={{ mt: 1 }}
          onClick={() => onToggleJoin(id, joined)}
        >
          {joined ? "Leave Project" : "Join Project"}
        </Button>
      </CardContent>
    </Card>
  );
}

// --- Main component ---
export default function Projects() {
  const [projects, setProjects] = useState([
    { id: "proj-1", name: "Senior Design Portal", hw1: 5, hw2: 3, joined: false },
    { id: "proj-2", name: "Smart Inventory Dashboard", hw1: 2, hw2: 8, joined: true },
    { id: "proj-3", name: "TOT Nail Supply Ops", hw1: 0, hw2: 4, joined: false },
  ]);

  // Join / Leave
  const handleToggleJoin = (id, joined) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, joined: !joined } : p))
    );
    const endpoint = joined
      ? `${API_BASE}/leaveProject/${id}`
      : `${API_BASE}/joinProject/${id}`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => console.log("Join/Leave:", data))
      .catch((err) => console.error(err));
  };

  // Check-in
  const handleCheckIn = (id, qty) => {
    fetch(`${API_BASE}/checkin?projectId=${id}&qty=${qty}`)
      .then((res) => res.json())
      .then((data) => console.log("Check-In:", data))
      .catch((err) => console.error(err));
  };

  // Check-out
  const handleCheckOut = (id, qty) => {
    fetch(`${API_BASE}/checkout?projectId=${id}&qty=${qty}`)
      .then((res) => res.json())
      .then((data) => console.log("Check-Out:", data))
      .catch((err) => console.error(err));
  };

  // Leave all
  const handleLeaveAll = () => {
    setProjects((prev) => prev.map((p) => ({ ...p, joined: false })));
    projects.forEach((p) =>
      fetch(`${API_BASE}/leaveProject/${p.id}`).catch(() => {})
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>
      <Typography variant="body1" gutterBottom>
        Choose a project to join, leave, check in, or check out hardware.  
        All values are hardcoded for HW 5.
      </Typography>

      <Grid container spacing={2}>
        {projects.map((p) => (
          <Grid key={p.id} item xs={12} md={6}>
            <ProjectRow
              project={p}
              onToggleJoin={handleToggleJoin}
              onCheckIn={handleCheckIn}
              onCheckOut={handleCheckOut}
            />
          </Grid>
        ))}
      </Grid>

      <Button variant="outlined" sx={{ mt: 3 }} onClick={handleLeaveAll}>
        Leave All Projects
      </Button>
    </Container>
  );
}
