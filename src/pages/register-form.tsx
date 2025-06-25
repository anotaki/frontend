import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckIcon } from "../components/icons/check-icon";
import { CircleIcon } from "../components/icons/circle-icon";
import { validateCPF } from "../utils";

// Função para verificar requisitos de senha
const checkPasswordRequirements = (password: string) => {
  return {
    minLength: password.length >= 8,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^a-zA-Z0-9]/.test(password),
  };
};

// Schema de validação com Zod
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .min(2, "Nome deve ter pelo menos 2 caracteres")
      .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
    email: z
      .string()
      .min(1, "Email é obrigatório")
      .email("Digite um email válido"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .regex(/[a-zA-Z]/, "Senha deve conter pelo menos uma letra")
      .regex(/[0-9]/, "Senha deve conter pelo menos um número")
      .regex(
        /[^a-zA-Z0-9]/,
        "Senha deve conter pelo menos um caractere especial"
      ),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
    cpf: z
      .string()
      .min(1, "CPF é obrigatório")
      .refine((cpf) => validateCPF(cpf), "CPF inválido"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Função para formatar CPF
  const formatCPF = (value: string) => {
    const cleanValue = value.replace(/\D/g, "");
    return cleanValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);

    try {
      console.log("Dados do cadastro:", data);
      // Aqui você faria a chamada para sua API de cadastro
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert("Cadastro realizado com sucesso!");
      // Redirecionar para login após cadastro bem-sucedido
      navigate("/login");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro ao realizar cadastro. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const password = watch("password");
  const passwordRequirements = checkPasswordRequirements(password || "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex items-center gap-5 justify-center">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
              Crie sua conta <span className="text-primary">Anotaki</span>
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Preencha os dados abaixo para se cadastrar
            </p>
          </div>
          <img src="/anotaki_img.png" className="size-24"></img>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            {/* Campo Nome */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nome completo
              </label>
              <div className="mt-1">
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  autoComplete="name"
                  className={`appearance-none relative block w-full px-3 py-2 border bg-white ${
                    errors.name ? "border-red-300" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                  placeholder="Digite seu nome completo"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>

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

            {/* Campo CPF */}
            <div>
              <label
                htmlFor="cpf"
                className="block text-sm font-medium text-gray-700"
              >
                CPF
              </label>
              <div className="mt-1">
                <input
                  {...register("cpf")}
                  type="text"
                  id="cpf"
                  maxLength={14}
                  className={`appearance-none relative block w-full px-3 py-2 border bg-white ${
                    errors.cpf ? "border-red-300" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                  placeholder="000.000.000-00"
                  onChange={(e) => {
                    e.target.value = formatCPF(e.target.value);
                  }}
                />
                {errors.cpf && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cpf.message}
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
                  autoComplete="new-password"
                  className={`appearance-none relative block w-full px-3 py-2 border bg-white ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                  placeholder="Digite sua senha"
                />
                {/* Checklist de requisitos sempre visível */}
                <div className="mt-2">
                  <p className="text-sm text-gray-700 mb-1">A senha deve:</p>
                  <ul className="text-xs space-y-1">
                    <li
                      className={`flex items-center ${
                        passwordRequirements.minLength
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      <CheckIcon
                        className={`w-3 h-3 mr-2 ${
                          passwordRequirements.minLength
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      />
                      Ter pelo menos 8 caracteres
                    </li>
                    <li
                      className={`flex items-center ${
                        passwordRequirements.hasLetter
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      <CheckIcon
                        className={`w-3 h-3 mr-2 ${
                          passwordRequirements.hasLetter
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      />
                      Conter pelo menos uma letra
                    </li>
                    <li
                      className={`flex items-center ${
                        passwordRequirements.hasNumber
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      <CheckIcon
                        className={`w-3 h-3 mr-2 ${
                          passwordRequirements.hasNumber
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      />
                      Conter pelo menos um número
                    </li>
                    <li
                      className={`flex items-center ${
                        passwordRequirements.hasSpecial
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      <CheckIcon
                        className={`w-3 h-3 mr-2 ${
                          passwordRequirements.hasSpecial
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      />
                      Conter pelo menos um caractere especial
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Campo Confirmar Senha */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar senha
              </label>
              <div className="mt-1">
                <input
                  {...register("confirmPassword")}
                  type="password"
                  id="confirmPassword"
                  autoComplete="new-password"
                  className={`appearance-none relative block w-full px-3 py-2 border bg-white ${
                    errors.confirmPassword
                      ? "border-red-300"
                      : "border-gray-300"
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm`}
                  placeholder="Confirme sua senha"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Termos e Condições */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              Eu aceito os{" "}
              <Link to="/terms" className="text-primary hover:text-primary/80">
                termos de uso
              </Link>{" "}
              e{" "}
              <Link
                to="/privacy"
                className="text-primary hover:text-primary/80"
              >
                política de privacidade
              </Link>
            </label>
          </div>

          {/* Botão de Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white cursor-pointer ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              } transition-colors duration-200`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <CircleIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Criando conta...
                </div>
              ) : (
                "Criar conta"
              )}
            </button>
          </div>

          {/* Link para login */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary/80"
              >
                Faça login aqui
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
