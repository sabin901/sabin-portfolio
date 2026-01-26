import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const markdown = `# About.md

## Professional Profile

Hybrid Information Systems & Finance professional with **3+ years of experience** designing and implementing data-driven systems, analytics solutions, and workflow automations across academic, nonprofit, and operational environments.

Strong foundation in software development, database engineering, and cloud infrastructure, combined with practical fluency in financial modeling, risk analysis, and KPI-driven performance measurement.

Proven ability to translate complex data into actionable insights, streamline operations through automation, and deliver **measurable efficiency improvements**.

---

## Core Competencies

### Technical Execution
- **Programming**: Python, JavaScript/TypeScript, C#, Java, SQL
- **Web & Application Development**: React, HTML5, CSS3, FastAPI, .NET
- **Cloud & DevOps**: AWS, Docker, Git, CI/CD fundamentals (Jenkins)
- **Data Engineering**: ETL pipelines, relational database design, REST APIs, automation scripting
- **Analytics & ML Tools**: Pandas, NumPy, Plotly, Tableau, TensorFlow (foundational)

### Finance & Business Acumen
- **Financial Analysis**: DCF valuation, forecasting, scenario analysis, budgeting
- **Business Intelligence**: KPI design, dashboard development, variance analysis
- **Systems & Compliance**: ERP concepts (SAP), GAAP fundamentals, data security & audit readiness
- **Process Optimization**: ROI analysis, cost–benefit evaluation, workflow automation, digital transformation initiatives

---

## Professional Experience

### Library Operations Supervisor
**St. Cloud State University Library** | Jul 2023 – Present

- Led digital scheduling system redesign, reducing conflicts by **40%**
- Built Python/Excel automation tools, reducing manual effort by **30%**
- Partnered with IT stakeholders to integrate systems while maintaining security & compliance
- Supervised 8+ student employees, improving onboarding efficiency

### Academic Success Mentor
**St. Cloud State University** | May 2022 – Present

- Developed interactive learning tools, improving comprehension by **~35%**
- Mentored **50+ students** in STEM courses, achieving average **1.2 letter-grade improvement**
- Created personalized study plans and progress assessments

### Donor Ambassador
**American Red Cross** | Jun 2021 – Dec 2021

- Supported data-driven campaigns, increasing participation by **25%**
- Contributed UX feedback during pilot donor management system rollout
- Applied analytics to refine strategies, increasing ROI by **20%**

---

## Target Roles

- Business Analyst
- Data / Analytics Intern
- Systems Analyst
- FinTech / Cloud Intern
- Junior Data Engineer

---

## Education

**Bachelor of Science - Dual Degree**  
Information Systems + Finance  
St. Cloud State University | 2024

Graduating with unique combination of technical execution and financial expertise.`;

export const AboutFile = () => {
  return (
    <SyntaxHighlighter
      language="markdown"
      style={vscDarkPlus}
      customStyle={{
        margin: 0,
        padding: '1rem',
        background: '#1e1e1e',
        fontSize: '14px',
        lineHeight: '1.6'
      }}
      showLineNumbers
    >
      {markdown}
    </SyntaxHighlighter>
  );
};
