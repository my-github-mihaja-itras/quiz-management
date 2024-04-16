import { User } from "@/services/user/user.models";
import style from "./banner.component.module.css";
interface BannerProps {
  userData: User;
}

const Banner: React.FC<BannerProps> = ({ userData }) => {
  return (
    <section className={style.banner}>
      <p>
        Bonjour <span>{`${userData?.gender === "MALE" ? "M." : "Mme"}`}</span>{" "}
        {userData?.firstname}
      </p>
      <div>
        Bienvenue à l’Innovation Campus !<br />
        Notre mission est de façonner et de préparer des talents pour devenir
        des pionniers de l'innovation
      </div>
    </section>
  );
};

export default Banner;
