export interface Project {
  id: string;
  title: string;
  category: string;
  problem: string;
  context: string;
  approach: string;
  technologies: string[];
  results: Record<string, string>;
  lessons: string;
  links: {
    github: string;
    demo: string;
  };
}

export const projects: Project[] = [
  {
    id: "application-manager",
    title: "Application Manager",
    category: "Business Systems",
    problem: "College students struggle to track multiple job applications, deadlines, interview stages, and follow-ups, leading to missed opportunities, disorganization, and difficulty managing the job search process.",
    context: "Built for college students who need a centralized system to manage their job application pipeline. The application needed to track application status, deadlines, company information, interview schedules, and follow-up reminders.",
    approach: "Developed a Windows desktop application using C# and .NET framework. Designed a SQL database to store application data with proper relationships. Implemented Windows Forms for intuitive UI, added features for status tracking, deadline reminders, and interview scheduling. Focused on simplicity and user experience.",
    technologies: ["C#", ".NET", "SQL Database", "Windows Forms"],
    results: {
      "Applications Tracked": "Centralized tracking system",
      "Deadline Management": "Automated reminders",
      "Status Tracking": "Multi-stage pipeline support",
      "User Experience": "Intuitive Windows interface"
    },
    lessons: "Learned the importance of database design for tracking systems—proper relationships make queries efficient. User feedback showed that deadline reminders were the most valuable feature. Next steps: add email integration for follow-ups and export functionality for resume building.",
    links: {
      github: "https://github.com/sabin901/Application_Manager",
      demo: "#"
    }
  },
  {
    id: "neural-muse",
    title: "Neural Muse Dashboard",
    category: "Data Analytics",
    problem: "Medical and research teams need intuitive dashboards to analyze EEG (electroencephalogram) data, visualize brain activity patterns, and extract meaningful insights for neurological research and diagnosis.",
    context: "Built a dashboard for analyzing EEG data from brain activity monitoring. The system needed to handle large datasets, visualize time-series data, identify patterns, and provide interactive exploration tools for researchers and medical professionals.",
    approach: "Developed a TypeScript/React application with focus on data visualization. Implemented time-series charting libraries, created interactive dashboards for EEG signal analysis, added filtering and pattern recognition features. Designed for real-time data processing and visualization.",
    technologies: ["TypeScript", "React", "Data Visualization", "EEG Analysis", "Time-Series"],
    results: {
      "Data Processing": "Real-time EEG analysis",
      "Visualization": "Interactive dashboard",
      "Pattern Recognition": "Automated signal analysis",
      "User Interface": "Intuitive research tools"
    },
    lessons: "Data visualization is critical for complex scientific data—clear charts help researchers identify patterns quickly. Performance optimization was essential for handling large EEG datasets. Next: add machine learning models for pattern classification and export functionality for research papers.",
    links: {
      github: "https://github.com/sabin901/neural-muse-dashboard",
      demo: "#"
    }
  },
  {
    id: "weather-analyzer",
    title: "Weather Analyzer",
    category: "Data Analysis",
    problem: "Organizations need to analyze historical weather patterns, identify trends, and make data-driven decisions for planning, risk management, and operational efficiency.",
    context: "Built a weather data analysis tool to process historical weather data, identify patterns, trends, and anomalies. The application needed to handle time-series data, perform statistical analysis, and provide forecasting capabilities for decision support.",
    approach: "Developed a C# application for weather data analysis. Implemented data processing algorithms for time-series analysis, created visualization components for trends, added statistical functions for pattern identification, and built forecasting models. Focused on accuracy and usability.",
    technologies: ["C#", "Data Analysis", "Time-Series", "Forecasting", "Statistical Analysis"],
    results: {
      "Data Analysis": "Historical pattern identification",
      "Trend Analysis": "Statistical trend detection",
      "Forecasting": "Weather prediction models",
      "Decision Support": "Data-driven insights"
    },
    lessons: "Time-series analysis requires careful handling of seasonality and trends. Statistical methods provide good baseline predictions. Data quality is crucial—cleaning and validation steps are essential. Next: integrate real-time weather APIs and add machine learning for improved forecasting.",
    links: {
      github: "https://github.com/sabin901/Weather_Analyzer",
      demo: "#"
    }
  },
  {
    id: "mac-service",
    title: "Mac Computer Service",
    category: "E-commerce",
    problem: "Service businesses need an online platform to manage orders, payments, customer data, and service scheduling efficiently, replacing manual processes with automated systems.",
    context: "Built an e-commerce platform for a computer service business. The system needed to handle service bookings, payment processing, customer management, inventory tracking, and order fulfillment. Required secure payment integration and user-friendly interface.",
    approach: "Developed a TypeScript/React web application with full e-commerce functionality. Implemented service booking system, integrated payment processing, created customer dashboard, built admin panel for order management, and designed database schema for scalability. Focused on user experience and business logic.",
    technologies: ["TypeScript", "React", "Payment Processing", "Database", "E-commerce"],
    results: {
      "Online Booking": "Service scheduling system",
      "Payment Integration": "Secure payment processing",
      "Customer Management": "Centralized customer data",
      "Order Management": "Automated workflow"
    },
    lessons: "E-commerce systems require careful attention to payment security and user experience. Database design impacts scalability—proper indexing is crucial. Payment integration requires thorough testing. Next: add inventory management, automated email notifications, and analytics dashboard.",
    links: {
      github: "https://github.com/sabin901/Mac-Computer-Service",
      demo: "#"
    }
  },
  {
    id: "scsu-event",
    title: "SCSU Event Recommender",
    category: "Data Analysis",
    problem: "College students struggle to discover relevant campus events, leading to low attendance and missed networking opportunities. Manual event browsing is time-consuming and inefficient.",
    context: "Built a recommendation system specifically for St. Cloud State University students to discover events based on their interests, major, and past attendance. The system needed to analyze user preferences and event data to provide personalized recommendations.",
    approach: "Developed a C# application using recommendation algorithms and data analysis techniques. Implemented collaborative filtering approach, analyzed event categories and student preferences, created user profiling system, and built recommendation engine. Focused on accuracy and user engagement.",
    technologies: ["C#", ".NET", "Data Analysis", "Recommendation Algorithms", "User Profiling"],
    results: {
      "Personalization": "Interest-based recommendations",
      "Event Discovery": "Improved event visibility",
      "User Engagement": "Increased attendance rates",
      "Data Processing": "Efficient algorithm implementation"
    },
    lessons: "Recommendation systems require good data quality and user feedback loops. Collaborative filtering works well when you have sufficient user data. Next: add machine learning models for better predictions, integrate with calendar systems, and add social features.",
    links: {
      github: "https://github.com/sabin901/SCSUEventRecommender",
      demo: "#"
    }
  },
  {
    id: "ayur",
    title: "Ayur.me - Health & Wellness Platform",
    category: "Full-Stack",
    problem: "Users lack personalized health insights and wellness tracking tools. Existing solutions are either too complex or don't provide actionable recommendations based on individual health data.",
    context: "Built a health and wellness platform that helps users understand themselves better through data analysis. The application needed to collect health data, analyze patterns, provide insights, and offer personalized wellness recommendations.",
    approach: "Developed a TypeScript/React application with health data tracking and analysis capabilities. Implemented data collection forms, created analytics dashboard, built recommendation engine, designed user-friendly interface, and integrated data visualization. Focused on privacy and user experience.",
    technologies: ["TypeScript", "React", "Data Visualization", "Health Analytics", "Personalization"],
    results: {
      "User Insights": "Personalized health analysis",
      "Data Tracking": "Comprehensive wellness metrics",
      "Recommendations": "Actionable health insights",
      "User Experience": "Intuitive interface design"
    },
    lessons: "Health applications require careful attention to data privacy and user trust. Data visualization helps users understand complex health information. Personalization improves engagement significantly. Next: add wearable device integration, expand recommendation engine, and add social features.",
    links: {
      github: "https://github.com/sabin901/Ayur.me",
      demo: "#"
    }
  },
  {
    id: "age-calc",
    title: "Age Calculator Utility",
    category: "Utility Tool",
    problem: "Users need a simple, accurate tool to calculate age, date differences, and time spans for various purposes (legal, planning, analysis). Existing calculators are often cluttered or inaccurate.",
    context: "Built a clean, focused utility application for age and date calculations. The tool needed to handle various date formats, calculate precise age differences, and provide clear, readable results.",
    approach: "Developed a C# desktop application with precise date calculation algorithms. Implemented date parsing and validation, created accurate age calculation logic, designed clean user interface, and added multiple calculation modes. Focused on accuracy and simplicity.",
    technologies: ["C#", ".NET", "Date Calculations", "Windows Forms", "Utility Development"],
    results: {
      "Accuracy": "Precise date calculations",
      "User Experience": "Simple, clean interface",
      "Functionality": "Multiple calculation modes",
      "Performance": "Fast, efficient processing"
    },
    lessons: "Utility tools benefit from simplicity and accuracy. Date calculations require careful handling of edge cases (leap years, time zones). Clean UI is crucial for utility applications. Next: add calendar integration, export functionality, and web version.",
    links: {
      github: "https://github.com/sabin901/Age_Calculator",
      demo: "#"
    }
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};
