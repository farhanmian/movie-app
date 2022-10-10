import React, { createContext, useContext, useState } from "react";

interface searchType {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<searchType | null>(null);

export const AppWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <AppContext.Provider
      value={{
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
