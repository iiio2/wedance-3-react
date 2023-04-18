import { useState, useEffect } from "react";

const withSpinner = (WrappedComponent: any) => {
  return (props: any) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }, []);

    if (loading) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-8 h-64 w-64"></div>
          </div>
        </div>
      );
    }
    return <WrappedComponent {...props} />;
  };
};

export default withSpinner;
