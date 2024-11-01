import { useParams } from "react-router-dom";

const DeleteDoc = (props) => {
  const { document } = props;
  const { boardId } = useParams();

  return (
    <div className="bg-white px-12 py-8 rounded-3xl overflow-hidden">
      <div className="flex flex-col gap-2">
        <span className="text-xl font-bold">Delete Alert !</span>
        <span>Are you want to delete {document.title} ?</span>
        <div className="flex flex-row gap-4">
          <button className="btn bg-red-300 hover:bg-red-400">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDoc;
