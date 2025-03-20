import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loader from "../../components/custom-ui/Loader";
import useGetSupplements from "../../hooks/api/Admin/supplements/useGetSupplements";
import useCreateSupplement from "../../hooks/api/Admin/supplements/useCreateSupplement";
import useDeleteSupplement from "../../hooks/api/Admin/supplements/useDeleteSupplement";
import { Supplement } from "../../types";

// Zod schema for form validation
const supplementSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z
    .number()
    .min(1, "Price must be at least 1")
    .max(1000, "Price cannot exceed 1000"),
  stock: z.number().min(1, "Stock must be at least 1"),
});

export default function ManageSupplementsPage() {
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const { data, isLoading } = useGetSupplements();
  const { createSupplement, isPending: isCreatePending } =
    useCreateSupplement();
  const { deleteSupplement, isPending: isDeletePending } =
    useDeleteSupplement();

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(supplementSchema),
  });

  useEffect(() => {
    if (data) {
      setSupplements(data);
    }
  }, [data]);

  // Submit function for adding supplements
  const onSubmit = async (formData: Supplement) => {
    await createSupplement(formData);
    setSupplements((prev) => [...prev, formData]);
    reset(); // Clear form after submission
  };
  const onDelete = async (id: string) => {
    await deleteSupplement(id);
    setSupplements((prev) =>
      prev.filter((supplement) => supplement._id !== id)
    );
  };
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-app_secondary-orange mb-6">
            Manage Supplements
          </h1>

          {/* Form for adding supplements */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Add New Supplement</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  {...register("name")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    {...register("stock", { valueAsNumber: true })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  {errors.stock && (
                    <p className="text-red-500 text-sm">
                      {errors.stock.message}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                disabled={isCreatePending}
                onClick={handleSubmit(onSubmit)}
              >
                {isCreatePending ? "Adding..." : "Add Supplement"}
              </button>
            </form>
          </div>

          {/* Supplement List */}
          {isLoading ? (
            <Loader dimensions="w-16 h-16" />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {supplements.map((supplement) => (
                    <tr key={supplement._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {supplement.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {supplement.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${supplement.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {supplement.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => onDelete(supplement._id)}
                          disabled={isDeletePending}
                        >
                          {isDeletePending ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
