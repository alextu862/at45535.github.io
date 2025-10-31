// src/Projects.jsx
import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";

// small reusable child component defined in the SAME file
function ProjectRow({ project, onToggleJoin }) {
  const { id, name, hw1, hw2, joined } = project;

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
        <Typography variant="body1">
          Hardware Set 2: {hw2}
        </Typography>

        <Button
          variant={joined ? "outlined" : "contained"}
          color={joined ? "error" : "primary"}
          sx={{ mt: 1 }}
          onClick={() => onToggleJoin(id)}
        >
          {joined ? "Leave Project" : "Join Project"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Projects() {
  // hardcoded data (HW5 says it's okay to hardcode) :contentReference[oaicite:1]{index=1}
  const [projects, setProjects] = useState([
    {
      id: "proj-1",
      name: "Senior Design Portal",
      hw1: 5,
      hw2: 3,
      joined: false,
    },
    {
      id: "proj-2",
      name: "Smart Inventory Dashboard",
      hw1: 2,
      hw2: 8,
      joined: true,
    },
    {
      id: "proj-3",
      name: "TOT Nail Supply Ops",
      hw1: 0,
      hw2: 4,
      joined: false,
    },
  ]);

  // required: custom event handler that modifies state
  const handleToggleJoin = (id) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, joined: !p.joined } : p
      )
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* MUI component #1 */}
      <Typography variant="h4" gutterBottom>
        Projects
      </Typography>

      {/* MUI component #2 */}
      <Typography variant="body1" gutterBottom>
        Choose a project to join or leave. Hardware values are hardcoded for HW5.
      </Typography>

      <Grid container spacing={2}>
        {projects.map((p) => (
          <Grid key={p.id} item xs={12} md={6}>
            {/* reuse the SAME custom component multiple times */}
            <ProjectRow project={p} onToggleJoin={handleToggleJoin} />
          </Grid>
        ))}
      </Grid>

      {/* extra MUI component just to be safe */}
      <Button
        variant="outlined"
        sx={{ mt: 3 }}
        onClick={() =>
          setProjects((prev) =>
            prev.map((p) => ({ ...p, joined: false }))
          )
        }
      >
        Leave All Projects
      </Button>
    </Container>
  );
}
