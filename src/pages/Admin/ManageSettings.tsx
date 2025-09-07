import { useForm } from "react-hook-form";
import { useSettings } from "../../context/SettingsContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Settings } from "../../types";
import useSetSettings from "../../hooks/api/Admin/settings/useSetSettings";
import { useEffect } from "react";
import { useToast } from "../../hooks/use-toast";
import { FiSave, FiGlobe, FiMail, FiImage, FiSun, FiMoon } from "react-icons/fi";
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
        variant: "destructive",
      });
    } else if (isSuccess) {
      toast({
        title: "Success",
        description: "Settings saved successfully",
        variant: "default",
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
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: settings || {},
    mode: 'onChange'
  });

  const handleSave = (data: Settings) => {
    setSettingsApi(data);
    setSettings(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Site Settings</h2>
            <p className="mt-1 text-sm text-gray-500">Manage your website's configuration and appearance.</p>
          </div>
          
          <form onSubmit={handleSubmit(handleSave)} className="divide-y divide-gray-200">
            {/* General Settings */}
            <div className="px-6 py-6 space-y-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FiGlobe className="mr-2 text-blue-500" />
                General Settings
              </h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">
                    Site Name
                  </label>
                  <input
                    type="text"
                    id="siteName"
                    {...register("siteName")}
                    className={`mt-1 block w-full rounded-md border ${errors.siteName ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
                    placeholder="My Awesome Gym"
                  />
                  {errors.siteName && (
                    <p className="mt-1 text-sm text-red-600">{errors.siteName.message as string}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="siteTheme" className="block text-sm font-medium text-gray-700">
                    Theme
                  </label>
                  <div className="mt-1 relative">
                    <select
                      id="siteTheme"
                      {...register("siteTheme")}
                      className="block w-full rounded-md border border-gray-300 py-2.5 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="light" className="flex items-center">
                        <FiSun className="mr-2" /> Light
                      </option>
                      <option value="dark">
                        <FiMoon className="mr-2" /> Dark
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="px-6 py-6 space-y-6 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FiMail className="mr-2 text-blue-500" />
                Contact Information
              </h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="siteEmail" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="siteEmail"
                    {...register("siteEmail")}
                    className={`mt-1 block w-full rounded-md border ${errors.siteEmail ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
                    placeholder="contact@example.com"
                  />
                  {errors.siteEmail && (
                    <p className="mt-1 text-sm text-red-600">{errors.siteEmail.message as string}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="sitePhone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="sitePhone"
                    {...register("sitePhone")}
                    className={`mt-1 block w-full rounded-md border ${errors.sitePhone ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
                    placeholder="+1234567890"
                  />
                  {errors.sitePhone && (
                    <p className="mt-1 text-sm text-red-600">{errors.sitePhone.message as string}</p>
                  )}
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="siteAddress" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    id="siteAddress"
                    {...register("siteAddress")}
                    className={`mt-1 block w-full rounded-md border ${errors.siteAddress ? 'border-red-300' : 'border-gray-300'} shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5`}
                    placeholder="123 Gym Street, City, Country"
                  />
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="px-6 py-6 space-y-6">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <FiImage className="mr-2 text-blue-500" />
                Media
              </h3>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="siteLogo" className="block text-sm font-medium text-gray-700">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    id="siteLogo"
                    {...register("siteLogo")}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                    placeholder="https://example.com/logo.png"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="siteCover" className="block text-sm font-medium text-gray-700">
                    Cover Image URL
                  </label>
                  <input
                    type="text"
                    id="siteCover"
                    {...register("siteCover")}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5"
                    placeholder="https://example.com/cover.jpg"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="px-6 py-4 bg-gray-50 text-right">
              <button
                type="submit"
                disabled={isPending}
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isPending ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave className="-ml-1 mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
