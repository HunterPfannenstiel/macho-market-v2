import Providers from "@_providers/Machoverse/Providers";
import PageHeading from "@_reuseable/Header/PageHeading";
import { SessionDetails } from "@_types/machoverse";
import Header from "components/ui/Machoverse/Header";
import { cookies } from "next/headers";

const DashboardLayout = async ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) => {
  const session = await fetchSession();
  return (
    <>
      <Providers>
        <Header session={session} headingHref="/machoverse" />
        <PageHeading indexPageName={"Account"} />
        {children}
      </Providers>
    </>
  );
};

const fetchSession = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/web/session-info`,
    { headers: { Cookie: cookies().toString() }, cache: "no-store" }
  );
  let data: any;
  try {
    data = await res.json();
  } catch (error) {
    console.log("No json");
  }

  if (!res.ok) {
    console.log("error", data);
    return;
  }
  console.log("Fetched", data);
  return data as SessionDetails;
};

export default DashboardLayout;
