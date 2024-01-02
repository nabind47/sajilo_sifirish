import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import * as z from "zod";

import { publicApi } from "@/api";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  otp: z.string().min(6, {
    message: "Otp must be 6 characters long",
  }),
});

const VerifyOtp = () => {
  const { toast } = useToast();
  const { userId } = useParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data) => publicApi.post(`/users/${userId}/verify`, data),
    onSuccess: (res) => {
      toast({ description: res?.data?.message });
      navigate(`/signin`);
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
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Otp</FormLabel>
              <FormControl>
                <Input placeholder="******" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
};

export default VerifyOtp;
