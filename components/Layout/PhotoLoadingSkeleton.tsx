
import Skeleton from '@mui/material/Skeleton';

export default function PhotoLoadingSkeleton (){
  return (
    <div className="photo-container p-2 m-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:scale-105">
      <Skeleton variant="text" width={210} height={28} animation="wave" />
      <Skeleton variant="rectangular" width={250} height={250} animation="wave" className="rounded-md" />
    </div>
  );
};