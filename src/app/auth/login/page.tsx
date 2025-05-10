import Link from "next/link";
import { LoginForm } from "./LoginForm";



export default function LoginPage() {
    return (
        <div className="max-h-screen min-h-[85vh] flex flex-col">
          {/* <header className="container mx-auto py-4 px-4 flex justify-end items-center">
            <nav className="flex items-center gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Ver vuelos
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Iniciar sesión
              </Link>
              <Link
                href="#"
                className="text-sm bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md transition-colors"
              >
                Registrarse
              </Link>
            </nav>
          </header> */}
    
          <main className="flex-1 flex items-center justify-center p-4">
            <LoginForm />
          </main>
        </div>
        
    );
}