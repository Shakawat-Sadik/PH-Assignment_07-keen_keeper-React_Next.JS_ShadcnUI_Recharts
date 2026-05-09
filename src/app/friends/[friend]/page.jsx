import FriendPageComponent from "../../../components/Friend";

const FriendPage = async ({ params }) => {
  const { friend: path } = await params;

  return (
    <div className="">
      <FriendPageComponent path={path} />
    </div>
  );
};

export default FriendPage;
