import styles from "./Page.module.css";

const Page = ({ ...props }) => {
  return (
    <div className={`row ${styles["page"]} ${props.className}`}>
      <div
        className="col-xs-12
                col-sm-8"
      >
        {props.children}
      </div>
    </div>
  );
};

export default Page;
