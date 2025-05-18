"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { login } from '@/lib/api/auth'
import { useRouter } from 'next/navigation'


const formSchema = z.object({
  email: z.string().email({
    message: "Por favor ingrese un correo electrónico válido.",
  }),
  password: z.string().min(4, {
    message: "La contraseña debe tener al menos 8 caracteres.",
  }),
})

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrorMessage('');

    try {
      await login(values.email, values.password);
      router.push('/home');
    } catch (error: any) {
      setErrorMessage(error.message); // ✅ muestra el mensaje "Credenciales inválidas"
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Card className="rounded-2xl w-full max-w-md shadow-lg border-white ">
      <CardHeader className="space-y-2 ">
        <CardTitle className="text-2xl font-bold text-center">Inicio de Sesión</CardTitle>
        <CardDescription className="text-center">
          Registre sus datos a continuación para comenzar.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-[2vh]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            <div className="" />
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
            {/* <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal">
                      Estoy de acuerdo con los{" "}
                      <Link href="#" className="text-primary hover:underline">
                        términos y condiciones
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            /> */}
            <Button type="submit" className="w-full btn-primary rounded-2xl mt-1.5 cursor-pointer" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Crear cuenta"
              )}
            </Button>
            {errorMessage && (
  <p className="text-sm text-red-600 text-center">{errorMessage}</p>
)}

          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          ¿Aún no tienes una cuenta?{" "}
          <Link href="/auth/register" className="text-secondary hover:underline">
            Registrarse
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
