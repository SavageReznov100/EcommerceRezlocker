import React, { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";
const Verify = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    let response = await axios.post("http://localhost:4000/api/verify", {
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
      <div className="min-h-[60vh] grid">
        <div className="w-24 h-24 place-self-center border-4 border-t-latergator rounded-full animate-spin" />
      </div>
    </section>
  );
};

export default Verify;
