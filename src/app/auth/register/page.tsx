import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    // Este div está dentro del <div className="relative z-10"> de tu RootLayout
    <div className="flex flex-col min-h-[80vh] ">

      {/* Main: aquí se renderiza tu formulario centrado */}
      <main className=" flex items-center justify-center p-4">
        <RegisterForm />
      </main>
    </div>
  );
}
