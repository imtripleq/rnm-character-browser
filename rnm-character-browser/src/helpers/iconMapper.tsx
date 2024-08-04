import {
  GiAnimalSkull,
  GiDeadHead,
  GiHealthNormal,
  GiFrankensteinCreature,
  GiPlanetConquest,
  GiRobotGrab,
} from "react-icons/gi";
import { FaPoop, FaSkullCrossbones, FaCircleQuestion } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { SiAlienware } from "react-icons/si";
import { FaHeartbeat, FaUserAlt } from "react-icons/fa";

export const getSpeciesIcon = (species: any) => {
  switch (species?.toLowerCase()) {
    case "alien":
      return <SiAlienware />;
    case "animal":
      return <GiAnimalSkull />;
    case "cronenberg":
      return <GiDeadHead />;
    case "disease":
      return <GiHealthNormal />;
    case "human":
      return <IoPersonSharp />;
    case "humanoid":
      return <FaUserAlt />;
    case "mythological creature":
      return <GiFrankensteinCreature />;
    case "planet":
      return <GiPlanetConquest />;
    case "poopybutthole":
      return <FaPoop />;
    case "robot":
      return <GiRobotGrab />;
    case "unknown":
      return <FaCircleQuestion />;
    default:
      return <FaUserAlt />;
  }
};

export const getStatusIcon = (status: any) => {
  switch (status?.toLowerCase()) {
    case "alive":
      return <GiHealthNormal />;
    case "dead":
      return <FaSkullCrossbones />;
    case "unknown":
      return <FaCircleQuestion />;
    default:
      return <FaHeartbeat />;
  }
};
