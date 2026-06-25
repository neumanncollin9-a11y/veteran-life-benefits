export const metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <h1>About Empire Financial</h1>

      <p>
        Empire Financial is an independent life insurance agency dedicated to
        helping individuals, families, and veterans find affordable life
        insurance coverage from top-rated insurance companies.
      </p>

      <h2>Our Mission</h2>

      <p>
        We believe every family deserves financial protection. Our licensed
        agents work with multiple insurance carriers to help find coverage that
        fits your needs and budget.
      </p>

      <h2>Why Choose Us?</h2>

      <ul>
        <li>Independent insurance agency</li>
        <li>Access to multiple insurance carriers</li>
        <li>Personalized coverage recommendations</li>
        <li>Fast and simple quote process</li>
        <li>Licensed insurance professionals</li>
      </ul>

      <h2>Contact Us</h2>

      <p>
        Empire Financial<br />
        Phone: (262) 328-7608<br />
        Email: cin679@outlook.com
      </p>

      <p>
        We look forward to helping you protect what matters most.
      </p>
    </main>
  );
}