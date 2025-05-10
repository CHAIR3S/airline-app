"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
    name: z.string().min(1, "Requerido"),
    email: z.string().email("Correo inválido"),
    password: z.string().min(8, "Mínimo 8 caracteres"),
    phone: z.string().min(10, "Teléfono inválido"),
    gender: z.enum(["Masculino", "Femenino", "Otro"], {
        required_error: "Selecciona género",
    }),
    birthday: z.string().min(1, "Requerido"),
    passport: z.string().min(1, "Requerido"),
    profile_picture: z
        .any()
        .refine((files) => files?.length === 1, "Sube tu foto de perfil"),
    terms: z
        .boolean()
        .refine((v) => v === true, "Debes aceptar los términos y condiciones"),
});

type RegisterData = z.infer<typeof formSchema>;

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<RegisterData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            gender: "Masculino",
            birthday: "",
            passport: "",
            profile_picture: null,
            terms: false,
        },
    });

    async function onSubmit(values: RegisterData) {
        setIsLoading(true);
        // lógica de envío...
        setIsLoading(false);
    }

    return (
        <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold text-center">Crear Cuenta</CardTitle>
                <CardDescription className="text-center">
                    Completa tus datos para registrarte
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Nombre completo */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre Completo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingresa tu nombre completo" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Correo */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo Electrónico</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@correo.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Contraseña */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="Usa mayúsculas, minúsculas y números" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Teléfono */}
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Teléfono</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+52 (461) 000-0000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Fecha de cumpleaños */}
                        <FormField
                            control={form.control}
                            name="birthday"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fecha de Cumpleaños</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Número de pasaporte */}
                        <FormField
                            control={form.control}
                            name="passport"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número de Pasaporte</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ej. ABC123456" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Términos y Condiciones */}
                        <FormField
                            control={form.control}
                            name="terms"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-sm font-normal">
                                            Estoy de acuerdo con los {" "}
                                            <Link href="#" className="text-primary hover:underline">
                                                términos y condiciones
                                            </Link>
                                        </FormLabel>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />

                        {/* Botón */}
                        <Button
                            type="submit"
                            className="w-full mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Registrando...
                                </>
                            ) : (
                                "Crear cuenta"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>

            <CardFooter className="flex justify-center items-center text-center">
                <p className="text-sm text-muted-foreground">
                    ¿Ya tienes cuenta? {" "}
                    <Link href="/login" className="text-primary hover:underline">
                        Iniciar sesión
                    </Link>
                </p>
            </CardFooter>
        </Card>
    );
}
