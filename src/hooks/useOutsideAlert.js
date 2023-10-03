import { useEffect } from "react";

// hook to call function outside a container
// eg: close a dropdown when clicked outside

const useOutsideAlert = (ref, handleClick = () => {}, ignoreClass = null) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      const target = event?.target;
      if (
        ref.current &&
        !ref.current.contains(target) &&
        !target?.className?.includes?.(ignoreClass)
      ) {
        handleClick();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handleClick]);
};

export default useOutsideAlert;
