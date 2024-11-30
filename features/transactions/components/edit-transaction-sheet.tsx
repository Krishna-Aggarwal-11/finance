import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { TransactionForm } from "./transaction-form";
import { useEditTransaction } from "../api/use-edit-transaction";
import { useDeleteTransaction } from "../api/use-delete-transaction";
import { useConfirm } from "@/hooks/use-confirm";

import { insertTransactionSchema } from "@/db/schema";
import { z } from "zod";

import { useOpenTransaction } from "../hooks/use-open-transaction";
import { useGetTransaction } from "./../api/use-get-transaction";

import { Loader2 } from "lucide-react";

import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

const formSchema = insertTransactionSchema.omit({
  id: true,
});

type FormValues = z.infer<typeof formSchema>;

export const EditTransactionSheet = () => {
  const { isOpen, onClose, id } = useOpenTransaction();

  const transactionsQuery = useGetTransaction(id);

  const editMutation = useEditTransaction(id);
  const deleteMutation = useDeleteTransaction(id);

  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = (name: string) => {
    categoryMutation.mutate({ name });
  };

  const categoryOptions = (categoryQuery.data || []).map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => {
    accountMutation.mutate({ name });
  };
  const accountOptions = (accountQuery.data || []).map((account) => ({
    value: account.id,
    label: account.name,
  }));

  const isPending =
    editMutation.isLoading ||
    deleteMutation.isLoading ||
    categoryMutation.isLoading ||
    transactionsQuery.isLoading ||
    accountMutation.isLoading;

  const isLoading =
    categoryQuery.isLoading ||
    accountQuery.isLoading ||
    transactionsQuery.isLoading;

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure ?",
    "You are about to delete this transaction."
  );

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => onClose(),
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => onClose(),
      });
    }
  };

  const defaultValues = transactionsQuery.data
    ? {
        accountId: transactionsQuery.data.accountId,
        categoryId: transactionsQuery.data.categoryId,
        amount: transactionsQuery.data.amount.toString(),
        date: transactionsQuery.data.date
          ? new Date(transactionsQuery.data.date)
          : new Date(),
        payee: transactionsQuery.data.payee,
        notes: transactionsQuery.data.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="animate-spin text-muted-foreground size-4" />
            </div>
          ) : (
            <TransactionForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              disabled={isPending}
              onCreateAccount={onCreateAccount}
              onCreateCategory={onCreateCategory}
              accountOptions={accountOptions}
              categoryOptions={categoryOptions}
              onDelete ={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
