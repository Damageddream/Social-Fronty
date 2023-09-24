import LogoText from "./LogoText";
import Circle from "./Circle";
import '../../assets/styles/logo.css'

const Logo: React.FC = () => {
  return (
    <div className="logo">
      <Circle />
      <LogoText />
    </div>
  );
};

export default Logo;
