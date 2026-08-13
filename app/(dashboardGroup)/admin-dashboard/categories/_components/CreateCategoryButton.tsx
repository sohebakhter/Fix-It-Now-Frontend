"use client";

import React, { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { createCategoryAction } from "@/app/(dashboardGroup)/_actions/categoryActions";

export function CreateCategoryButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    startTransition(async () => {
      try {
        const response = await createCategoryAction({ name: name.trim() });
        if (response.success) {
          toast.success(response.message || "Category created successfully.");
          setName("");
          setIsOpen(false);
        } else {
          toast.error(response.message || "Failed to create category.");
        }
      } catch (error: unknown) {
        toast.error((error as Error).message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl flex items-center gap-1.5 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2 shadow-xs transition-all duration-200">
          <Plus className="size-4" />
          <span>Create Category</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl">
        <form onSubmit={handleCreate}>
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-bold text-foreground">
              Create New Category
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              Add a new service category. Make sure the name is unique and clear.
            </DialogDescription>
          </DialogHeader>

          <div className="my-6 space-y-2">
            <Label htmlFor="category-name" className="text-sm font-semibold text-foreground">
              Category Name
            </Label>
            <Input
              id="category-name"
              placeholder="e.g. Plumbing, Cleaning, Electrical"
              className="h-10 rounded-xl bg-card border-border/60 focus-visible:ring-primary/20"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              autoFocus
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl cursor-pointer"
              disabled={isPending}
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-xl flex items-center gap-1.5 cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 py-2 transition-all duration-200"
              disabled={isPending}
            >
              {isPending ? (
                <Spinner className="size-3.5 animate-spin" />
              ) : (
                <>
                  <Plus className="size-3.5" />
                  <span>Create</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategoryButton;
