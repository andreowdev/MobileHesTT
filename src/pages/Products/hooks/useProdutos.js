import { useState, useEffect } from "react";
import axios from "axios"; // Correct import statement

export function usePedidos() {
  const [pedidosData, setPedidosData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPedidosData = async () => {
      try {
        const response = await axios.get("http://192.168.1.9:3000/pedidos?idGrupoPedido=9");
        
        console.log("Dados recebidos do backend:", response.data);
        
        setPedidosData(response.data);
        setLoading(false); // Data successfully fetched
      } catch (error) {
        console.error("Erro ao carregar dados:", error); // Log the error
        setError("Erro ao carregar dados");
        setLoading(false); // Error occurred, loading done
      }
    };
    fetchPedidosData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return { pedidosData, loading, error };
}
