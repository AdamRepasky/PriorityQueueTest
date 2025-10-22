import { useEffect, useState } from "react";

export function useShowLoader(loading: boolean, minDuration = 1000) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (loading) {
      // Start timer → only show loader if still loading after X ms
      timer = setTimeout(() => {
        if (loading) setShow(true);
      }, minDuration);
    } else {
      // Loading finished → hide loader immediately
      setShow(false);
    }

    return () => clearTimeout(timer);
  }, [loading, minDuration]);

  return show;
}
