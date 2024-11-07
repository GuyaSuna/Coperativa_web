import { useQuery } from "@tanstack/react-query";
import { getAllViviendas } from "../Api/api"; 

export const useViviendasDisponibles = (idCooperativa) => {
  return useQuery({
    queryKey: ["viviendasDisponibles", idCooperativa],
    queryFn: async () => {
      const response = await getAllViviendas(idCooperativa);
      return response.filter((vivienda) => vivienda.socio == null);
    },
  });
};
