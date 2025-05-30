import { InferRequestType , InferResponseType } from "hono";
import { useMutation , useQueryClient } from "react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"];
type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>;

export const useEditAccount = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.accounts[":id"]["$patch"]({ json , param : {id} });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account updated successfully");
            queryClient.invalidateQueries({ queryKey : ["account" , {id}]});
            queryClient.invalidateQueries({ queryKey : ["accounts"]});
            queryClient.invalidateQueries({ queryKey : ["transactions"]});
            queryClient.invalidateQueries({ queryKey : ["summary"]});
            

        },
        onError : () => {
            toast.error("Failed to edit account");
        }
    });

    return mutation;
}