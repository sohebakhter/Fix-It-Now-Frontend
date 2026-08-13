import React, { Suspense } from "react";
import { getAllCategoriesAction } from "@/app/(dashboardGroup)/_actions/categoryActions";
import CategoryList from "./_components/CategoryList";
import CategorySkeleton from "./_components/CategorySkeleton";
import CreateCategoryButton from "./_components/CreateCategoryButton";

async function CategoryListWrapper() {
  const response = await getAllCategoriesAction();
  const categories = response?.data || [];

  return <CategoryList initialCategories={categories} />;
}

const CategoriesPage = () => {
  return (
    <div className="w-full min-h-full space-y-6 p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/40 pb-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Category Management
          </h1>
          <p className="text-muted-foreground text-sm">
            Add new categories, edit names, or delete existing categories.
          </p>
        </div>
        <div className="flex items-center shrink-0">
          <CreateCategoryButton />
        </div>
      </div>

      {/* Suspense boundary for skeleton loader */}
      <Suspense fallback={<CategorySkeleton />}>
        <CategoryListWrapper />
      </Suspense>
    </div>
  );
};

export default CategoriesPage;
