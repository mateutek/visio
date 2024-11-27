// composables/useUserBalance.ts
import { useDocument } from "vuefire";
import { doc, DocumentData } from "firebase/firestore";
import { useFirestore } from "vuefire";
import { computed } from "vue";
import { TransitionPresets, useTransition } from "@vueuse/core";

interface BalanceData {
  value: number;
  pending: number;
}

export default function useUserBalance() {
  const db = useFirestore();
  const user = useCurrentUser();
  const currentBalance = ref(0);

  const userBalanceDoc = computed(() =>
    user.value
      ? doc(db, "balance", user.value.uid).withConverter<
          BalanceData,
          DocumentData
        >({
          fromFirestore: (snapshot) => {
            return snapshot.data({ serverTimestamps: "estimate" }) as any;
          },
          toFirestore: (data) => data,
        })
      : null,
  );

  const { data: balanceData, pending } = useDocument(userBalanceDoc);

  watch(
    balanceData,
    (newData) => {
      currentBalance.value = newData?.value || 0;
    },
    { immediate: true },
  );

  // Directly return the refs from useDocument
  return {
    balance: useTransition(currentBalance, {
      duration: 1500,
      transition: TransitionPresets.easeInOutQuint,
    }),
    pending,
  };
}
