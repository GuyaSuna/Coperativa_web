import { useQuery } from "@tanstack/react-query";
import { getAllSocios } from "../../Api/api";

export const useSociosActivos = (idCooperativa) => {
  return useQuery({
    queryKey: ["activeSocios", idCooperativa],
    queryFn: async () => {
      const response = await getAllSocios(idCooperativa);
      return response.filter((socio) => !socio.archivado);
    },
    enabled: !!idCooperativa, // Ejecutar solo si idCooperativa tiene un valor válido
  });
};
