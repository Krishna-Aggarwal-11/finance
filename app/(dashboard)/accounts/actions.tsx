"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";

import { useOpenAccount } from "@/features/accounts/hooks/use-open-account";

import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";


type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
    const deleteMutation = useDeleteAccount(id);
    const {onOpen} = useOpenAccount()

    const [ConfirmDialog , confirm] = useConfirm(
      "Are you sure ?" ,
      "You are about to delete this account."
    )

    const handleDelete = async() => {
      const ok = await confirm();

      if (ok) {
        deleteMutation.mutate();
      }
    }
  return (
    <>
      <ConfirmDialog/>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="size-8 p-0">
            <MoreHorizontal className="size-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled={deleteMutation.isLoading} onClick={() => {onOpen(id)}}>
            <Edit className=" size-4 mr-2"/>
            Edit 
          </DropdownMenuItem>
          <DropdownMenuItem disabled={deleteMutation.isLoading} onClick={handleDelete}>
            <Trash className=" size-4 mr-2"/>
            Delete 
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
