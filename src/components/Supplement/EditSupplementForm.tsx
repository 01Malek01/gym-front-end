import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import useEditSupplement from "../../hooks/api/Admin/supplements/useEditSupplement";
import { Form, FormField, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useToast } from "../../hooks/use-toast";
import { useEffect } from "react";
import { Supplement } from "../../types";
import { cn } from "../../lib/utils";

function EditSupplementForm({
  supplement,
  isEditMode,
  setIsEditMode,
  refetch,
}: {
  supplement: Supplement | null;
  isEditMode: boolean;
  setIsEditMode: (isEditMode: boolean) => void;
  refetch: () => void;
}) {
  const {
    editSupplement,
    isError: isEditError,
    isPending: isEditPending,
    isSuccess: isEditSuccess,
  } = useEditSupplement();
  const formSchema = z.object({
    stock: z.coerce
      .number()
      .min(0, "Stock must be a positive number")
      .optional(),
    price: z.coerce
      .number()
      .min(0, "Price must be a positive number")
      .optional(),
  });
  const form = useForm({
    defaultValues: {
      price: supplement?.price || 0,
      stock: supplement?.stock || 0,
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(formSchema),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;
  const { toast } = useToast();

  useEffect(() => {
    if (isEditError) {
      toast({
        title: "Error",
        description: "Failed to edit supplement",
        variant: "destructive",
      });
    }
    if (isEditSuccess) {
      toast({
        title: "Success",
        description: "Supplement edited successfully",
        variant: "default",
      });
    }
  }, [isEditError, isEditSuccess, toast]);
  const onSubmit = async (data: { price: number; stock: number }) => {
    try {
      setIsEditMode(false);
      await editSupplement({ id: supplement?._id ?? "", newData: data });
      await refetch();
    } catch (error) {
      console.error("Error editing supplement:", error);
    }
  };
  return (
    <div
      className={cn(
        `editFormOverlay fixed left-0 top-0 h-[50%] w-full bg-gray-900/70  z-10 flex items-center justify-center `,
        isEditMode ? "visible" : "hidden"
      )}
    >
      <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md w-96">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              render={({ field }) => (
                <>
                  <FormLabel htmlFor="stock">New Stock:</FormLabel>
                  <Input {...field} type="number" />
                  {errors.stock && (
                    <span className="text-red-500 text-sm">
                      {errors.stock.message}
                    </span>
                  )}
                </>
              )}
              name="stock"
              control={control}
            />
            <FormField
              control={control}
              render={({ field }) => (
                <>
                  <FormLabel htmlFor="price"> New Price:</FormLabel>
                  <Input {...field} type="number" />
                  {errors.price && (
                    <span className="text-red-500 text-sm">
                      {errors.price.message}
                    </span>
                  )}
                </>
              )}
              name="price"
            />
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py px-4 rounded"
            >
              {isEditPending ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default EditSupplementForm;
