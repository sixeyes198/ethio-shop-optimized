import { getInitaials } from "../../utils/helper";

const ProfileInfo = ({ userInfo, onLogout }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-yellow-200">
        {getInitaials(userInfo?.fullName)}
      </div>
      <div>
        <p className="text-xs font-medium">{userInfo?.fullName}</p>
        <button
          className="text-sm text-secondary underline hover:text-amber-900"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
