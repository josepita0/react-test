import { useCharacters } from "../characters/api/useCharacters";
import { Button } from "../shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogDescription,
} from "../shared/ui/dialog";
import { Input } from "../shared/ui/input";
import { Label } from "../shared/ui/label";
import { useLocalCharacters } from "../characters/store/localCharacters.store";
import { useState } from "react";
import {
  Character,
  RACES,
  GENDERS,
  raceLabel,
  genderLabel,
} from "../characters/types";
import { useAuthStore } from "../auth/store/auth.store";
import { DashboardLayout } from "../shared/layout/DashboardLayout";
import { CharactersTable } from "../characters/components/CharactersTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../shared/ui/select";
// Spinner is handled inside CharactersTable during loading

export default function CharactersPage() {
  const { data, isLoading, error, refetch } = useCharacters();
  const store = useLocalCharacters();

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Partial<Character>>({ name: "" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [filterName, setFilterName] = useState("");
  const [filterRace, setFilterRace] = useState<string | undefined>("Todos");
  const [filterGender, setFilterGender] = useState<string | undefined>("Todos");
  const [filterStatus, setFilterStatus] = useState<string | undefined>(
    "Activo"
  );

  const onAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    store.add({
      name: form.name!,
      race: form.race ?? "",
      gender: form.gender ?? "",
    });
    setForm({ name: "" });
    setOpen(false);
    refetch();
  };

  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Character>>({});
  const openEdit = (c: Character) => {
    setEditId(c._id);
    setEditForm({ name: c.name, race: c.race, gender: c.gender });
  };
  const submitEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editId) return;
    store.edit(editId, {
      name: editForm.name,
      race: editForm.race,
      gender: editForm.gender,
    });
    setEditId(null);
    setEditForm({});
    refetch();
  };

  // No full-screen blocking states; we show subtle inline feedback below.

  return (
    <DashboardLayout title="Personajes">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-semibold">Personajes</h1>
          <div className="flex w-full flex-wrap gap-2 sm:w-auto sm:flex-nowrap">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                store.reset();
                refetch();
              }}
            >
              Rehacer consulta
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="shrink-0">
                  Agregar personaje
                </Button>
              </DialogTrigger>
              <DialogContent>
                <form onSubmit={onAdd} className="space-y-4">
                  <DialogHeader>
                    <DialogTitle>Agregar personaje</DialogTitle>
                    <DialogDescription>
                      Crear un nuevo personaje para tu lista local.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={form.name ?? ""}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, name: e.target.value }))
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="race">Race</Label>
                      <Select
                        value={(form.race as string | undefined) || undefined}
                        onValueChange={(value) =>
                          setForm((f) => ({ ...f, race: value }))
                        }
                      >
                        <SelectTrigger id="race">
                          <SelectValue placeholder="Seleccione…" />
                        </SelectTrigger>
                        <SelectContent>
                          {RACES.map((r) => (
                            <SelectItem key={r} value={r}>
                              {raceLabel(r)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select
                        value={(form.gender as string | undefined) || undefined}
                        onValueChange={(value) =>
                          setForm((f) => ({ ...f, gender: value }))
                        }
                      >
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Seleccione…" />
                        </SelectTrigger>
                        <SelectContent>
                          {GENDERS.map((g) => (
                            <SelectItem key={g} value={g}>
                              {genderLabel(g)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Guardar</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {/* Logout se mantiene en el sidebar */}
          </div>
        </div>
        <Dialog
          open={Boolean(editId)}
          onOpenChange={(o) => {
            if (!o) setEditId(null);
          }}
        >
          <DialogContent>
            <form onSubmit={submitEdit} className="space-y-4">
              <DialogHeader>
                <DialogTitle>Editar personaje</DialogTitle>
                <DialogDescription>
                  Editar los datos del personaje seleccionado.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="edit_name">Name</Label>
                  <Input
                    id="edit_name"
                    value={editForm.name ?? ""}
                    onChange={(e) =>
                      setEditForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit_race">Race</Label>
                  <Select
                    value={(editForm.race as string | undefined) || undefined}
                    onValueChange={(value) =>
                      setEditForm((f) => ({ ...f, race: value }))
                    }
                  >
                    <SelectTrigger id="edit_race">
                      <SelectValue placeholder="Seleccione…" />
                    </SelectTrigger>
                    <SelectContent>
                      {RACES.map((r) => (
                        <SelectItem key={r} value={r}>
                          {raceLabel(r)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit_gender">Gender</Label>
                  <Select
                    value={(editForm.gender as string | undefined) || undefined}
                    onValueChange={(value) =>
                      setEditForm((f) => ({ ...f, gender: value }))
                    }
                  >
                    <SelectTrigger id="edit_gender">
                      <SelectValue placeholder="Seleccione…" />
                    </SelectTrigger>
                    <SelectContent>
                      {GENDERS.map((g) => (
                        <SelectItem key={g} value={g}>
                          {genderLabel(g)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Guardar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <div className="mb-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="grid gap-1">
              <Label htmlFor="f_name">Nombre</Label>
              <Input
                id="f_name"
                placeholder="Buscar por nombre"
                value={filterName}
                onChange={(e) => {
                  setFilterName(e.target.value);
                  setPage(1);
                }}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="f_race">Raza</Label>
              <Select
                value={filterRace ?? undefined}
                onValueChange={(v) => {
                  setFilterRace(v || undefined);
                  setPage(1);
                }}
              >
                <SelectTrigger id="f_race">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  {RACES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {raceLabel(r)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="f_gender">Género</Label>
              <Select
                value={filterGender ?? undefined}
                onValueChange={(v) => {
                  setFilterGender(v || undefined);
                  setPage(1);
                }}
              >
                <SelectTrigger id="f_gender">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  {GENDERS.map((g) => (
                    <SelectItem key={g} value={g}>
                      {genderLabel(g)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="f_status">Estatus</Label>
              <Select
                value={filterStatus ?? undefined}
                onValueChange={(v) => {
                  setFilterStatus(v || undefined);
                  setPage(1);
                }}
              >
                <SelectTrigger id="f_status">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos">Todos</SelectItem>
                  <SelectItem value="Activo">Activo</SelectItem>
                  <SelectItem value="Inactivo">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setFilterName("");
                setFilterRace("Todos");
                setFilterGender("Todos");
                setFilterStatus("Activo");
                setPage(1);
              }}
            >
              Limpiar filtros
            </Button>
          </div>
        </div>
        {error && (
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            No se pudieron cargar los personajes. Intenta nuevamente.
          </div>
        )}
        {(() => {
          const items = (data ?? []).filter((c) => {
            // Name filter (insensitive)
            if (
              filterName &&
              !c.name.toLowerCase().includes(filterName.toLowerCase())
            )
              return false;
            // Race filter (ignore "Todos")
            if (filterRace && filterRace !== "Todos" && c.race !== filterRace)
              return false;
            // Gender filter (ignore "Todos")
            if (
              filterGender &&
              filterGender !== "Todos" &&
              c.gender !== filterGender
            )
              return false;
            // Status filter: usamos store.hidden para determinar inactividad
            if (!filterStatus || filterStatus === "Activo") {
              if (store.hidden.has(c._id)) return false; // default/Activo
            } else if (filterStatus === "Inactivo") {
              if (!store.hidden.has(c._id)) return false;
            } // "Todos" deja pasar ambos
            return true;
          });
          const total = items.length;
          const pageItems = items.slice(
            (page - 1) * pageSize,
            (page - 1) * pageSize + pageSize
          );
          return (
            <CharactersTable
              data={pageItems}
              page={page}
              pageSize={pageSize}
              total={total}
              loading={isLoading}
              loadingMessage="Cargando…"
              onPageChange={(p) => setPage(p)}
              onPageSizeChange={(s) => {
                setPageSize(s);
                setPage(1);
              }}
              onHide={(id) => {
                store.toggle(id);
              }}
              onEdit={(id) => {
                const found = (data ?? []).find((c) => c._id === id);
                if (found) openEdit(found);
              }}
            />
          );
        })()}
      </div>
    </DashboardLayout>
  );
}
