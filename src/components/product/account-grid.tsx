import type { Account } from "@/types";
import { AccountCard } from "./account-card";
import { cn } from "@/lib/utils";

/** Responsive grid of account cards. */
export function AccountGrid({
  accounts,
  className,
}: {
  accounts: Account[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
}
