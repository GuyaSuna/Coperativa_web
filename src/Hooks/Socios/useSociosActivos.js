import { useQuery } from "@tanstack/react-query";
import { getAllSocios } from "../../Api/api";

export const useSociosActivos = (idCooperativa) => {
  return useQuery({
    queryKey: ["activeSocios", idCooperativa],
    queryFn: async () => {
      if (!idCooperativa) return [];
      const response = await getAllSocios(idCooperativa);
      console.log("getAllSociosH", response);
      if (!response) throw new Error("No se pudo obtener la lista de socios");
      console.log("getAllSociosHfa", response);
      return response.filter((socio) => !socio.archivado);
    },
    enabled: !!idCooperativa, // Ejecutar solo si idCooperativa tiene un valor válido
  });
};
