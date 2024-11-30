"use client"

import { QueryClient, QueryClientProvider } from "react-query"


function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime : 1000 * 60
            },
        },
    })
};

let browserQueryClient : QueryClient | undefined = undefined;

function getQueryClient() {
    if (!browserQueryClient) {
        browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
}

type Props = {
    children: React.ReactNode
};

export function QueryProvider({ children }: Props) {
    const queryClient = getQueryClient();
    return (    
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};