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
import factory from "@/factory";
import web3 from "@/web3";

const formSchema = z.object({
  minimumContribution: z.string().min(1),
});

const CreateNewCampaign = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minimumContribution: "100",
    },
  });

  const onSubmit = async (values) => {
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(values.minimumContribution).send({
        from: accounts[0],
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="flex flex-col gap-y-4">
      <h1 className="text-2xl font-bold">Create a Campaign</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="minimumContribution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Contribution</FormLabel>
                <div className="flex items-center w-1/2">
                  <FormControl>
                    <Input
                      placeholder="100"
                      {...field}
                      className="rounded-r-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-blue-200 w-1/2"
                    />
                  </FormControl>
                  <span className="h-10 flex items-center bg-gray-200 px-2 rounded-l-none border-y border-r rounded-r-md">
                    wei
                  </span>
                </div>
                <FormDescription>This is your contribution.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="bg-blue-600 text-white font-medium">
            Create!
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default CreateNewCampaign;
