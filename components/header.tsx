import { BicepsFlexed } from "lucide-react";
import Link from "next/link";

import { ModeToggle } from "./theme/mode-toggle";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center py-3.5 px-4">
        <div>
          <h1 className="flex align-items gap-2 text-2xl font-bold">
            <Button asChild variant="ghost">
              <Link href="/">
                <BicepsFlexed size={32} />
                <h1 className="pl-0.5 text-lg font-semibold">Locked In</h1>
              </Link>
            </Button>
          </h1>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Report</Button>
          <Button variant="outline">Setting</Button>
          <ModeToggle />
        </div>
      </header>

      <Separator />
    </>
  );
};

export { Header };
