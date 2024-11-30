import { InferRequestType , InferResponseType } from "hono";
import { useMutation , useQueryClient } from "react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"];
type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>;

export const useBulkDeleteCategory = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.categories["bulk-delete"]["$post"]({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("categories deleted successfully");
            queryClient.invalidateQueries({ queryKey : ["categories"]});
            queryClient.invalidateQueries({ queryKey : ["summary"]});
        },
        onError : () => {
            toast.error("Failed to delete categories");
        }
    });

    return mutation;
}