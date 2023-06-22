import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AuthorizeTwitter() {
  const { query } = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { code, userId } = query;

  useEffect(() => {
    if (code) {
      axios
        .post(`/api/auth/twitter?code=${code}&userId=${userId}`)
        .then((res) => {
          const bc = new BroadcastChannel("glo-channel");
          const { success } = res.data;

          bc.postMessage({ success });
          setIsLoading(false);
          window.close();
        });
    }
  }, [code]);

  // Fallback in case window is not closed automagically
  return isLoading ? (
    <div>Authorizing...</div>
  ) : (
    <div onClick={() => window.close()}>Click close to continue</div>
  );
}
