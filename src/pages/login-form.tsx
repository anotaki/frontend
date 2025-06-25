import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CircleIcon } from "../components/icons/circle-icon";

// Schema de validação com Zod
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Digite um email válido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);

    // Simular chamada de API
    try {
      console.log("Dados do login:", data);
      // Aqui você faria a chamada para sua API de autenticação
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Login realizado com sucesso!");
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center gap-5 justify-center">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Acesse seu <span className="text-primary">Anotaki</span>
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Digite suas credenciais para acessar
            </p>
          </div>
          <img src="/anotaki_img.png" className="size-24"></img>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Campo Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  autoComplete="email"
                  className={`appearance-none relative block w-full px-3 py-2 border bg-white ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                  placeholder="Digite seu email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Senha
              </label>
              <div className="mt-1">
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  className={`appearance-none relative block w-full px-3 py-2 border bg-white ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                  placeholder="Digite sua senha"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Opções adicionais */}
          <div className="flex flex-row-reverse">
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-primary hover:text-primary/80"
              >
                Esqueceu sua senha?
              </a>
            </div>
          </div>

          {/* Botão de Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white cursor-pointer ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              } transition-colors duration-200`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <CircleIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Entrando...
                </div>
              ) : (
                "Entrar"
              )}
            </button>
          </div>

          {/* Link para cadastro */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:text-primary/80"
              >
                Cadastre-se aqui
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
