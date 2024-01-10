
import SidebarTaskTable from '@/components/TaskTable/SidebarTaskTable';
import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [users, setUsers] = useState([]);
console.log(users)
  useEffect(() => {
    fetch('http://207.180.244.205:1085/api/Tasks/getemployeelist')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>

      <SidebarTaskTable />
    </div>
  );
};

export default HomePage;