import { useState } from "react";

const useVisibleHook = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const handleVisisble =(e:any) =>{
    setVisible(prev => !prev)
  }
  return { visible, handleVisisble };
};
export default useVisibleHook;
