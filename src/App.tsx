import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ChakraProvider } from '@chakra-ui/react'
import Home from './pages/Home';
import SignIn from './pages/SignIn';

const App = () => {
  
  return (  
    <BrowserRouter>
    <ChakraProvider>
    <AuthProvider>  
      <Routes>
      <Route path='' element={<SignIn />}/>  
      <Route path='home' element={<Home />}/>    
      </Routes> 
    </AuthProvider>
    </ChakraProvider>
    </BrowserRouter>
  );
}

export default App;