"use client";

import { toast } from "sonner";

const ContactButton = () => {
  const handleClick = () => {
    toast.success("Message sent successfully!");
  };

  return <div onClick={handleClick}>Send message</div>;
};

export default ContactButton;
