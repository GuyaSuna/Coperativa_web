import { useQuery } from "@tanstack/react-query";
import { getAllSocios } from "../Api/api"; 

export const useGetAllSocios = (idCooperativa) => {
    return useQuery({
        queryKey: ['socios', idCooperativa],
        queryFn: async () => await getAllSocios(idCooperativa),
    });
};
