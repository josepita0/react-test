import { useQuery } from "@tanstack/react-query";
import { api } from "../../core/http/axiosClient";
import { ApiListResponse } from "../../core/http/api.types";
import { Character } from "../types";
import { useLocalCharacters } from "../store/localCharacters.store";

export function useCharacters() {
  const overlay = useLocalCharacters();
  return useQuery({
    queryKey: ["characters", overlay.version],
    queryFn: async () => {
      const { data } = await api.get<ApiListResponse<Character>>("/character");
      let list = data.docs;

      if (overlay.edited.size) {
        list = list.map((c) => overlay.edited.get(c._id) ?? c);
      }
      // No filtramos ocultos aquí: el estatus Activo/Inactivo se maneja en la UI (filtros y badges)
      if (overlay.custom.length) {
        list = [...overlay.custom, ...list];
      }

      return list;
    },
  });
}
