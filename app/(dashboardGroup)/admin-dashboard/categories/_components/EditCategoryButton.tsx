"use client";

import React, { useState, useTransition } from "react";
import { Edit } from "lucide-react";
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
import { updateCategoryAction } from "@/app/(dashboardGroup)/_actions/categoryActions";

interface EditCategoryButtonProps {
  categoryId: string;
  currentName: string;
}

export function EditCategoryButton({ categoryId, currentName }: EditCategoryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(currentName);
  const [isPending, startTransition] = useTransition();

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    startTransition(async () => {
      try {
        const response = await updateCategoryAction(categoryId, { name: name.trim() });
        if (response.success) {
          toast.success(response.message || "Category updated successfully.");
          setIsOpen(false);
        } else {
          toast.error(response.message || "Failed to update category.");
        }
      } catch (error: unknown) {
        toast.error((error as Error).message || "An unexpected error occurred.");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl flex items-center gap-1.5 cursor-pointer border-border/80 hover:bg-muted"
        >
          <Edit className="size-3.5" />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-2xl">
        <form onSubmit={handleUpdate}>
          <DialogHeader className="space-y-3">
            <DialogTitle className="text-xl font-bold text-foreground">
              Edit Category
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
              Update the name of the service category.
            </DialogDescription>
          </DialogHeader>

          <div className="my-6 space-y-2">
            <Label htmlFor="edit-category-name" className="text-sm font-semibold text-foreground">
              Category Name
            </Label>
            <Input
              id="edit-category-name"
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
                  <Edit className="size-3.5" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCategoryButton;
