import { useQuery } from "@tanstack/react-query";
import { getAllSociosImpagos } from "../../Api/api";

export const useSociosImpagos = (idCooperativa) => {
  return useQuery({
    queryKey: ["sociosImpagos", idCooperativa],
    queryFn: async () => {
      const response = await getAllSociosImpagos(idCooperativa);
      return response.filter((socio) => !socio.archivado);
    },
    enabled: !!idCooperativa,
  });
};
