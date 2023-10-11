import {SetStateAction, Dispatch } from 'react'
import { NavType } from '../../interfaces/wall';

const WallNav: React.FC<{ setNav: Dispatch<SetStateAction<NavType>>}> = ({setNav}) => {
  return (
    <div className="wallNav">
      <nav onClick={() => setNav('searchFriends')}>Search for friend</nav>
      <nav onClick={() => setNav('addFriend')}>Add new friends</nav>
      <nav onClick={() => setNav('friends')}>Your friends</nav>
      <nav onClick={() => setNav('wall')}>Your circle</nav>
    </div>
  );
};

export default WallNav;
