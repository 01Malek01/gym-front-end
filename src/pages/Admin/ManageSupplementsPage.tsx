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
        variant: "default",
      });
    }
    if (isError) {
      toast({
        title: "Error creating supplement",
        variant: "destructive",
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
    try {
      const formDataWithImage = new FormData();
      formDataWithImage.append("name", formData.name);
      formDataWithImage.append("description", formData.description);
      formDataWithImage.append("price", formData.price.toString());
      formDataWithImage.append("stock", formData.stock.toString());
      
      if (formData.image && formData.image.length > 0) {
        formDataWithImage.append("image", formData.image[0]);
      }

      const response = await createSupplement(formDataWithImage);
      
      if (response) {
        setSupplements((prev) => [
          ...prev,
          {
            ...formData,
            _id: response._id,
            image: formData.image && formData.image[0] ? URL.createObjectURL(formData.image[0]) : undefined,
          },
        ]);
        reset(); // Clear form after successful submission
        
        toast({
          title: "Success",
          description: "Supplement added successfully",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error creating supplement:", error);
      toast({
        title: "Error",
        description: "Failed to add supplement. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Function to delete a supplement
  const onDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this supplement?")) {
      return;
    }
    
    try {
      await deleteSupplement(id);
      setSupplements((prev) =>
        prev.filter((supplement) => supplement._id !== id)
      );
      
      toast({
        title: "Success",
        description: "Supplement deleted successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error deleting supplement:", error);
      toast({
        title: "Error",
        description: "Failed to delete supplement. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Manage Supplements</h2>
                <p className="mt-1 text-sm text-gray-500">Add and manage your supplement inventory</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSelectedSupplement(null);
                  setIsEditMode(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Supplement
              </button>
            </div>
          </div>

          {/* Edit Form Modal */}
          <EditSupplementForm
            setIsEditMode={setIsEditMode}
            isEditMode={isEditMode}
            supplement={selectedSupplement}
            refetch={refetch}
          />

          {/* Add New Supplement Form */}
          <div className="px-6 py-6 bg-gray-50 border-b border-gray-200">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
                <svg className="h-5 w-5 text-blue-500 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add New Supplement
              </h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      id="name"
                      {...register("name")}
                      type="text"
                      className={`block w-full rounded-md ${errors.name ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
                      placeholder="e.g., Whey Protein"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register("price", { valueAsNumber: true })}
                        className={`pl-7 block w-full rounded-md ${errors.price ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
                        placeholder="0.00"
                      />
                    </div>
                    {errors.price && (
                      <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                    )}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      {...register("description")}
                      className={`block w-full rounded-md ${errors.description ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
                      placeholder="Enter supplement description..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                      Stock
                    </label>
                    <input
                      id="stock"
                      type="number"
                      {...register("stock", { valueAsNumber: true })}
                      className={`block w-full rounded-md ${errors.stock ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
                      placeholder="0"
                    />
                    {errors.stock && (
                      <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
                    )}
                  </div>

                  {/* Image Upload */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Image
                    </label>
                    <div className="mt-1 flex items-center">
                      <div className="relative w-full">
                        <input
                          id="image"
                          type="file"
                          accept="image/*"
                          {...register("image")}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <label
                          htmlFor="image"
                          className="flex justify-center w-full px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500 hover:bg-blue-50"
                        >
                          <div className="space-y-1 text-center">
                            <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                              <span className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                                Upload a file
                              </span>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">
                              PNG, JPG, GIF up to 10MB
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                    {errors.image && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.image.message as string}
                      </p>
                    )}
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200 sm:col-span-2">
                  <button
                    type="button"
                    onClick={() => reset()}
                    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatePending}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreatePending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </>
                    ) : (
                      'Add Supplement'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Supplements List */}
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">
                Supplement Inventory
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search supplements..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <Loader dimensions="w-12 h-12" />
              </div>
            ) : supplements.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No supplements</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by adding a new supplement.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSupplement(null);
                      setIsEditMode(true);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    New Supplement
                  </button>
                </div>
              </div>
            ) : (
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Details
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {supplements.map((supplement) => (
                        <tr key={supplement._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                {supplement.image ? (
                                  <img className="h-10 w-10 rounded-full object-cover" src={supplement.image} alt={supplement.name} />
                                ) : (
                                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{supplement.name}</div>
                                <div className="text-sm text-gray-500 line-clamp-1">{supplement.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {supplement.description?.substring(0, 50)}{supplement.description && supplement.description.length > 50 ? '...' : ''}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              supplement.stock && supplement.stock > 10 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {supplement.stock} in stock
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${supplement.price?.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-3">
                              <button
                                onClick={() => {
                                  setSelectedSupplement(supplement);
                                  setIsEditMode(true);
                                }}
                                className="text-blue-600 hover:text-blue-900"
                                title="Edit supplement"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span className="sr-only">Edit</span>
                              </button>
                              <button
                                onClick={() => onDelete(supplement._id as string)}
                                disabled={isDeletePending}
                                className="text-red-600 hover:text-red-900 disabled:opacity-50"
                                title="Delete supplement"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span className="sr-only">Delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}