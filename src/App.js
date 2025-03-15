import React from "react";
import { Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import HoneycombSphere from "./components/HoneycombSphere";

const App = () => {
  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            iMemory - Rede de Memórias Coletivas
          </Typography>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Cadastrar</Button>
        </Toolbar>
      </AppBar>
      <div style={{ height: "80vh", marginTop: "20px" }}>
        <HoneycombSphere />
      </div>
    </Container>
  );
};

export default App;