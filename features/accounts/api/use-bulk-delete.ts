import { InferRequestType , InferResponseType } from "hono";
import { useMutation , useQueryClient } from "react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type RequestType = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"];
type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>;

export const useBulkDeleteAccount = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.accounts["bulk-delete"]["$post"]({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Accounts deleted successfully");
            queryClient.invalidateQueries({ queryKey : ["accounts"]});
        },
        onError : () => {
            toast.error("Failed to delete accounts");
        }
    });

    return mutation;
}