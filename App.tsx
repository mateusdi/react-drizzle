import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite"
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';

import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { Home } from './src/home';

const DATABASE_NAME = "db.db"
const expoDb = openDatabaseSync(DATABASE_NAME)
const db = drizzle(expoDb);

export default function App() {

  const { success, error } = useMigrations(db, migrations);
  useDrizzleStudio(expoDb);

  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  
  
  return (
    <SQLiteProvider databaseName={DATABASE_NAME}>
      <Home />
    </SQLiteProvider>
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
