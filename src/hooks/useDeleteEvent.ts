// import axios from 'axios';
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export const useDeleteEvent = () => {
//   const queryClient = useQueryClient();

//   const deleteEventMutation = useMutation({
//     mutationFn: async (eventId: number) => {
//       const { data } = await axios.delete(
//         `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/delete`,
//         { id: eventId },
//         {
//           headers: {
//             Authorization: `Bearer ${session?.accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["eventsListOrg"] });
//     },
//     onError: (error) => {
//       console.error("Error deleting event:", error);
//     },
//   });
  

//   return deleteEventMutation;
// };