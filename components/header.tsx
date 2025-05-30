import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

import { HeaderLogo } from "./headerLogo";
import { Navigation } from "./header-navigation";
import { WelcomeMsg } from "./welcome-msg";
import { Filters } from "./filters";
import { Suspense } from "react";

export const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 lg:px-14 py-8 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14  ">
          <div className="flex items-center lg:gap-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin size-8 text-slate-400" />
          </ClerkLoading>
        </div>
        <WelcomeMsg />
        <Suspense>
          <Filters />
        </Suspense>
      </div>
    </header>
  );
};
