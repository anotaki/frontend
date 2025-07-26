import { MakeLogin, RefreshToken } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  return useMutation({
    mutationFn: MakeLogin,
  });
}

export function useRefresh() {
  const refreshMutation = useMutation({
    mutationFn: RefreshToken,
  });

  return { refreshMutation };
}
