import { useState, useEffect } from "react";
import axios from "axios";

export function useVendas() {
  const [vendasData, setVendasData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendasData = async () => {
      try {
        const response = await axios.get("http://192.168.1.9:3000/financeiro");
        setVendasData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar dados financeiros");
        setLoading(false);
      }
    };

    fetchVendasData();
  }, []);

  return { vendasData, loading, error };
}



