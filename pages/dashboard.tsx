import { destroyCookie } from "nookies";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";
import { AuthTokenError } from "../services/errors/AuthTokenError";
import { WithSSRAuth } from "../utils/WithSSRAuth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api
      .get("/me")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);

  return <h1 style={{ color: "#000" }}>Dashboard: {user?.email}</h1>;
}

export const getServerSideProps = WithSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);

    try {
      const response = await apiClient.get("/me");
    } catch(error) {
      console.log(error instanceof AuthTokenError);

      destroyCookie(ctx, "nextauth.token");
      destroyCookie(ctx, "nextauth.refreshToken");

      return {
        redirect: {
          destination: "/",
          permanent: false,
        }
      }
    }

  return {
    props: {},
  };
});
