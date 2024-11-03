import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteDoc = (props) => {
  const { document } = props;
  const { documentId } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/documents/${documentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true,
      });
      if (response.status === 200) {alert("delete complete!")}

      navigate(`/${localStorage.getItem("username")}/document`);
    } catch (error) {
      console.error(error);
    }    
  }

  return (
    <div className="bg-white px-12 py-8 rounded-3xl overflow-hidden">
      <div className="flex flex-col gap-2">
        <span className="text-xl font-bold">Delete Alert !</span>
        <span>Are you want to delete {document.title} ?</span>
        <div className="flex flex-row gap-4">
          <button className="btn bg-red-300 hover:bg-red-400" onClick={() => handleDelete()}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDoc;
