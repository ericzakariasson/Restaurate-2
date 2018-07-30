import React from 'react';

const Dashboard = (props) => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={props.onSignout}>Logga ut</button>
    </div>
  )
}

export default Dashboard;