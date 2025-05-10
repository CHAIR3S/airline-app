import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    // Este div está dentro del <div className="relative z-10"> de tu RootLayout
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-end items-center gap-6">
        <Link href="#" className="text-sm text-gray-700 hover:text-primary">
          Ver vuelos
        </Link>
        <Link href="/login" className="text-sm text-gray-700 hover:text-primary">
          Iniciar sesión
        </Link>
        <Link
          href="/register"
          className="text-sm bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md"
        >
          Registrarse
        </Link>
      </header>

      {/* Main: aquí se renderiza tu formulario centrado */}
      <main className="flex-1 flex items-center justify-center p-4">
        <RegisterForm />
      </main>
    </div>
  );
}
