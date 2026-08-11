"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Plus, DollarSign, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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

import { createServiceAction } from "@/app/(dashboardGroup)/_actions/serviceActions";
import { ServiceCard } from "./ServiceCard";
import { EditServiceDialog } from "./EditServiceDialog";
import type { IService } from "@/lib/types";

type Category = {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};

interface ServicesListProps {
  initialServices: IService[];
  categories: Category[];
}

export function ServicesList({ initialServices, categories }: ServicesListProps) {
  const router = useRouter();
  const [services, setServices] = useState<IService[]>(initialServices);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Form State for Add
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");

  // Form State for Edit
  const [editOpen, setEditOpen] = useState(false);
  const [editingService, setEditingService] = useState<IService | null>(null);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset form on close
      setTitle("");
      setDescription("");
      setLocation("");
      setPrice("");
      if (categories.length > 0) {
        setCategoryId(categories[0].id);
      }
    }
  };

  const startEditing = (service: IService) => {
    setEditingService(service);
    setEditOpen(true);
  };

  const handleEditSuccess = (updatedService: IService) => {
    setServices((prev) =>
      prev.map((s) => (s.id === updatedService.id ? updatedService : s))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryId) {
      toast.error("Please select a category");
      return;
    }
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!location.trim()) {
      toast.error("Please enter a location");
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
          location: location.trim(),
          price: parsedPrice,
        };

        const response = await createServiceAction(payload);

        if (response.success) {
          toast.success("Service created successfully!");
          
          // Append new service to the local state list immediately
          if (response.data) {
            setServices((prev) => [response.data, ...prev]);
          }

          // Trigger page refresh to update cache
          router.refresh();
          handleOpenChange(false);
        } else {
          toast.error(response.message || "Failed to create service");
        }
      } catch (error: unknown) {
        toast.error((error as Error).message || "An unexpected error occurred");
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header section with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            My Services
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage your service offerings, update location availability, and pricing details.
          </p>
        </div>

        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button size="lg" className="rounded-2xl gap-2 shadow-sm font-semibold">
              <Plus className="size-4" />
              Add New
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md p-6">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Add New Service</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Create a new service offering. All fields are required except description.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
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
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
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
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="e.g. Professional kitchen pipe leakage repair service."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isPending}
                  className="rounded-xl min-h-22.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="e.g. Dhaka"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    disabled={isPending}
                    required
                    className="rounded-xl h-10"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="price">Price (BDT)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="price"
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
                  onClick={() => handleOpenChange(false)}
                  disabled={isPending}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending} className="rounded-xl min-w-25 gap-2">
                  {isPending ? (
                    <>
                      <Spinner className="size-4" />
                      Creating...
                    </>
                  ) : (
                    "Create Service"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Services Grid or Empty State */}
      {services.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-muted-foreground/20 rounded-3xl bg-muted/5">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground mb-4">
            <Wrench className="size-7" />
          </div>
          <CardTitle className="text-lg font-bold text-foreground">
            No Services Created Yet
          </CardTitle>
          <CardContent className="text-xs text-muted-foreground max-w-sm mt-2 p-0">
            Showcase your skills and expertise by adding services. Clients will be able to view and book them.
          </CardContent>
          <Button
            onClick={() => handleOpenChange(true)}
            variant="outline"
            className="mt-6 rounded-xl font-medium"
          >
            Create Your First Service
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onEdit={startEditing} />
          ))}
        </div>
      )}

      {/* Edit Service Dialog */}
      <EditServiceDialog
        key={editingService?.id || "empty"}
        isOpen={editOpen}
        onOpenChange={setEditOpen}
        service={editingService}
        categories={categories}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
}



