import classes from "./CollectionPage.module.css";

//?activity query parameter
const CollectionPage = ({ params }: { params: { title: string } }) => {
  return <h1>{params.title} Page</h1>;
};

export default CollectionPage;
