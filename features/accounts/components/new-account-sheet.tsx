import { Sheet, SheetContent , SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

import { useNewAccount } from "../hooks/use-new-accounts";
import { AccountForm } from "./account-form";
import { useCreateAccount } from "../api/use-create-account";

import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";


const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const NewAccountSheet = () => {
    const {isOpen  , onClose} = useNewAccount();

    const mutation = useCreateAccount();

    const onSubmit = (values: FormValues) => {
      mutation.mutate(values , {
        onSuccess : () => onClose(),
      });
    }
  return (
    <Sheet open= {isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>Create a new account to track your transactions</SheetDescription>
        </SheetHeader>
        <AccountForm onSubmit={onSubmit} defaultValues={{name: ""}} disabled={mutation.isLoading} />
      </SheetContent>
    </Sheet>
  );
};
