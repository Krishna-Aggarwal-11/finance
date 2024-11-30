import { Sheet, SheetContent , SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

import { CategoryForm } from "./category-form";
import { useEditCategory } from "../api/use-edit-category";
import { useOpenCategory } from "../hooks/use-open-category";
import { useDeleteCategory } from "../api/use-delete-category";
import { useGetCategory } from "../api/use-get-category";

import { useConfirm } from "@/hooks/use-confirm";

import { insertCategorySchema } from "@/db/schema";

import { z } from "zod";

import { Loader2 } from "lucide-react";



const formSchema = insertCategorySchema.pick({
  name: true,
});

type FormValues = z.infer<typeof formSchema>;

export const EditCategorySheet = () => {
    const {isOpen  , onClose , id } = useOpenCategory();

    const categoryQuery = useGetCategory(id) ;

    const editMutation = useEditCategory(id);
    const deleteMutation = useDeleteCategory(id);

    const isPending = editMutation.isLoading || deleteMutation.isLoading;

    const isLoading =   categoryQuery.isLoading;

    const [ConfirmDialog , confirm] = useConfirm(
      "Are you sure ?" ,
      "You are about to delete this category."
    )

    const onSubmit = (values: FormValues) => {
      editMutation.mutate(values , {
        onSuccess : () => onClose(),
      });
    }

    const onDelete = async() => {
      const ok = await confirm();

      if (ok) { 
        deleteMutation.mutate(
          undefined , {
            onSuccess : () => onClose()
          }
        );
      }

    }

    const defaultValues = categoryQuery.data ? {
        name : categoryQuery.data.name } : {
            name : ""}
    


  return (
    
    <>
      <ConfirmDialog />
      <Sheet open= {isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Edit Category</SheetTitle>
          <SheetDescription>Edit an existing category</SheetDescription>
        </SheetHeader>
        {isLoading ? <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="animate-spin text-muted-foreground size-4" />

        </div> : 
        <CategoryForm id={id} onSubmit={onSubmit} defaultValues={defaultValues} disabled={isPending}
        onDelete={onDelete} />
      }
      </SheetContent>
    </Sheet>
    </>
  );
};
