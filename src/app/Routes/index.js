import { createRouter } from '@tanstack/react-router';
import Home from '../page'; // Asegúrate de que la ruta sea correcta
import AdminHome from '../AdministradorHome/page';
import UsuarioHome from '../UsuarioHome/page';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/AdminHome',
    element: <AdminHome />,
  },
  {
    path: '/UsuarioHome',
    element: <UsuarioHome />,
  },
];

const router = createRouter({ routes });

export default router;
