import { useQuery } from "@tanstack/react-query";
import { getAllUsuarios } from "@/Api/api";

const useUsuarios = (idCooperativa) => {
  return useQuery(
    ["usuarios", idCooperativa],
    () => getAllUsuarios(idCooperativa),
    {
      enabled: !!idCooperativa, // Solo se ejecuta si idCooperativa tiene un valor válido
      staleTime: 5 * 60 * 1000, // Opcional: cachear los datos por 5 minutos
    }
  );
};

export default useUsuarios;
