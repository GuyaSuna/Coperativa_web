import { createRouter } from '@tanstack/react-router';
import Home from '../page';
import AdminHome from '../AdministradorHome/page';
import UsuarioHome from '../UsuarioHome/page';

// Verificar si los componentes se importan correctamente
if (!Home || !AdminHome || !UsuarioHome) {
  console.error('Error en la configuración de rutas: Uno o más componentes no están definidos.');
}

const routes = [
  {
    path: '/',
    element: Home ? <Home /> : <div>Error: Página principal no encontrada.</div>,
  },
  {
    path: '/AdminHome',
    element: AdminHome ? <AdminHome /> : <div>Error: Página de administrador no encontrada.</div>,
  },
  {
    path: '/UsuarioHome',
    element: UsuarioHome ? <UsuarioHome /> : <div>Error: Página de usuario no encontrada.</div>,
  },
];

// Crea el enrutador solo si todas las rutas son válidas
const router = createRouter({ routes });

export default router;
