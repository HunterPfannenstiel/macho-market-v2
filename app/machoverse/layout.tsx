import Providers from "@_providers/Machoverse/Providers";
import PageHeading from "@_reuseable/Header/PageHeading";
import { SessionDetails } from "@_types/machoverse";
import Header from "components/ui/Machoverse/Header";
import Web3API from "custom-objects/Fetch/API";
import { redirect } from "next/navigation";
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
  const res = await Web3API.Get(
    "/database/web/session-info",
    cookies().toString()
  );
  if (!res.success) {
    console.error(res.errorMessage);
    return { isSignedIn: false };
  }
  return res.data as SessionDetails;
};

export default DashboardLayout;
