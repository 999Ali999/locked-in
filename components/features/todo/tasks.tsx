"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EllipsisVertical } from "lucide-react";

const Tasks = () => {
  return (
    <div className="mt-5 flex flex-col gap-y-3.5">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-lg">Tasks</h1>
        <Button variant="outline" size="sm">
          <EllipsisVertical />
        </Button>
      </div>

      <Separator />

      <div className="flex cursor-pointer font-bold gap-x-2 h-[60px] w-full items-center justify-center rounded-md border border-dashed text-sm">
        <Button
          onClick={() => console.log("first")}
          className="w-full h-full"
          variant="none"
        >
          Add Task
        </Button>
      </div>
    </div>
  );
};

export { Tasks };
