import Home from "components/ui/Home";
import Link from "next/link";
import { FunctionComponent } from "react";

interface HomePageProps {}

const HomePage: FunctionComponent<HomePageProps> = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Link href={"/collections"}>Collections</Link>
      <Home />
    </>
  );
};

export default HomePage;
