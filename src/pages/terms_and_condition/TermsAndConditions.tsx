import styles from './TermsAndConditions.module.scss';

const TermsAndConditions = () => {
  const today = new Date().toLocaleDateString();

  return (
    <div className={styles.termsConditionsContainer}>
      <h1 className={styles.title}>Terms and Conditions</h1>
      <p className={styles.paragraph}>Effective Date: {today}</p>

      <h2 className={styles.sectionTitle}>1. Introduction</h2>
      <p className={styles.paragraph}>
        Welcome to LazyEngineer (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). These Terms and Conditions govern your use of our website{' '}
        <a href="https://lazyengineer.in" className={styles.link}>
          https://lazyengineer.in
        </a>
        {' '}and the services we provide. By accessing or using our website, you agree to comply with these terms.
      </p>

      <h2 className={styles.sectionTitle}>2. Acceptance of Terms</h2>
      <p className={styles.paragraph}>
        By using our website, you confirm that you accept these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website.
      </p>

      <h2 className={styles.sectionTitle}>3. User Accounts</h2>
      <p className={styles.paragraph}>
        To use certain features of our website, you may be required to create an account. You agree to:
      </p>
      <ul>
        <li>Provide accurate, current, and complete information during the registration process.</li>
        <li>Maintain the security of your password and accept all risks of unauthorized access to your account.</li>
      </ul>

      <h2 className={styles.sectionTitle}>4. User Responsibilities</h2>
      <p className={styles.paragraph}>You agree not to:</p>
      <ul>
        <li>Use the website for any illegal or unauthorized purpose.</li>
        <li>Post any content that is harmful, offensive, or violates the rights of any third party.</li>
        <li>Share your account login credentials with anyone else.</li>
      </ul>

      <h2 className={styles.sectionTitle}>5. Content Ownership</h2>
      <p className={styles.paragraph}>
        All content provided on the website, including text, graphics, and software, is the property of LazyEngineer or its licensors and is protected by copyright and other intellectual property laws.
      </p>

      <h2 className={styles.sectionTitle}>6. Disclaimer of Warranties</h2>
      <p className={styles.paragraph}>
        The website and its services are provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do not warrant that the website will be uninterrupted, secure, or error-free.
      </p>

      <h2 className={styles.sectionTitle}>7. Limitation of Liability</h2>
      <p className={styles.paragraph}>
        To the fullest extent permitted by law, LazyEngineer shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of the website.
      </p>

      <h2 className={styles.sectionTitle}>8. Changes to Terms</h2>
      <p className={styles.paragraph}>
        We reserve the right to modify these Terms and Conditions at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of the website after any changes constitutes acceptance of the new Terms and Conditions.
      </p>

      <h2 className={styles.sectionTitle}>9. Governing Law</h2>
      <p className={styles.paragraph}>
        These Terms and Conditions are governed by and construed in accordance with the laws of [Your Jurisdiction]. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in [Your Jurisdiction].
      </p>

      <h2 className={styles.sectionTitle}>10. Contact Information</h2>
      <p className={styles.paragraph}>
        If you have any questions about these Terms and Conditions, please contact us at <span className={styles.contactInfo}>vinayakaggarwal05@gmail.com</span>.
      </p>
    </div>
  );
};

export default TermsAndConditions;