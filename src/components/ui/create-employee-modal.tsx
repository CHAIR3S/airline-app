"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EmployeeAPI } from "@/app/api/employee";

const formSchema = z.object({
  userId: z.number().min(1, "Usuario requerido"),
  positionId: z.number().min(1, "Puesto requerido"),
  salary: z.number().min(0, "Salario inválido"),
  airlineId: z.number().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function CreateEmployeeModal() {
  const [users, setUsers] = useState<any[]>([]);
  const [positions, setPositions] = useState<any[]>([]);
  const [airlines, setAirlines] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { userId: 0, positionId: 0, salary: 0, airlineId: undefined },
  });

  const loadOptions = async () => {
    const [users, positions, airlines] = await Promise.all([
      fetch((process.env.NEXT_PUBLIC_API_URL) +"/user").then((res) => res.json()),
      fetch((process.env.NEXT_PUBLIC_API_URL) +"/position").then((res) => res.json()),
      fetch((process.env.NEXT_PUBLIC_API_URL) +"/airline").then((res) => res.json()),
    ]);
    setUsers(users);
    setPositions(positions);
    setAirlines(airlines);
  };

  useEffect(() => {
    if (open) loadOptions();
  }, [open]);

  const onSubmit = async (values: FormData) => {
    await EmployeeAPI.create(values);
    alert("Empleado creado");
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4 bg-secondary">Crear Empleado</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registrar nuevo empleado</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label>Usuario</Label>
            <select
              {...form.register("userId", { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Seleccione usuario</option>
              {users.map((u) => (
                <option key={u.userId} value={u.userId}>
                  {u.name} {u.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Puesto</Label>
            <select
              {...form.register("positionId", { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Seleccione puesto</option>
              {positions.map((p) => (
                <option key={p.positionId} value={p.positionId}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Salario</Label>
            <Input type="number" {...form.register("salary", { valueAsNumber: true })} />
          </div>

          <div>
            <Label>Aerolínea (opcional)</Label>
            <select
              {...form.register("airlineId", { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Sin aerolínea</option>
              {airlines.map((a) => (
                <option key={a.airlineId} value={a.airlineId}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end">
            <Button className="btn-primary" type="submit">Guardar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
