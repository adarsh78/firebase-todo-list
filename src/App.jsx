import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { SiFirebase } from "react-icons/si";
import { CiSearch } from "react-icons/ci";
import { FaCirclePlus } from "react-icons/fa6";
import ListCard from "./Components/ListCard";
import AddAndUpdateList from "./Components/AddAndUpdateList";
import useDisclose from "./Hooks/useDisclose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [listItem, setListItem] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclose();

  useEffect(() => {
    const getList = async () => {
      try {
        const listRef = collection(db, "lists");
        // const listSnapshot = await getDocs(listRef);

        onSnapshot(listRef, (snapshot) => {
          const lists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setListItem(lists);
          return lists
        })

      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, []);

  const filterItem = (e) => {

    const value = e.target.value;
    const listRef = collection(db, "lists");

    onSnapshot(listRef, (snapshot) => {
      const lists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredItem = lists.filter((list) => list.name.toLowerCase().includes(value.toLowerCase()));
      setListItem(filteredItem);
      return filteredItem 
    })

  }

  return (
    <>
      <div className="max-w-[360px] mx-auto my-10">
        <div className="bg-white max-w-[350px] mx-auto p-4 rounded-md flex items-center justify-center gap-4">
          <SiFirebase className="text-3xl text-yellow-800" />
          <h1 className="text-2xl font-medium">Firebase to-do List App</h1>
        </div>

        <div className="flex items-center gap-4 my-4 max-w-[350px] mx-auto relative ">
          <input
          onChange={filterItem}
            className="pl-10 rounded-md h-[40px] flex-grow"
            type="text"
            placeholder="Search your items here..."
          />
          <CiSearch className="absolute text-3xl ml-1" />
          <FaCirclePlus
            onClick={onOpen}
            className="cursor-pointer text-4xl text-white"
          />
        </div>

        {listItem.map((list) => {
          return <ListCard key={list.id} list={list} />;
        })}
      </div>

      <AddAndUpdateList isOpen={isOpen} onClose={onClose} />
      <ToastContainer 
      position="bottom-center" 
      />
    </>
  );
};

export default App;
