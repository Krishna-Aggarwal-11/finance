import { InferRequestType , InferResponseType } from "hono";
import { useMutation , useQueryClient } from "react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"];
type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>;

export const useEditCategory = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.categories[":id"]["$patch"]({ json , param : {id} });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Category updated successfully");
            queryClient.invalidateQueries({ queryKey : ["category" , {id}]});
            queryClient.invalidateQueries({ queryKey : ["categories"]});
            queryClient.invalidateQueries({ queryKey : ["transactions"]});
            queryClient.invalidateQueries({ queryKey : ["summary"]});

        },
        onError : () => {
            toast.error("Failed to edit category");
        }
    });

    return mutation;
}