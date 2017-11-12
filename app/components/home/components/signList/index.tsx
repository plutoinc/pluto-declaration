import * as React from "react";

import { withStyles } from "../../../../helpers/withStylesHelper";
import Icon from "../../../../icons";
const styles = require("./signList.scss");

interface ISignListComponentProps {
  signListSearchQuery: string;
  changeSignListSearchQuery: (searchQuery: string) => void;
}

@withStyles<typeof SignList>(styles)
export default class SignList extends React.PureComponent<ISignListComponentProps, {}> {
  private getPlaceHolder = () => {
    const { signListSearchQuery } = this.props;

    if (signListSearchQuery === "") {
      return (
        <div className={styles.placeHolder}>
          Search by <span className={styles.bold}>Name</span> or <span className={styles.bold}>Affiliation</span>
        </div>
      );
    }
  };
  public render() {
    const { signListSearchQuery, changeSignListSearchQuery } = this.props;

    return (
      <div className={styles.signListContainer}>
        <div className={styles.title}>
          <span className={styles.number}>828</span> People have signed
        </div>
        <div className={styles.searchBar}>
          {this.getPlaceHolder()}
          <input
            onChange={e => {
              changeSignListSearchQuery(e.currentTarget.value);
            }}
            className={`form-control ${styles.inputBox}`}
            value={signListSearchQuery}
          />
          Search!!
          <Icon className={styles.searchIconWrapper} icon="SEARCH" />
        </div>
      </div>
    );
  }
}
