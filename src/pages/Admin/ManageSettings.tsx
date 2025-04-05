import { useForm } from "react-hook-form";
import Button1 from "../../components/custom-ui/Button-1";
import { useSettings } from "../../context/SettingsContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Settings } from "../../types";
import useSetSettings from "../../hooks/api/Admin/settings/useSetSettings";
import { useEffect } from "react";
import { useToast } from "../../hooks/use-toast";
export default function ManageSettingsPage() {
  const settingsContext = useSettings();
  if (!settingsContext) {
    throw new Error("Settings context is not available");
  }
  const { settings, setSettings } = settingsContext;
  const {
    isError,
    isPending,
    setSettings: setSettingsApi,
    isSuccess,
  } = useSetSettings();
  const { toast } = useToast();
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: "An error occurred",
        status: "error",
      });
    } else if (isSuccess) {
      toast({
        title: "Success",
        description: "Settings saved successfully",
        status: "success",
      });
    }
  }, [isError, isSuccess, toast]);
  const formSchema = z.object({
    siteName: z.string().min(3).max(20),
    siteTheme: z.string(),
    siteAddress: z.string(),
    siteEmail: z.string().email(),
    sitePhone: z.string().regex(/^\d+$/),
  });
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: settings || {},
  });

  const handleSave = (data: Settings) => {
    setSettingsApi(data);
    setSettings(data);
  };

  return (
    <div className="manage-settings-wrapper bg-white">
      <div className="manege-settings-container w-[80%] mx-auto flex items-center justify-center flex-col gap-4 shadow-lg p-8 bg-gray-100 ">
        <form onSubmit={handleSubmit(handleSave)}>
          <label htmlFor="siteName" className="text-lg font-bold text-gray-600">
            Site Name
          </label>
          <input
            type="text"
            id="siteName"
            {...register("siteName")}
            className="w-full p-5"
          />
          <label htmlFor="theme" className="text-lg font-bold text-gray-600">
            Theme
          </label>
          <select id="theme" {...register("siteTheme")} className="w-full p-5">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
          <br />
          <label htmlFor="style" className="text-lg font-bold text-gray-600">
            Style
          </label>
          <select name="style" id="style" className="w-full p-5">
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
          </select>
          <label
            htmlFor="siteAddress"
            className="text-lg font-bold text-gray-600"
          >
            Site Address
          </label>
          <input
            type="text"
            id="siteAddress"
            {...register("siteAddress")}
            className="w-full p-5"
          />
          <label
            htmlFor="siteEmail"
            className="text-lg font-bold text-gray-600"
          >
            Site Email
          </label>
          <input
            type="email"
            id="siteEmail"
            {...register("siteEmail")}
            className="w-full p-5"
          />
          <label
            htmlFor="siteNumber"
            className="text-lg font-bold text-gray-600"
          >
            Site Number
          </label>
          <input
            type="text"
            id="sitePhone"
            {...register("sitePhone")}
            className="w-full p-5"
          />
          <label htmlFor="siteLogo" className="text-lg font-bold text-gray-600">
            Site Logo
          </label>
          <input
            type="text"
            id="siteLogo"
            {...register("siteLogo")}
            className="w-full p-5"
          />
          <label
            htmlFor="siteCover"
            className="text-lg font-bold text-gray-600"
          >
            Site Cover
          </label>
          <input
            type="text"
            id="siteCover"
            {...register("siteCover")}
            className="w-full p-5"
          />
          <Button1
            title={isPending ? "Loading..." : "Save"}
            bgColor=" bg-blue-500"
            type="submit"
            disabled={isPending}
          />
        </form>
      </div>
    </div>
  );
}
