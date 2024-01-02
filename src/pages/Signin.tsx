"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { publicApi } from "@/api";

import useAuth from "@/context/useAuth";
import { useToast } from "../components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email({
    message: "Must be valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be 6 characters long.",
  }),
});

const Signin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setAuthData } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data) => publicApi.post("/users/login", data),
    onSuccess: (res) => {
      toast({ description: res?.data?.message });
      setAuthData(res.data.accessToken, res.data.user);
      navigate("/");
    },
    onError: (err: any) => {
      toast({
        description: err?.response?.data?.error,
        variant: "error",
      });
    },
  });

  function onSubmit(values: any) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </Form>
  );
};
export default Signin;
