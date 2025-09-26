import { Character, raceLabel, genderLabel } from "../types";
import { useLocalCharacters } from "../store/localCharacters.store";
import { Table, THead, TBody, TR, TH, TD } from "../../shared/ui/table";
import { Button } from "../../shared/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shared/ui/select";
import { Spinner } from "../../shared/ui/spinner";

export interface CharactersTableProps {
  data: Character[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  onHide: (id: string) => void;
  onEdit: (id: string) => void;
  loading?: boolean;
  emptyMessage?: string;
  loadingMessage?: string;
}

export function CharactersTable({
  data,
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  onHide,
  onEdit,
  loading,
  emptyMessage = "Sin información",
  loadingMessage = "Cargando…",
}: CharactersTableProps) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const store = useLocalCharacters();
  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm max-h-[60vh] overflow-y-auto">
        <Table>
          <THead>
            <TR>
              <TH className="text-center w-16">ID</TH>
              <TH className="text-center w-[28%]">NOMBRE</TH>
              <TH className="text-center w-[20%]">RAZA</TH>
              <TH className="text-center w-[20%]">GÉNERO</TH>
              <TH className="text-center w-[16%]">ESTADO</TH>
              <TH className="text-center w-[20%]">ACCIONES</TH>
            </TR>
          </THead>
          <TBody>
            {loading ? (
              <TR>
                <TD colSpan={6} className="py-10 text-center text-slate-500">
                  <div className="inline-flex items-center gap-2">
                    <Spinner size={16} />
                    <span>{loadingMessage}</span>
                  </div>
                </TD>
              </TR>
            ) : data.length === 0 ? (
              <TR>
                <TD colSpan={6} className="py-10 text-center text-slate-500">
                  {emptyMessage}
                </TD>
              </TR>
            ) : (
              data.map((c, i) => {
                const idx = (page - 1) * pageSize + i + 1;
                const inactive = store.hidden.has(c._id);
                return (
                  <TR
                    key={c._id ?? idx}
                    className="odd:bg-white even:bg-slate-50/30"
                  >
                    <TD className="text-center text-slate-700">{idx}</TD>
                    <TD className="text-center font-semibold text-slate-800  tracking-wide">
                      {c.name}
                    </TD>
                    <TD className="text-center text-slate-700 ">
                      {c.race ? raceLabel(c.race) : "—"}
                    </TD>
                    <TD className="text-center text-slate-700 ">
                      {c.gender ? genderLabel(c.gender) : "—"}
                    </TD>
                    <TD className="text-center">
                      {inactive ? (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-red-200 text-red-700 font-bold">
                          Inactivo
                        </span>
                      ) : (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700 font-bold">
                          Activo
                        </span>
                      )}
                    </TD>
                    <TD className="text-center">
                      <div className="flex gap-2 justify-center">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onHide(c._id)}
                        >
                          {inactive ? "Mostrar" : "Ocultar"}
                        </Button>
                        <Button size="sm" onClick={() => onEdit(c._id)}>
                          Editar
                        </Button>
                      </div>
                    </TD>
                  </TR>
                );
              })
            )}
          </TBody>
        </Table>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2 p-2 sm:justify-end">
        <Button
          size="sm"
          variant="outline"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Anterior
        </Button>
        <div className="w-[70px] sm:w-[80px]">
          <Select
            value={String(pageSize)}
            onValueChange={(v) => onPageSizeChange?.(parseInt(v, 10))}
          >
            <SelectTrigger aria-label="Tamaño de página">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          size="sm"
          variant="outline"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}
