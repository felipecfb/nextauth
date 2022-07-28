import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { WithSSRAuth } from "../utils/WithSSRAuth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return <h1 style={{ color: "#fff" }}>Dashboard: {user?.email}</h1>;
}

export const getServerSideProps = WithSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");
  
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }

  

  return {
    props: {},
  };
});
