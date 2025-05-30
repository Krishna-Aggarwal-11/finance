import { InferRequestType , InferResponseType } from "hono";
import { useMutation , useQueryClient } from "react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.categories.$post>["json"];
type ResponseType = InferResponseType<typeof client.api.categories.$post>;

export const useCreateCategory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.categories.$post({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Category created successfully");
            queryClient.invalidateQueries({ queryKey : ["categories"]});
        },
        onError : () => {
            toast.error("Failed to create category");
        }
    });

    return mutation;
}