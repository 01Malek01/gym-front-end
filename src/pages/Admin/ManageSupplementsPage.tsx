import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Loader from "../../components/custom-ui/Loader";
import useGetSupplements from "../../hooks/api/Admin/supplements/useGetSupplements";
import useCreateSupplement from "../../hooks/api/Admin/supplements/useCreateSupplement";
import useDeleteSupplement from "../../hooks/api/Admin/supplements/useDeleteSupplement";
import { Supplement } from "../../types";
import { useToast } from "../../hooks/use-toast";
import EditSupplementForm from "../../components/Supplement/EditSupplementForm";
import useEditSupplement from "../../hooks/api/Admin/supplements/useEditSupplement";

// Zod schema for form validation
const supplementSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(1, "Price must be at least 1")
    .max(1000, "Price cannot exceed 1000"),
  stock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .min(1, "Stock must be at least 1"),
  image: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Image is required")
    .refine(
      (files) => files[0]?.size <= 5 * 1024 * 1024,
      "File size must be less than 5MB"
    )
    .optional(), // Accepts a file
});

// Type inference from schema
type SupplementFormData = z.infer<typeof supplementSchema>;

export default function ManageSupplementsPage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedSupplement, setSelectedSupplement] =
    useState<Supplement | null>(null);
  const [supplements, setSupplements] = useState<Supplement[]>([]);
  const { data, isLoading, refetch } = useGetSupplements();

  const {
    createSupplement,
    isPending: isCreatePending,
    isError,
    isSuccess,
  } = useCreateSupplement();
  const { deleteSupplement, isPending: isDeletePending } =
    useDeleteSupplement();
  const { toast } = useToast();

  // Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SupplementFormData>({
    resolver: zodResolver(supplementSchema),
  });

  // Fetch and set supplements
  useEffect(() => {
    if (data) setSupplements(data);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Supplement created successfully",
        status: "success",
      });
    }
    if (isError) {
      toast({
        title: "Error creating supplement",
        status: "error",
      });
    }
  }, [isSuccess, isError, toast]);

  const { isSuccess: isEditSuccess } = useEditSupplement();
  useEffect(() => {
    if (isEditSuccess) {
      setIsEditMode(false);
    }
  }, [isEditSuccess, setIsEditMode]);

  // Submit function for adding a supplement
  const onSubmit = async (formData: SupplementFormData) => {
    const formDataWithImage = new FormData();
    formDataWithImage.append("name", formData.name);
    formDataWithImage.append("description", formData.description);
    formDataWithImage.append("price", formData.price.toString());
    formDataWithImage.append("stock", formData.stock.toString());
    if (formData.image) {
      formDataWithImage.append("image", formData.image[0]);
    }

    const response = await createSupplement(formDataWithImage);
    setSupplements((prev) => [
      ...prev,
      {
        ...formData,
        _id: response._id,
        image: formData.image ? formData.image[0].name : undefined,
      },
    ]);
    reset(); // Clear form after submission
  };

  // Function to delete a supplement
  const onDelete = async (id: string) => {
    await deleteSupplement(id);
    setSupplements((prev) =>
      prev.filter((supplement) => supplement._id !== id)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto relative">
        <EditSupplementForm
          setIsEditMode={setIsEditMode}
          isEditMode={isEditMode}
          supplement={selectedSupplement}
          refetch={refetch}
        />
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-app_secondary-orange mb-6">
            Manage Supplements
          </h1>

          {/* Form to Add New Supplement */}
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

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  {...register("image")}
                  className="w-full p-2 border border-gray-300 rounded"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                disabled={isCreatePending}
              >
                {isCreatePending ? "Adding..." : "Add Supplement"}
              </button>
            </form>
          </div>

          {/* Supplements List */}
          {isLoading ? (
            <Loader dimensions="w-16 h-16" />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
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
                          onClick={() => onDelete(supplement._id as string)}
                          disabled={isDeletePending}
                        >
                          {isDeletePending ? "Deleting..." : "Delete"}
                        </button>
                        <button
                          className="ml-2 text-blue-600 hover:text-blue-900"
                          onClick={() => {
                            setIsEditMode(true);
                            setSelectedSupplement(supplement);
                          }}
                        >
                          Edit{" "}
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
