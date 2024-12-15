import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
const Verify = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const URL = "http://localhost:4000";

  const verifyPayment = async () => {
    let response = await axios.post(`${URL}/api/verify`, {
      success,
      orderId,
    });
    if (response.data.success) {
      navigate("/myorders");
      toast.success(response.data.message);
    } else {
      navigate("/");
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    verifyPayment();
  }, [orderId, success]);
  return (
    <section>
      <div className="grid min-h-[60vh]">
        <div className="h-24 w-24 animate-spin place-self-center rounded-full border-4 border-t-primary" />
      </div>
    </section>
  );
};

export default Verify;
