export const signMessage = async () => {
  const accounts = (await window?.ethereum?.request({
    method: "eth_requestAccounts",
  })) as string[] | undefined; //If user is not signed in, we'll request account and get the account that needs to sign
  if (accounts) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/web/challenge`,
      { credentials: "include" }
    );
    if (res.ok) {
      const { challenge } = (await res.json()) as { challenge: string };
      const account = accounts[0];
      const signedData = await window?.ethereum?.request({
        method: "personal_sign",
        params: [challenge, account],
      });
      return { signedData, account };
    }
  }
};

export const formatVerificationBody = (signature: string, address: string) => {
  return JSON.stringify({ signature, address });
};

export const authenticateWallet = async (url: string) => {
  const info = await signMessage();
  if (!info) {
    console.log("Please sign the message!");
    return;
  }

  console.log(info);
  const res = await fetch(url, {
    method: "POST",
    body: formatVerificationBody(info.signedData as string, info.account),
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    console.log("Error", data);
  } else {
    return data;
  }
};
