import style from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={style.footer}>
      <h3>
        Created by :{" "}
        <a
          href="https://www.linkedin.com/in/cavinkumaran1257/"
          target={"_blank"}
        >
          Cavinkumaran.M
        </a>
      </h3>
    </div>
  );
};

export default Footer;
