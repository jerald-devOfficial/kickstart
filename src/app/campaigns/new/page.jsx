"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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

const formSchema = z.object({
  contribution: z.number().min(100),
});

const CreateNewCampaign = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contribution: 100,
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <main className="flex flex-col gap-y-4">
      <h1 className="text-2xl font-bold">Create a Campaign</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="contribution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contribution</FormLabel>
                <FormControl>
                  <Input placeholder="100" {...field} />
                </FormControl>
                <FormDescription>This is your contribution.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create!</Button>
        </form>
      </Form>
    </main>
  );
};

export default CreateNewCampaign;
