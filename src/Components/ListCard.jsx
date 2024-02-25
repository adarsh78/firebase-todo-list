import { deleteDoc, doc } from "firebase/firestore";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { db } from "../config/firebase";
import AddAndUpdateList from "./AddAndUpdateList";
import useDisclose from "../Hooks/useDisclose";
import { toast } from "react-toastify";

const ListCard = ( { list }) => {

    const { isOpen, onOpen, onClose } = useDisclose();

    const deleteItem = async (id) => {
        try {
            await deleteDoc(doc(db, "lists", id));
            toast.success("Item deleted successfully");
        } catch (error) {
            console.log(error);
        }
    }


  return (
   <>
   <div key={list.id} className="flex my-4 items-center text-xl justify-between bg-yellow-300 max-w-[350px] mx-auto rounded-md p-4">
          <h3 className="max-w-[300px]">{list.name}</h3>
          <div className="flex gap-2">
            <CiEdit 
            onClick={onOpen}
            className="text-3xl text-blue-500 cursor-pointer"/>
            <MdOutlineDelete 
            onClick={() => deleteItem(list.id)}
            className="text-3xl text-red-600 cursor-pointer"/>
          </div>
    </div>

    <AddAndUpdateList 
    isOpen={isOpen}
    onClose={onClose}
    isUpdate
    list={list}
    />
   </>
  )
}

export default ListCard