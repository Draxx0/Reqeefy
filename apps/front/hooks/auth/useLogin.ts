import { loginSchema } from "@/schemas";
import { authService } from "@/services";
import { useAuthStore } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const useLogin = () => {
  const router = useRouter();
  const { setUser, setAccessToken } = useAuthStore();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      return await authService.login(data, "");
    },
    onError: (error) => {
      console.error("ERROR", error);

      toast.error("Une erreur est survenue", {
        duration: 10000,
        description: error.message,
        classNames: {
          error: "bg-red-500",
        },
      });
    },
    onSuccess(data, variables, context) {
      const { user, access_token } = data;
      setUser(user);
      setAccessToken(access_token);
      router.push("/");
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    mutate(data);
  });

  return {
    form,
    onSubmit,
    isPending,
  };
};