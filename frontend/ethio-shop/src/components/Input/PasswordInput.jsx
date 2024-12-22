import React, { useState } from "react";
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6"
const PasswordInput = ({ value, onChange, placeholder }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleIshowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };
  return (
    <div>
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder={placeholder || "password"}
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
      />
      {isShowPassword ? (
        <FaRegEye
          size={22}
          className="text-primary cursor-pointer"
          onClick={() => toggleIshowPassword()}
        />
      ) : (
        <FaRegEyeSlash size={22} className="text-slate-700 cursor-pointer" />
      )}
    </div>
  );
};

export default PasswordInput;
