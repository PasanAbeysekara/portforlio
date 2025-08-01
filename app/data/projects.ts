export interface Project {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
  content: {
    readme: string;
    demo: string;
    architecture: string;
    challenges: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'ecommerce-platform-api',
    name: 'ecommerce-platform-api',
    description: 'A scalable REST API for a modern e-commerce platform.',
    tags: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    demoUrl: '#',
    repoUrl: '#',
    content: {
      readme: `
# E-Commerce Platform API
This project is a robust, scalable, and secure RESTful API designed to power a modern e-commerce application. It handles everything from user authentication to order processing.
## Tech Stack
* **Backend:** Python, Django REST Framework
* **Database:** PostgreSQL
* **Authentication:** JWT (JSON Web Tokens)
* **Deployment:** Docker, Nginx
## Features
* User registration and authentication
* Product catalog management
* Shopping cart and checkout functionality
* Order history and tracking
\`\`\`python
# Example API endpoint
def get_all_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
\`\`\`
      `,
      demo: '<!-- CUSTOMIZE: Embed a GIF or video here --> <img src="https://via.placeholder.com/600x400.gif?text=Project+Demo+GIF" alt="Project Demo">',
      architecture: '## System Architecture\n\nThe system is built on a microservices-inspired architecture, with services for users, products, and orders. Docker containers ensure consistent environments from development to production.',
      challenges: '## Challenges & Solutions\n\nOne major challenge was optimizing database queries for the product filtering system. This was solved by implementing advanced indexing strategies and using Django\'s \`select_related\` and \`prefetch_related\` to minimize database hits.',
    },
  },
  {
    slug: 'data-visualization-dashboard',
    name: 'data-viz-dashboard',
    description: 'Interactive dashboard for visualizing complex datasets with D3.js.',
    tags: ['React', 'D3.js', 'Node.js', 'TypeScript'],
    demoUrl: '#',
    repoUrl: '#',
    content: {
        readme: '# Data Visualization Dashboard\n\nThis dashboard uses React for the UI and D3.js for powerful, interactive charting. A Node.js backend serves the data via a simple API.',
        demo: '<img src="https://via.placeholder.com/600x400.gif?text=Data+Viz+Demo" alt="Project 2 Demo">',
        architecture: '## Architecture\n\nA standard client-server model. The React front-end is a Single Page Application that fetches data from a lightweight Node.js/Express.js API.',
        challenges: '## Challenges\n\nPerformance with large datasets was a key concern. We implemented data aggregation on the backend and virtualized rendering on the front-end to ensure a smooth user experience.',
    },
  },
  // Add more projects here following the same structure
];

export const yourUsername = 'your-username'; // CUSTOMIZE
export const yourEmail = 'you@example.com'; // CUSTOMIZE
export const yourName = 'Your Name'; // CUSTOMIZE
export const yourBio = 'Full-Stack Developer | Crafting Scalable Solutions with Python & React'; // CUSTOMIZE
export const yourLocation = 'San Francisco, CA'; // CUSTOMIZE
export const yourBlogUrl = 'https://your-blog.com'; // CUSTOMIZE
export const yourLinkedInHandle = '/in/your-profile'; // CUSTOMIZE
export const yourLinkedInUrl = `https://linkedin.com${yourLinkedInHandle}`; // CUSTOMIZE