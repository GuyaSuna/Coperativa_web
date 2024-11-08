import { useQuery } from "@tanstack/react-query";
import { getAllUsuarios } from "@/Api/api";

const useUsuarios = (idCooperativa) => {
  return useQuery({
    queryKey: ["usuarios", idCooperativa], // Define la clave de la consulta
    queryFn: () => getAllUsuarios(idCooperativa), // Función que obtiene los datos
    enabled: !!idCooperativa, // Solo se ejecuta si idCooperativa tiene un valor válido
  });
};

export default useUsuarios;
