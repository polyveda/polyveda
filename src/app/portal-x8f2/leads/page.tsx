import dbConnect from '@/lib/mongoose';
import { Enquiry } from '@/models/Enquiry';
import { Metadata } from 'next';
import styles from './Admin.module.css';

// Ensure this page is NEVER indexed by search engines
export const metadata: Metadata = {
  title: 'Internal Admin | Polyveda Leads',
  robots: {
    index: false,
    follow: false,
  },
};

// Next.js Server Component ensures this runs securely on the server
export default async function SecretLeadsPanel() {
  await dbConnect();
  
  // Fetch all leads, newest first
  // Lean is used for plain JS objects in Server Components
  const leads = await Enquiry.find().sort({ createdAt: -1 }).lean() as any[];

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <h1>Internal Leads Dashboard</h1>
        <p>DO NOT SHARE THIS URL. This page is strictly for internal sales tracking.</p>
      </header>

      <main className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Company</th>
              <th>Contact</th>
              <th>Industry</th>
              <th>Details</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className={styles.emptyState}>No enquiries received yet.</td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead._id.toString()}>
                  <td className={styles.dateCell}>
                    {new Date(lead.createdAt).toLocaleDateString()} <br/>
                    <span className={styles.time}>{new Date(lead.createdAt).toLocaleTimeString()}</span>
                  </td>
                  <td>{lead.fullName}</td>
                  <td className={styles.companyCell}>{lead.companyName}</td>
                  <td>
                    <a href={`mailto:${lead.email}`}>{lead.email}</a> <br/>
                    <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                  </td>
                  <td><span className={styles.badge}>{lead.industry}</span></td>
                  <td className={styles.detailsCell}>
                    <details className={styles.expandableDetails}>
                      <summary>View Details</summary>
                      <div className={styles.detailsContent}>{lead.projectDetails}</div>
                    </details>
                  </td>
                  <td><span className={styles.sourceBadge}>{lead.source}</span></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
