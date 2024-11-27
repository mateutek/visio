import { useFirestore, useDocument } from "vuefire";
import { doc } from "firebase/firestore";

export const useRole = () => {
  const currentUser = useCurrentUser();
  if (!currentUser.value) return { role: null };
  const firestore = useFirestore();

  // Fetch the user document from Firestore based on the current user's UID
  const userDocRef = computed(() => {
    return currentUser.value ? doc(firestore, "users", currentUser.value.uid) : null;
  });

  // Use vuefire's useDocument composable to reactively fetch the document
  const userDoc = useDocument(userDocRef);

  // Extract the role from the document (assuming your document has a 'role' field)
  const role = computed(() => userDoc.data.value?.role);

  return { role };
};
