import React, { ReactNode } from 'react';

type SQLiteProviderProps = {
  databaseName: string;
  children: ReactNode;
};

const SQLiteProvider: React.FC<SQLiteProviderProps> = ({ databaseName, children }) => {
  // Implemente conforme necessário
  return <>{children}</>;
};
