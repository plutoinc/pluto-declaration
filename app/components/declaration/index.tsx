import * as React from "react";

import { withStyles } from "../../helpers/withStylesHelper";
import Icon from "../../icons/index";
const styles = require("./declaration.scss");

interface IDeclarationComponentProps {}

@withStyles<typeof Declaration>(styles)
export default class Declaration extends React.PureComponent<IDeclarationComponentProps, {}> {
  public render() {
    return (
      <div className={styles.declarationContainer}>
        <div className={styles.background} />
        <div className={styles.innerContainer}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>The Future of Scholarly Communication</div>
            <div className={styles.rightBox}>
              <Icon className={styles.rightItem} icon="TWITTER" />
              <Icon className={styles.rightItem} icon="FACEBOOK" />
              <Icon className={styles.rightItem} icon="SHARE" />
            </div>
          </div>
          <div className={styles.declarationBox}>
            <div className={styles.title}>DECLARATION</div>
            <div className={styles.seperatorLine} />
            <div className={styles.upperContent}>
              <span className={styles.upperCase}>A</span>cademics have protested against Elsevier's business practices
              for years with little effect. These are some of their objections:
            </div>
            <div className={styles.lowerContent}>
              1. They charge exorbitantly high prices for subscriptions to individual journals. 2. In the light of these
              high prices, the only realistic option for many libraries is to agree to buy very large "bundles", which
              will include many journals that those libraries do not actually want. Elsevier thus makes huge profits by
              exploiting the fact that some of their journals are essential. 3. They support measures such as SOPA, PIPA
              and the Research Works Act, that aim to restrict the free exchange of information. The key to all these
              issues is the right of authors to achieve easily-accessible distribution of their work. If you would like
              to declare publicly that you will not support any Elsevier journal unless they radically change how they
              operate, then you can do so by filling in your details on this page.
            </div>
            <div className={styles.buttons}>
              <button className={styles.readMore}>Read More</button>
              <button className={styles.purpose}>Purpose</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
