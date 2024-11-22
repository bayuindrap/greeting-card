import React from 'react';
import { Container } from 'reactstrap';
import Greeting from './pages/Greeting';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container className="mt-5">
      <h2 className="text-center">Gift Card</h2>
      <Greeting />
    </Container>
  );
}

export default App;
