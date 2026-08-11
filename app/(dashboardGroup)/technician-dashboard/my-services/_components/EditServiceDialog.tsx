"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DollarSign } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { updateServiceAction } from "@/app/(dashboardGroup)/_actions/serviceActions";
import type { IService } from "@/lib/types";

type Category = {
  id: string;
  name: string;
};

interface EditServiceDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  service: IService | null;
  categories: Category[];
  onSuccess: (updatedService: IService) => void;
}

export function EditServiceDialog({
  isOpen,
  onOpenChange,
  service,
  categories,
  onSuccess,
}: EditServiceDialogProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Form State
  const [categoryId, setCategoryId] = useState(service?.categoryId || "");
  const [title, setTitle] = useState(service?.title || "");
  const [description, setDescription] = useState(service?.description || "");
  const [price, setPrice] = useState(service?.price?.toString() || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!service) return;

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      toast.error("Please enter a valid price");
      return;
    }

    startTransition(async () => {
      try {
        const payload = {
          categoryId,
          title: title.trim(),
          description: description.trim(),
          price: parsedPrice,
        };

        const response = await updateServiceAction(service.id, payload);

        if (response.success) {
          toast.success("Service updated successfully!");

          // Update local state list immediately
          const updatedData = response.data || {
            ...service,
            categoryId,
            title: title.trim(),
            description: description.trim(),
            price: parsedPrice,
            category: categories.find((c) => c.id === categoryId) || service.category,
          };

          onSuccess(updatedData);
          router.refresh();
          onOpenChange(false);
        } else {
          toast.error(response.message || "Failed to update service");
        }
      } catch (error: unknown) {
        toast.error((error as Error).message || "An unexpected error occurred");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Service</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Update your service details. Note that location changes are not editable.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-1.5">
            <Label htmlFor="edit-category">Category</Label>
            <select
              id="edit-category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              disabled={isPending}
              className="h-10 w-full rounded-xl border border-input bg-input/30 px-3 py-1 text-base transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm dark:aria-invalid:border-destructive/50"
              required
            >
              <option value="" disabled className="text-muted-foreground">
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id} className="bg-background text-foreground">
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-title">Title</Label>
            <Input
              id="edit-title"
              type="text"
              placeholder="e.g. Kitchen Pipe Repair 5"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isPending}
              required
              className="rounded-xl h-10"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              placeholder="e.g. Professional kitchen pipe leakage repair service."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              className="rounded-xl min-h-22.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                type="text"
                value={service?.location || ""}
                disabled={true}
                className="rounded-xl h-10 opacity-70 cursor-not-allowed bg-muted"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="edit-price">Price (BDT)</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  id="edit-price"
                  type="number"
                  min="0"
                  step="any"
                  placeholder="500"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  disabled={isPending}
                  required
                  className="pl-8 rounded-xl h-10"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="pt-4 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="rounded-xl min-w-25 gap-2">
              {isPending ? (
                <>
                  <Spinner className="size-4" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
