"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useReducer } from "react";
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
import web3 from "@/web3";
import { useMutation } from "@tanstack/react-query";
import Message from "./Message";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  value: z.string().min(1),
});

const ContributeForm = () => {
  const { push } = useRouter();
  const reducer = (state, action) => ({ ...state, ...action });
  const initialState = {
    buttonText: "Contribute!",
    success: null,
    error: null,
  };

  const [{ buttonText, error, success }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: "100",
    },
  });

  // Define the mutation
  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      dispatch({ buttonText: "Sending...", error: null, success: null });
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(data.value, "ether"),
      });
    },
    onSuccess: ({ message }) => {
      dispatch({ buttonText: "Sent!", success: message });
      push("/");
    },
    onError: ({ message }) => {
      dispatch({ error: message, buttonText: "Try again!" });
    },
  });

  const onSubmit = (values) => {
    mutate(values);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Amount to Contribute</FormLabel>
              <div className="flex items-center w-full">
                <FormControl>
                  <Input
                    placeholder="100"
                    {...field}
                    className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200"
                  />
                </FormControl>
                <span className="h-10 flex items-center bg-gray-200 px-2 rounded-l-none border-y border-r rounded-r-md">
                  ether
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-blue-600 text-white font-medium">
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {buttonText}
        </Button>
        {success && <Message message={success} type="success" />}
        {error && <Message message={error} type="error" />}
      </form>
    </Form>
  );
};

export default ContributeForm;
