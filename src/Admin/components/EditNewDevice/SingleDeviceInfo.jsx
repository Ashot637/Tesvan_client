import classes from "../../styles/form.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../../helpers/axios";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const SingleDeviceInfo = ({
  info,
  deviceInfoCategories,
  language,
  setInfo,
}) => {
  const onDeleteInfo = (id) => {
    if (+id < 500000) {
      if (window.confirm("Are you sure?")) {
        axios.delete("/remove-info/" + id);
        setInfo((info) => info.filter((i) => i.id !== id));
      }
    } else {
      setInfo((info) => info.filter((i) => i.id !== id));
    }
  };

  const onChangeInfo = (id, key, value) => {
    setInfo((info) =>
      info.map((i) => (i.id === id ? { ...i, [key]: value } : i))
    );
  };

  return (
    <div className={classes.info}>
      <select
        onChange={(e) =>
          onChangeInfo(info.id, "deviceInfoCategorieId", e.target.value)
        }
      >
        {!info.deviceInfoCategorieId && <option hidden>Selcect</option>}
        {deviceInfoCategories.map((c) => {
          if (info.deviceInfoCategorieId === c.id) {
            return (
              <option selected key={c.id} value={c.id}>
                {c.title_en}
              </option>
            );
          }
          return (
            <option key={c.id} value={c.id}>
              {c.title_en}
            </option>
          );
        })}
      </select>
      <div className={classes.field}>
        <label>Info title ({language})</label>
        <input
          type="text"
          value={info[`title_${language}`]}
          onChange={(e) =>
            onChangeInfo(info.id, `title_${language}`, e.target.value)
          }
        />
      </div>
      <div className={classes.field}>
        <label>Info description ({language})</label>
        <input
          type="text"
          value={info[`description_${language}`]}
          onChange={(e) =>
            onChangeInfo(info.id, `description_${language}`, e.target.value)
          }
        />
      </div>
      <FontAwesomeIcon
        onClick={() => onDeleteInfo(info.id)}
        className={classes.removeInfo}
        icon={faClose}
      />
    </div>
  );
};

export default SingleDeviceInfo;
