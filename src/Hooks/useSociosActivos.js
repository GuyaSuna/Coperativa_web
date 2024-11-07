import { useQuery } from "@tanstack/react-query";
import { getAllSocios } from "../Api/api";

export const useActiveSocios = (idCooperativa) => {
  return useQuery({
    queryKey: ["activeSocios", idCooperativa],
    queryFn: async () => {
      const response = await getAllSocios(idCooperativa);
      return response.filter((socio) => !socio.archivado);
    },
  });
};
