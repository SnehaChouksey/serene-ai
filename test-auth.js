// test-auth.js
import { GoogleAuth } from "google-auth-library";

(async () => {
  const auth = new GoogleAuth();
  const client = await auth.getClient();
  const token = await client.getAccessToken();
  console.log("ACCESS_TOKEN:", token?.token ? "OK (token fetched)" : "NO TOKEN");
})();
