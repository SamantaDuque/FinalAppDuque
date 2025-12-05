// src/hooks/useDatabase.js
import { useEffect } from 'react';
import { initDB } from '../services/database';

export default function useDatabase() {
  useEffect(() => {
    initDB();
  }, []);
}
