import styles from './PrivacyPolicy.module.scss';

const PrivacyPolicy = () => {
  const today = new Date().toLocaleDateString();

  return (
    <div className={styles.privacyPolicyContainer}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.paragraph}>Effective Date: {today}</p>

      <h2 className={styles.sectionTitle}>1. Introduction</h2>
      <p className={styles.paragraph}>
        Welcome to LazyEngineer (&quot;we&quot;, &quot;our&quot;, &quot;us). This Privacy Policy explains how we collect, use, and protect your personal data when you visit our website{' '}
        <a href="https://lazyengineer.in" className={styles.link}>
          https://lazyengineer.in
        </a>
        . By using our website, you agree to the terms of this policy.
      </p>

      <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
      <p className={styles.paragraph}>
        We collect the following personal information from users:
      </p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Profile image</li>
        <li>About section (user description)</li>
      </ul>
      <p className={styles.paragraph}>
        This information is provided voluntarily by users and is necessary to create a profile on our website. Email and name are mandatory fields.
      </p>

      <h2 className={styles.sectionTitle}>3. Use of Data</h2>
      <p className={styles.paragraph}>
        We do not actively use or process the data collected. Users may choose to share their profiles with others, but this is done at their discretion.
      </p>

      <h2 className={styles.sectionTitle}>4. Data Sharing</h2>
      <p className={styles.paragraph}>
        We do not share your personal information with any third parties for marketing or other purposes. However, we integrate third-party login options through:
      </p>
      <ul>
        <li>Google Login</li>
        <li>Facebook Login</li>
        <li>Twitter Login</li>
      </ul>
      <p className={styles.paragraph}>
        These services may collect data as part of their authentication process.
      </p>

      <h2 className={styles.sectionTitle}>5. Cookies & Tracking</h2>
      <p className={styles.paragraph}>We do not use cookies or any other tracking technologies on our website.</p>

      <h2 className={styles.sectionTitle}>6. User Rights</h2>
      <p className={styles.paragraph}>
        Users have the following rights regarding their personal information:
      </p>
      <ul>
        <li>Access: You can access your personal information and update it through your account settings.</li>
        <li>Update: You can update your name, email, profile image, and about section at any time.</li>
        <li>Deletion: To delete your profile and personal data, please contact us via email at <span className={styles.contactInfo}>vinayakaggarwal05@gmail.com</span>.</li>
      </ul>

      <h2 className={styles.sectionTitle}>7. Data Security</h2>
      <p className={styles.paragraph}>
        We take the following measures to protect your data:
      </p>
      <ul>
        <li>Passwords are encrypted to ensure secure login.</li>
        <li>Other personal information (name, email, profile image, and about section) is not encrypted.</li>
      </ul>

      <h2 className={styles.sectionTitle}>8. Data Retention</h2>
      <p className={styles.paragraph}>
        We retain your personal data for the lifetime of your account. If you wish to delete your account, you must request deletion via email.
      </p>

      <h2 className={styles.sectionTitle}>9. Third-Party Services</h2>
      <p className={styles.paragraph}>
        Our website uses third-party services for login functionality, including Google, Facebook, and Twitter. These services may collect additional data as part of their login processes. Please review their privacy policies to understand how they handle your personal information.
      </p>

      <h2 className={styles.sectionTitle}>10. Legal Compliance</h2>
      <p className={styles.paragraph}>
        We are not currently compliant with any specific privacy regulations such as GDPR or CCPA.
      </p>

      <h2 className={styles.sectionTitle}>11. Contact Information</h2>
      <p className={styles.paragraph}>
        If you have any questions or concerns about this Privacy Policy or your personal data, please contact us at <span className={styles.contactInfo}>vinayakaggarwal05@gmail.com</span>.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
