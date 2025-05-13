import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Carnet from './components/Carnet';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      <Carnet />
    </SafeAreaView>
  );
}