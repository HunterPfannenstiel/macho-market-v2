const UserPage = ({ params }: { params: { address: string } }) => {
  return <h1>{params.address} Page</h1>;
};

export default UserPage;
