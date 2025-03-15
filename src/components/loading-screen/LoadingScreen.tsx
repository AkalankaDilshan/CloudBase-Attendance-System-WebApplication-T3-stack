import CircleLoader from "react-spinners/CircleLoader";

type LoadingScreenProps = {
     loading: boolean;
};

const LoadingScreen = ({ loading }: LoadingScreenProps) => {

     if (!loading) return null;
     return (
          <div className='z-50  px-4 absolute w-full h-full flex items-center justify-center bg-primary-foreground'>
               Getting things read ...   <CircleLoader size={30} color='#ff0000' />
          </div>
     );
}

export default LoadingScreen;