import styles from './TheTestBtn.module.css';

export default function TheTestBtn() {
  return (
    <div className={styles.container} data-name="The-test-btn" data-node-id="91:111">
      <div aria-hidden="true" className={styles.border} />
      <div className={styles.primaryText} data-node-id="91:110" style={{ fontVariationSettings: "'wdth' 100" }}>
        <p className={styles.primaryTextContent}>TEXT-INTERNE</p>
      </div>
      <div className={styles.secondaryText} data-node-id="91:114">
        <p className={styles.secondaryTextContent}>TEXT-2</p>
      </div>
    </div>
  );
}