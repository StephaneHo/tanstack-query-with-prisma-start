export async function fetchEvents(){

}

useQuery({
queryKey: ["events"],
queryFn: fecthEvents
})

const queryClient = new QueryClient();

function App(){
return (<QueryClientProvider client={queryClient}>
<RouterProvider router={router} />
</QueryClientProvider>
);
}
