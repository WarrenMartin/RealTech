import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import React, { useState } from 'react';
import UpdateForm from './UpdateForm';
import EmailMarking from '../pages/EmailMarketing'; // Import the EmailMarking component from its directory
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation





// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import BASE_URL from '../apiConfig';

const WorkoutDetails = ({ workout, user_id  }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const navigate = useNavigate();
  

  


  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch(`${BASE_URL}/api/workouts/` + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  //function to update

  // const handleUpdate = async () => {
  //   // make sure only auth users are allowed
  //   if (!user) {
  //     return;
  //   }
  
  //   // open modal with the current data
  //   const response = await fetch('/api/workouts/' + workout._id, {
  //     method: 'PATCH', // or 'PATCH' depending on your API
  //     headers: {
  //       'Authorization': `Bearer ${user.token}`
  //     }
  //   });
  
  //   const json = await response.json();
  
  //   if (response.ok) {
  //     dispatch({ type: 'UPDATE_WORKOUT', payload: json });
  //   }
  // };

  //second try
  const handleUpdate = () => {
    if (!user) {
      return;
      
    }
    // setShowUpdateModal(true);
     // Toggle the state when update button is clicked
     setShowUpdateModal((prevShowUpdateModal) => !prevShowUpdateModal);
  };

  const sendEmail = () => {
    const email = workout.reps;
    console.log(email); // Just for testing


    
    // Pass the email address to the EmailMarking component
    // You can use any method of state management or global state management library (like Redux) to pass data between components in a different directory
    // Here, I'm passing it as a prop
    // <EmailMarking email={email} />;
    navigate(`/EmailMarketing?email=${email}`);
    
  };

  return (

    // YOU CAN DELETE THIS.
    // <div className="workout-details">
    //   <h4>{workout.title}</h4>
    //   <p><strong>Phn.: </strong>{workout.load}</p>
    //   <p><strong>Note:</strong>{workout.note}</p>
    //   <p><strong>Email: </strong>{workout.reps}</p> {/*reps is email and load is number */}
    //   <p><strong>createdAt</strong>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
    //   <p><strong>updatedAt </strong>{formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })}</p>

    //   <span className="material-symbols-outlined" onClick={handleClick}>delete</span>

      
    // </div>

    <div className="workout-details">
  <h4>{workout.title}</h4>
  <p><strong>Phn.: </strong>{workout.load}</p>
  <p><strong>Note: </strong>{workout.note}</p>
  <p><strong>Email: </strong>{workout.reps}</p> {/*reps is email and load is number */}
  <p><strong>createdAt: </strong>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
  <p><strong>updatedAt: </strong>{formatDistanceToNow(new Date(workout.updatedAt), { addSuffix: true })}</p>

  

  <button onClick={sendEmail}>Send Email</button>

  <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
  <span
  className="material-symbols-outlined"
  onClick={handleUpdate}
  style={{ marginRight: '40px' }}
>
  update
</span>
  {/* {showUpdateModal && <UpdateForm workout={UpdateForm} onClose={() => setShowUpdateModal(false)} />} */}
  {showUpdateModal && <UpdateForm workout={workout} user_id={user_id}  onClose={() => setShowUpdateModal(false)} />}


  


</div>
  )
  
}

export default WorkoutDetails