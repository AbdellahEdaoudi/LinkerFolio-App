"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CheckCheck, CircleEllipsis, MessageCircleMore, UserMinus, UserPlus } from "lucide-react";
import { MyContext } from "../Context/MyContext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

function FriendRequest({ emailuser, path, userDetailsG }) {
  const { SERVER_URL_V, userDetails, EmailUser } = useContext(MyContext);
  const router = useRouter();
  const [friendRequests, setFriendRequests] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [LoadingD, setLoadingD] = useState(false);
  const [from, setfrom] = useState("");
  const [To, setTo] = useState("");
  const [status, setstatus] = useState("pending");
  const [fromf, setfromf] = useState("");
  const [Tof, setTof] = useState("");
  const [statusf, setstatusf] = useState("accept");
  const [friendId, setfriendId] = useState("");

  useEffect(() => {
    if (userDetails && Array.isArray(userDetails)) {
      const userD = userDetails.find(user => user.email === EmailUser);
      if (userD) {
        setfrom(userD.email);
        if (userDetailsG && userDetailsG._id) {
          setTo(userDetailsG.email);
        } else {
          console.error("userDetailsG is undefined or does not have an _id property");
        }
      } else {
        console.log("User not found in userDetails");
      }
    }
  }, [userDetails, EmailUser, userDetailsG]);

  useEffect(() => {
    if (friendRequests && Array.isArray(friendRequests)) {
      const userF = friendRequests.find((f) =>
        (f.from === EmailUser || f.from === emailuser) &&
        (f.to === EmailUser || f.to === emailuser));
      if (userF) {
        setfromf(userF.email);
        setTof(userF.to);
        setfriendId(userF._id)
      } else {
        console.log("User not found in friendRequests");
      }
    }
  }, [friendRequests,EmailUser]);

  const SendFriendRequest = async () => {
    setLoading(true);
    const data = { from, to: To, status };
    console.log(data);
    
    try {
      await axios.post(`${SERVER_URL_V}/friend`, data);
      GetFriendRequest();
      toast("Friend request sent!");
    } catch (error) {
      console.error('Error creating friend request:', error);
    } finally {
      setLoading(false);
    }
  };

  const GetFriendRequest = async () => {
    try {
      const response = await axios.get(`${SERVER_URL_V}/friend`);
      setFriendRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching friend requests', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    GetFriendRequest();
  }, []);

  const UpdateFriendRequest = async () => {
    setLoading(true);
    try {
      const data = { from, to: To, status :"accept" };
      console.log(data);
      await axios.put(`${SERVER_URL_V}/friend/${friendId}`,data);
      GetFriendRequest();
      setLoading(false);
    } catch (error) {
      console.error('Error updating friend request', error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  const DeleteRequest = async () => {
    setLoadingD(true);
    try {
      await axios.delete(`${SERVER_URL_V}/friend/${friendId}`);
      GetFriendRequest();
      toast("Friend request canceled!"); 
    setLoadingD(false);
    } catch (error) {
      console.error('Error deleting friend request', error);
    setLoadingD(false);
    } finally {
    setLoadingD(false);

    }
  };

  const CheckFrirnd = friendRequests.find((f) =>
    (f.from === EmailUser && f.to === emailuser) ||
    (f.from === emailuser && f.to === EmailUser)
  );
  console.log('CheckFrirnd:', CheckFrirnd ? "Kayen" : "makayench");
  
  return (
    <div>
      {/* FriendRequest */}
      {!CheckFrirnd && EmailUser !== emailuser ? (
        <button title="Add friend" onClick={SendFriendRequest} className="flex gap-2 border p-2 rounded-full w-10 cursor-pointer hover:text-blue-500 hover:scale-110 duration-200">
          {Loading ? <i className="fa fa-spinner fa-spin "></i> : <UserPlus />}
        </button>
      ) : (CheckFrirnd &&  CheckFrirnd.status === "pending") && CheckFrirnd.to === EmailUser ? (
        <div className="">
        <button  onClick={()=>document.getElementById('my_modal_3').showModal()}>
        <button  className="flex gap-2 border p-2 rounded-full w-10 cursor-pointer hover:text-blue-500 hover:scale-110 duration-200">
          <CheckCheck />
        </button>
        </button>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm absolute right-2 top-2 text-white">✕</button>
            </form>
            <div className="flex flex-col items-center justify-center">
              <div className="text-white text-2xl my-2">Friend requests</div>
              <Image className="rounded-md" src={userDetailsG.urlimage} width={150} height={100} />
              <div className="text-white text-3xl mt-4">{userDetailsG.fullname}</div>
              <div className="space-x-4 my-4">
                <button onClick={UpdateFriendRequest} className="px-2 py-1 bg-blue-500 rounded-md ">
                {Loading ? <i className="fa fa-spinner fa-spin "></i> : "Confirm"}
                </button>
                <button onClick={DeleteRequest} className="px-2 py-1 bg-gray-500 rounded-md ">
                {LoadingD ? <i className="fa fa-spinner fa-spin "></i> : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </dialog>
        </div>
      ) : (CheckFrirnd && CheckFrirnd.status === "pending") && CheckFrirnd.from === EmailUser ? (
        <button title="Cancel request" onClick={DeleteRequest} className="flex gap-2 border p-2 rounded-full w-10 cursor-pointer hover:text-blue-500 hover:scale-110 duration-200">
          {Loading ? <i className="fa fa-spinner fa-spin "></i> : <UserMinus />}
        </button>
      ) : (CheckFrirnd && CheckFrirnd.status === "accept") ? (
        <button className="flex gap-2 border p-2 rounded-full w-10 cursor-pointer hover:text-blue-500 hover:scale-110 duration-200" onClick={() => { router.push(`/message/to/${path}`); }}>
          <MessageCircleMore />
        </button>
      ) : !CheckFrirnd && EmailUser === emailuser ? (
        <button className="flex gap-2 border p-2 rounded-full w-10 cursor-pointer hover:text-blue-500 hover:scale-110 duration-200" onClick={() => { router.push(`/message/to/${path}`); }}>
          <MessageCircleMore />
        </button>
      ):null}
    </div>
  );
}

export default FriendRequest;
