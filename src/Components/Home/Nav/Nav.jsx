import { useSelector } from "react-redux";

import { Link } from "react-router-dom";



import { auth } from "../../../firebase/firebase";
import "../../../styles/Home/Nav/Nav.css";
import Sell from "../../Investment/Sell";
import Ping from "../../Notify/Ping"
import { useToasts } from "react-toast-notifications";

import { BASE_URL } from "../../../Constants/api_constants";
import axios from "axios";
import { useEffect, useState } from "react";

import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";

import moment from "moment";
import CloseIcon from '@mui/icons-material/Close';

import React from "react";


import FacebookIcon from "@mui/icons-material/Facebook";

// import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import YouTubeIcon from "@mui/icons-material/YouTube";
// import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from "@mui/icons-material/Instagram";

import CallIcon from "@mui/icons-material/Call";



let Nav = () => {

  // const reducer = (state,action) => {
  //   switch()
  // }

// var started
  const [user, setUser] = useState([])
  let { addToast } = useToasts();
  let [open, setOpen] = useState(false);
  let [opens, setOpens] = useState(false);
  // let  [check, setCheck] = useState(false);
  // const [totalseen, setTotalseen] = useState();
  let [modalItem, setModalItem] = useState();
  const [counts, setcounts] = useState([])
  // const [first, setFirst] = useState(true)
  // let [notification, setNotification] = useState([])
  const [usernotifications, setuserNotifications] = useState([])
  // let [modalItems, setModalItems] = useState();
  let [orders, setOrders] = useState([]);
  const [status, setStatus] = useState();

  const [isMobile, setIsMobile] = useState(false);
  //var ends
 

  let state = useSelector((state) => state); // fectching user data from redux store
  // const [isActive, setIsActive] = useState(false);
  let signoutHandler = async () => {
    await auth.signOut();  // calling auth singout to logout the user
  };

  let handleOpen = (item) => {  // it open the cashout input box
    setModalItem(item);
    setOpen(true);              //use state
  };

  let handleClose = () => {     // close the
    setOpen(false);
  };


  

  let handleOpens = (e) => {   // it open the notification input box
    // setModalItems(items);
    // items.preventDefault();
    // jh();
    setOpens(true);
  };

  let handleCloses = () => {  
    setOpens(false);
  };

  let fetchuser = async () => { // to fetch the user from the get by ID api
    // handleClose();
    // handleCloses();

    if(state) {
      let data = await axios.get(
        `${BASE_URL}/user/${state._id}`
      );
      if (data.data && data.data.data) {
        let response = data.data.data;
        console.log(response);
        setOrders(response);
        setUser(response);
        // setNotification(response);
        // setStatus(response);

        // console.log(orders);
      }
    }
  };

  // console.log(usernotifications.data._id);


  
  
  let fetchstatus = async () => {
    // handleClose();
    // handleCloses();
    // console.log(state._id,'this is id')
    if(state) {
      const data = await axios.get(
        `${BASE_URL}/user/user-notification/${state._id}`); // user id 
        
        
        console.log(data);
        const notifyid = (data.data.data);
      
          notifyid.forEach(element => {
            console.log(element);
            console.log(element._id);
          });
   




      if (data.data && data.data.data) {
        let response = data.data;
        console.log(response);
       
        // setOrders(response);
        // setUser(response);
        setuserNotifications(response)
        setStatus(response);
      }
    }
  };











  let handleRead = async (event,nID) => {
    try {
      let data = await axios.post(BASE_URL + `/user/user-notification/${nID}`, {
  status:true,
       
    
        
      });
      
      if (data.data && data.data.data) {
        // addToast("Notification has been update", {
        //   appearance: "success",
        //   autoDismiss: true,
        // });
        fetchstatus();
      } else {
        addToast(data.data.message, { appearance: "error", autoDismiss: true });
      }
    } catch (e) {
      console.log(e);
      addToast("error occurred", { appearance: "error", autoDismiss: true });
    }
    
  };



  useEffect(() => {
    fetchuser();
    fetchstatus();
    // console.log(state._id)

  }, [state]);
  
  return (
    <>
    <Sell
      handleClose={handleClose}
      item={modalItem}
      walletBalance={orders.wallet_balance} 
      open={open}
      fetchuser={fetchuser}
      />

      <Ping 
      handleCloses={handleCloses}
      // item={modalItems}   
      open={opens}   
      fetchuser={fetchuser}
      counts={counts}
  />

   
 {/* Nav bar START*/}
      <div className="navbar">
        {/* logo*/}
          <p >
            <Link id="idea" to={"/"}>
              <svg id="logo-75" width="186" height="41" viewBox="0 0 186 41" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="ccustom" fill-rule="evenodd" clip-rule="evenodd" d="M59.0372 2.72868C59.0372 1.33929 60.1758 0.212959 61.5805 0.212959H66.0111C67.0108 0.212959 67.9797 0.555658 68.7527 1.18272L70.1005 2.276L70.1342 2.30641C70.1653 2.29603 70.1964 2.28589 70.2276 2.276C72.6592 1.50561 75.6094 1.3591 78.6205 1.3591C81.6316 1.3591 84.5818 1.50561 87.0134 2.276C87.0446 2.28589 87.0757 2.29603 87.1068 2.30641L87.1405 2.276L88.4883 1.18272C89.2613 0.555658 90.2302 0.212959 91.2299 0.212959H95.6605C97.0652 0.212959 98.2038 1.33929 98.2038 2.72868V4.28386C98.2038 5.48711 97.6914 6.6347 96.7922 7.4451L95.7049 8.42509C95.1741 8.90351 94.537 9.25169 93.845 9.44151L93.5878 9.51207C94.5953 11.89 95.1519 14.4318 95.1519 16.488C95.1519 24.7594 89.978 28.3317 85.4192 31.4793C81.8291 33.9581 78.6205 36.1734 78.6205 40.213C78.6205 36.1734 75.4119 33.9581 71.8218 31.4793C67.263 28.3317 62.0891 24.7594 62.0891 16.488C62.0891 14.4318 62.6457 11.89 63.6532 9.51207L63.396 9.44151C62.704 9.25169 62.0669 8.90351 61.5361 8.42509L60.4488 7.4451C59.5496 6.6347 59.0372 5.48711 59.0372 4.28386V2.72868ZM81.9268 23.2502C81.9268 23.6454 81.7526 24.0243 81.4426 24.3038C81.1326 24.5832 80.7121 24.7402 80.2736 24.7402C79.8951 24.7402 79.5299 24.6231 79.2377 24.4113C79.7351 25.7283 81.008 26.9762 82.9441 24.9694C84.6533 23.1047 82.8681 19.1718 81.1289 16.838C80.5492 16.0601 79.5975 15.6857 78.6205 15.6857C77.6435 15.6857 76.6918 16.0601 76.1121 16.838C74.3729 19.1718 72.5877 23.1047 74.2969 24.9694C76.233 26.9762 77.5059 25.7283 78.0033 24.4113C77.7111 24.6231 77.3459 24.7402 76.9674 24.7402C76.5289 24.7402 76.1084 24.5832 75.7984 24.3038C75.4884 24.0243 75.3142 23.6454 75.3142 23.2502H81.9268ZM72.2898 11.6081H67.6844L71.3139 14.4828C72.1126 15.1153 73.28 14.9131 73.7742 14.0566C74.3982 12.9752 73.5694 11.6081 72.2898 11.6081ZM84.9512 11.6081H89.5566L85.9271 14.4828C85.1284 15.1153 83.961 14.9131 83.4668 14.0566C82.8428 12.9752 83.6716 11.6081 84.9512 11.6081Z" fill="#72B800"></path><path class="ccustom" d="M103.69 28.5463H107.77V13.1563H103.69V28.5463ZM103.69 10.7563H107.77V7.09629H103.69V10.7563Z" fill="#355030"></path><path class="ccustom" d="M110.399 33.5863H114.479V26.8063H114.539C115.409 28.1263 116.819 28.9963 118.979 28.9963C122.939 28.9963 125.639 25.8463 125.639 20.8663C125.639 16.0663 123.029 12.7363 118.949 12.7363C116.849 12.7363 115.409 13.7263 114.419 15.0763H114.329V13.1563H110.399V33.5863ZM118.109 25.6063C115.679 25.6063 114.389 23.7763 114.389 20.9863C114.389 18.2263 115.409 16.0363 117.959 16.0363C120.479 16.0363 121.499 18.0763 121.499 20.9863C121.499 23.8963 120.179 25.6063 118.109 25.6063Z" fill="#355030"></path><path class="ccustom" d="M133.778 28.9963C137.618 28.9963 140.258 27.1363 140.258 24.0463C140.258 20.4463 137.408 19.7263 134.828 19.1863C132.638 18.7363 130.598 18.6163 130.598 17.2963C130.598 16.1863 131.648 15.5863 133.238 15.5863C134.978 15.5863 136.028 16.1863 136.208 17.8363H139.898C139.598 14.7463 137.348 12.7363 133.298 12.7363C129.788 12.7363 127.028 14.3263 127.028 17.6563C127.028 21.0163 129.728 21.7663 132.488 22.3063C134.588 22.7263 136.538 22.8763 136.538 24.3463C136.538 25.4263 135.518 26.1163 133.718 26.1163C131.888 26.1163 130.628 25.3363 130.358 23.5663H126.578C126.818 26.8363 129.308 28.9963 133.778 28.9963Z" fill="#355030"></path><path class="ccustom" d="M155.749 28.5463V13.1563H151.669V22.0363C151.669 24.0763 150.499 25.5163 148.579 25.5163C146.839 25.5163 146.029 24.5263 146.029 22.7263V13.1563H141.979V23.4163C141.979 26.7763 143.899 28.9663 147.319 28.9663C149.479 28.9663 150.679 28.1563 151.729 26.7463H151.819V28.5463H155.749Z" fill="#355030"></path><path class="ccustom" d="M158.388 28.5463H162.468V19.6063C162.468 17.5663 163.578 16.2463 165.228 16.2463C166.728 16.2463 167.598 17.1463 167.598 18.8863V28.5463H171.678V19.6063C171.678 17.5663 172.728 16.2463 174.438 16.2463C175.938 16.2463 176.808 17.1463 176.808 18.8863V28.5463H180.888V18.1963C180.888 14.8363 179.058 12.7363 175.818 12.7363C173.868 12.7363 172.248 13.7563 171.198 15.4363H171.138C170.388 13.8163 168.828 12.7363 166.878 12.7363C164.748 12.7363 163.248 13.8163 162.408 15.2263H162.318V13.1563H158.388V28.5463Z" fill="#355030"></path><path class="ccustom" d="M0.684082 28.5463H4.76408V7.09629H0.684082V28.5463Z" fill="#355030"></path><path class="ccustom" d="M14.7403 28.9963C19.5103 28.9963 22.7803 25.4563 22.7803 20.8663C22.7803 16.2763 19.5103 12.7363 14.7403 12.7363C9.97025 12.7363 6.70025 16.2763 6.70025 20.8663C6.70025 25.4563 9.97025 28.9963 14.7403 28.9963ZM14.7403 25.8763C12.2203 25.8763 10.8403 23.8663 10.8403 20.8663C10.8403 17.8663 12.2203 15.8263 14.7403 15.8263C17.2303 15.8263 18.6403 17.8663 18.6403 20.8663C18.6403 23.8663 17.2303 25.8763 14.7403 25.8763Z" fill="#355030"></path><path class="ccustom" d="M31.4568 33.7963C33.7368 33.7963 35.7168 33.2563 37.0068 32.0563C38.1468 31.0063 38.8368 29.5363 38.8368 27.3763V13.1563H34.9068V14.7763H34.8468C33.9168 13.4863 32.5068 12.7363 30.5868 12.7363C26.6868 12.7363 23.9268 15.6763 23.9268 20.2663C23.9268 24.9163 27.2868 27.6163 30.7068 27.6163C32.6568 27.6163 33.8268 26.8363 34.7268 25.8163H34.8168V27.4963C34.8168 29.5963 33.7068 30.7063 31.3968 30.7063C29.5068 30.7063 28.6368 29.9563 28.3068 28.9963H24.2568C24.6768 31.9963 27.2568 33.7963 31.4568 33.7963ZM31.3968 24.3463C29.2968 24.3463 27.9168 22.8163 27.9168 20.2063C27.9168 17.6263 29.2968 16.0063 31.3668 16.0063C33.8268 16.0063 35.0268 17.9263 35.0268 20.1763C35.0268 22.4563 33.9768 24.3463 31.3968 24.3463Z" fill="#355030"></path><path class="ccustom" d="M48.7539 28.9963C53.5239 28.9963 56.7939 25.4563 56.7939 20.8663C56.7939 16.2763 53.5239 12.7363 48.7539 12.7363C43.9839 12.7363 40.7139 16.2763 40.7139 20.8663C40.7139 25.4563 43.9839 28.9963 48.7539 28.9963ZM48.7539 25.8763C46.2339 25.8763 44.8539 23.8663 44.8539 20.8663C44.8539 17.8663 46.2339 15.8263 48.7539 15.8263C51.2439 15.8263 52.6539 17.8663 52.6539 20.8663C52.6539 23.8663 51.2439 25.8763 48.7539 25.8763Z" fill="#355030"></path><path class="ccustom" d="M180.704 9.79629C180.704 9.10593 181.263 8.54629 181.954 8.54629H184.454C185.144 8.54629 185.704 9.10593 185.704 9.79629C185.704 10.4866 185.144 11.0463 184.454 11.0463H181.954C181.263 11.0463 180.704 10.4866 180.704 9.79629Z" fill="#355030"></path></svg>
            </Link>
          </p>  
         
 {/* NavLinks*/}
<div >
  <ul id="navlink">
    <li><a className="active" href="/">Home</a></li>
    <li><a href="/">Blog</a></li>
    <li><a href="/">About</a></li>
    <li><a href="/">Service</a></li>
    <li><a href="/">Contact</a></li>
  </ul>
</div>

        {/* </div> */}

        <ul className={isMobile ? "nav-links-mobile": "nav-links"}
          onClick={() => setIsMobile(false)}>


        {!state || !state.multiFactor || !state.multiFactor.user ? (
          ""
        ) : (
          <>
            <div className="links v-class-resp h-nav-resp">
              <Link id="iee" to="/stocks">Discover</Link>
              <Link  id="iee" to={"/investment"}>Investments</Link>
              
              <a id="iee" href="#">Resources</a>


              <div className="dropdown">
               
                                <div className="cor" >
                           
                                  <span id="iee" className="material-symbols-outlined">Wallet</span>
                                  <div className="dropdown-content">
                                    <div
                                      onClick={() => handleOpen()}
                                      className="we"
                                    >
                                      Cashout =  &#8377; {orders.wallet_balance}
                                    </div> 
                                    <Link id="iee" to={"/wallet"}>Referral History</Link>
                               
                               
            
            
                                    <Link id="iee" to={"/Cashouthistory"}>Cashout History</Link>
                                  </div>
                                    </div>
                                    {/* {console.log()} */}
                                    </div>
                                       </div>  


   
            <div className="dropdowns">
            <div className="button" >
                
               
                
                <NotificationBadge  count={usernotifications.unseenTotal}       effect={Effect.SCALE} />
                <span style={{fontSize:"28px"}}  className="material-symbols-outlined">notifications</span>
               
                  <div className="dropdown-contents">
      
           <div className="table-containers">
             <table className="table">
            <thead>
              <tr>
 
               <div className="investment-item d-flex flex-column">
             <span style={{ fontSize:"24px" }}>
             Notifications

             </span>
        
           </div>
              </tr>
            </thead>

           
      
            {
                  usernotifications.
                        length === 0 ? (
                    "No New Notification"
                ) : (
                    <tbody>
 
                        {usernotifications.data.slice().reverse()
                                .map((e) => {

                                    return (
                                        <>
                                    
                                      <tr >
                                     
                                      <div className="we">
                                   

                                    
                                    
                                  
                                     
                                     
                                     <div onClick={event => handleRead(event,e._id)} ><td onClick={() => {handleOpens(setcounts(e.message) )}}>{e.message}</td> 
                                      <td >{e.status ? "" :  <div className="dot" ></div> }</td> 
                                     
                                     </div>
                                     
                                        

                                               <div className="ee">
                                            <td style={{fontSize:"9px"}}>{moment(e.createdAt).fromNow()}</td> 
                            
                                            </div>
                                               </div>
                                               </tr>
                          
                                            
                                        </>
                                    );
                                })}
                    </tbody>
                )}
            
</table>
 
      </div>
  
             </div>
             </div>

            </div>

            </>
        )} 

        
        

    <div className="login">
          {!state || !state.multiFactor || !state.multiFactor.user ? (
            ""
          ) : (
            <>       
              <div className="wallet">
             
                <div className="wallet-container">
                  <span
                    style={{ cursor: "pointer" }}
                    className="material-symbols-outlined"
                  >
                    person
                  </span>{" "}
              </div>     
                </div>              
              </>
        )} 


           {!state || !state.multiFactor || !state.multiFactor.user ? (
             <Link className="login-link" to="/login">
               <div className="login-container">Login/Signup</div>
             </Link>
           ) : (
             <>
               <div className="logout-container" onClick={signoutHandler}>
                 <img src="logout.svg" />
               </div>
             </>
           )}
         </div>

           </ul>
         <button className="mobile-menu-icon"
         onClick={() => setIsMobile(!isMobile)}>

            {isMobile ?  (
              <CloseIcon/>
              ) : (
                <MenuIcon/>
            )}
         </button>


         </div> 
            
            
     </>
   );
 };

export default Nav;





































// import { useSelector } from "react-redux";

// import { Link } from "react-router-dom";



// import { auth } from "../../../firebase/firebase";
// import "../../../styles/Home/Nav/Nav.css";
// import Sell from "../../Investment/Sell";
// import Ping from "../../Notify/Ping"
// import { useToasts } from "react-toast-notifications";

// import { BASE_URL } from "../../../Constants/api_constants";
// import axios from "axios";
// import { useEffect, useState } from "react";

// import NotificationBadge from "react-notification-badge";
// import { Effect } from "react-notification-badge";

// import moment from "moment";
// import CloseIcon from '@mui/icons-material/Close';

// import React from "react";


// import FacebookIcon from "@mui/icons-material/Facebook";

// // import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
// import YouTubeIcon from "@mui/icons-material/YouTube";
// // import { Link } from "react-router-dom";
// import MenuIcon from '@mui/icons-material/Menu';
// import InstagramIcon from "@mui/icons-material/Instagram";

// import CallIcon from "@mui/icons-material/Call";



// let Nav = () => {

//   // const reducer = (state,action) => {
//   //   switch()
//   // }

// // var started
//   const [user, setUser] = useState([])
//   let { addToast } = useToasts();
//   let [open, setOpen] = useState(false);
//   let [opens, setOpens] = useState(false);
//   let  [check, setCheck] = useState(false);
//   const [totalseen, setTotalseen] = useState();
//   let [modalItem, setModalItem] = useState();
//   const [counts, setcounts] = useState([])
//   // const [first, setFirst] = useState(true)
//   let [notification, setNotification] = useState([])
//   const [usernotifications, setuserNotifications] = useState([])
//   let [modalItems, setModalItems] = useState();
//   let [orders, setOrders] = useState([]);
//   const [status, setStatus] = useState();

//   const [isMobile, setIsMobile] = useState(false);
//   //var ends
 

//   let state = useSelector((state) => state); // fectching user data from redux store
//   const [isActive, setIsActive] = useState(false);
//   let signoutHandler = async () => {
//     await auth.signOut();  // calling auth singout to logout the user
//   };

//   let handleOpen = (item) => {  // it open the cashout input box
//     setModalItem(item);
//     setOpen(true);              //use state
//   };

//   let handleClose = () => {     // close the
//     setOpen(false);
//   };


  

//   let handleOpens = (e) => {   // it open the notification input box
//     // setModalItems(items);
//     // items.preventDefault();
//     // jh();
//     setOpens(true);
//   };

//   let handleCloses = () => {  
//     setOpens(false);
//   };

//   let fetchuser = async () => { // to fetch the user from the get by ID api
//     // handleClose();
//     // handleCloses();

//     if(state) {
//       let data = await axios.get(
//         `${BASE_URL}/user/${state._id}`
//       );
//       if (data.data && data.data.data) {
//         let response = data.data.data;
//         console.log(response);
//         setOrders(response);
//         setUser(response);
//         // setNotification(response);
//         // setStatus(response);

//         // console.log(orders);
//       }
//     }
//   };

//   // console.log(usernotifications.data._id);


  
  
//   let fetchstatus = async () => {
//     // handleClose();
//     // handleCloses();
//     // console.log(state._id,'this is id')
//     if(state) {
//       const data = await axios.get(
//         `${BASE_URL}/user/user-notification/${state._id}`); // user id 
        
        
//         console.log(data);
//         const notifyid = (data.data.data);
      
//           notifyid.forEach(element => {
//             console.log(element);
//             console.log(element._id);
//           });
   




//       if (data.data && data.data.data) {
//         let response = data.data;
//         console.log(response);
       
//         // setOrders(response);
//         // setUser(response);
//         setuserNotifications(response)
//         setStatus(response);
//       }
//     }
//   };











//   let handleRead = async (event,nID) => {
//     try {
//       let data = await axios.post(BASE_URL + `/user/user-notification/${nID}`, {
//   status:true,
       
    
        
//       });
      
//       if (data.data && data.data.data) {
//         // addToast("Notification has been update", {
//         //   appearance: "success",
//         //   autoDismiss: true,
//         // });
//         fetchstatus();
//       } else {
//         addToast(data.data.message, { appearance: "error", autoDismiss: true });
//       }
//     } catch (e) {
//       console.log(e);
//       addToast("error occurred", { appearance: "error", autoDismiss: true });
//     }
    
//   };



//   useEffect(() => {
//     fetchuser();
//     fetchstatus();
//     // console.log(state._id)

//   }, [state]);
  
//   return (
//     <>
//     <Sell
//       handleClose={handleClose}
//       item={modalItem}
//       walletBalance={orders.wallet_balance} 
//       open={open}
//       fetchuser={fetchuser}
//       />

//       <Ping 
//       handleCloses={handleCloses}
//       // item={modalItems}   
//       open={opens}   
//       fetchuser={fetchuser}
//       counts={counts}
//   />
 
        

// <div className="fcontainer">

//           <div className="f" >   <a id="i" href="#"> <CallIcon />-21324334</a></div>
//         <div className="fitem item1">    <a id="i" href="https://www.facebook.com/">
//           <FacebookIcon
//           />
//         </a></div>
//         <div className="fitem item1">  <a  id="i" href="https://www.instagram.com">
//           <InstagramIcon
         
//           />
//         </a></div>
//         <div className="fitem item3">  <a id="i" href="https://twitter.com/">
     
//      <YouTubeIcon
       
//      />
//    </a></div>
       
//     </div>
   

//       <div className="navbar">
//         {/* <GiHamburgerMenu className="burger"
//           onClick={() => setOpen(!open)} /> */}
//         {/* <div className="logo"> */}
//           <p >
//             <Link id="idea" to={"/"}>Agoi Financial Services</Link>
//             {/* {state.usernotifications.user_id} */}
//             {/* &#8377; {state.wallet_balance} */}
//           </p>         

//         {/* </div> */}


//         {!state || !state.multiFactor || !state.multiFactor.user ? (
//           ""
//         ) : (
//           <>
//             <div className="links v-class-resp h-nav-resp">
//               <Link id="i" to="/stocks">Discover</Link>
//               <Link  id="i" to={"/investment"}>Investments</Link>
              
//               <a id="i" href="#">Resources</a>


//               <div className="dropdown">
               
//                 <div className="cor" >
               
//                   <span id="i" className="material-symbols-outlined">Wallet</span>
//                   <div className="dropdown-content">
//                     <div
//                       onClick={() => handleOpen()}
//                       className="we"
//                     >
//                       Cashout =  &#8377; {orders.wallet_balance}
//                     </div> 
//                     <Link id="i" to={"/wallet"}>Referral History</Link>
                   
                   


//                     <Link id="i" to={"/Cashouthistory"}>Cashout History</Link>
//                   </div>
//                     </div>
//                     {/* {console.log()} */}
//                     </div>
//                        </div>     
       


   
//             <div className="dropdowns">
//             <div className="button" >
                
               
//                   {/* <span  className="button__badge"> {usernotifications.unseenTotal}</span> */}
//                 <NotificationBadge  count={usernotifications.unseenTotal}       effect={Effect.SCALE} />
//                 <span style={{fontSize:"28px"}}  className="material-symbols-outlined">notifications</span>
//                 {/* onClick={() => setCheck(!check)} */}
//                   <div className="dropdown-contents">
      
//            <div className="table-containers">
//              <table className="table">
//             <thead>
//               <tr>
 
//                <div className="investment-item d-flex flex-column">
//              <span style={{ fontSize:"24px" }}>
//              Notifications

//              </span>
        
//            </div>
//               </tr>
//             </thead>

           
      
//             {
//                   usernotifications.
//                         length === 0 ? (
//                     "No New Notification"
//                 ) : (
//                     <tbody>
 
//                         {usernotifications.data.slice().reverse()
//                                 .map((e) => {

//                                     return (
//                                         <>
                                    
//                                       <tr >
                                     
//                                       <div className="we">
                                   

                                    
                                    
                                  
                                     
                                     
//                                      <div onClick={event => handleRead(event,e._id)} ><td onClick={() => {handleOpens(setcounts(e.message) )}}>{e.message}</td> 
//                                       <td >{e.status ? "" :  <div className="dot" ></div> }</td> 
                                     
//                                      </div>
                                     
                                        

//                                                <div className="ee">
//                                             <td style={{fontSize:"9px"}}>{moment(e.createdAt).fromNow()}</td> 
                            
//                                             </div>
//                                                </div>
//                                                </tr>
                          
                                            
//                                         </>
//                                     );
//                                 })}
//                     </tbody>
//                 )}
            
// </table>
 
//       </div>
  
//              </div>
//              </div>

//             </div>

//             </>
//         )} 

        
        

//     <div className="login">
//           {!state || !state.multiFactor || !state.multiFactor.user ? (
//             ""
//           ) : (
//             <>       
//               <div className="wallet">
             
//                 <div className="wallet-container">
//                   <span
//                     style={{ cursor: "pointer" }}
//                     className="material-symbols-outlined"
//                   >
//                     person
//                   </span>{" "}
//               </div>     
//                 </div>              
//               </>
//         )} 


//            {!state || !state.multiFactor || !state.multiFactor.user ? (
//              <Link className="login-link" to="/login">
//                <div className="login-container">Login/Signup</div>
//              </Link>
//            ) : (
//              <>
//                <div className="logout-container" onClick={signoutHandler}>
//                  <img src="logout.svg" />
//                </div>
//              </>
//            )}
//          </div>

//          <button className="mobile-menu-icon">
//             {isMobile ?  (
//               <CloseIcon/>
//               ) : (
//                 <MenuIcon/>
//             )}
//          </button>
         
//          </div> 
            
            
//      </>
//    );
//  };

// export default Nav;



