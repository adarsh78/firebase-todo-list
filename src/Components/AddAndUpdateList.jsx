import { useState } from "react";
import Modal from "./Modal";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const AddAndUpdateList = ({ isOpen, onClose, isUpdate, list }) => {
  const [itemInput, setItemInput] = useState(isUpdate ? list.name : "");

  const handleChange = (e) => {
    setItemInput(e.target.value);
  };

  const handleButton = () => {
    isUpdate ? updateList() : addList();
  };

  const addList = async () => {
    try {
        if(itemInput == "") {
            alert("Add a todo item");
        }
        else {
            const listRef = collection(db, "lists");
            await addDoc(listRef, { name: itemInput });
            setItemInput("");
            onClose();
            toast.success("Item added successfully");
        }
    } catch (error) {
      console.log(error);
    }
  };

  const updateList = async () => {
    try {
      const listRef = doc(db, "lists", list.id);
      await updateDoc(listRef, { name: itemInput });
      setItemInput("");
      onClose();
      toast.success("Item updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h4 className="text-xl font-medium mb-4">Add your task</h4>
        <input
          type="text"
          placeholder="Your task here..."
          className="w-[100%] mb-5 border border-black pl-2 py-2 rounded"
          value={itemInput}
          onChange={handleChange}
        />
        <button
          onClick={handleButton}
          className="cursor-pointer bg-green-400 px-4 py-1 rounded"
        >
          {isUpdate ? "Update" : "Add"}
        </button>
      </Modal>
    </>
  );
};

export default AddAndUpdateList;
