import { createContext, useEffect } from "react";
import { Settings, SettingsContextType } from "../types";
import { useContext, useState } from "react";
import useGetSettings from "../hooks/api/useGetSettings";
const SettingsContext = createContext<SettingsContextType | null>(null);

const SettingsContextProvider = ({ children }: React.PropsWithChildren) => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoadingSettings, setIsLoadingSettings] = useState<boolean>(false);
  const {
    settings: fetchedSettingsData,
    isLoading,
    isError,
  } = useGetSettings();

  useEffect(() => {
    if (fetchedSettingsData) {
      setSettings(fetchedSettingsData?.data[0]);
      localStorage.setItem(
        "settings",
        JSON.stringify(fetchedSettingsData?.data[0])
      );
    } else if (isError) {
      setSettings(null);
      localStorage.removeItem("settings");
    } else if (isLoading) {
      setIsLoadingSettings(true);
    }
    setIsLoadingSettings(false);
  }, [fetchedSettingsData, isError, isLoading]);
  return (
    <SettingsContext.Provider
      value={{ settings, setSettings, isLoadingSettings }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => {
  if (!SettingsContext) {
    throw new Error(
      "useSettings must be used within a SettingsContextProvider"
    );
  }

  return useContext(SettingsContext);
};

export { SettingsContextProvider, useSettings };
