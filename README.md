# Elite Sports Car Showcase

![App Preview](https://imgix.cosmicjs.com/8b55d880-a045-11ed-81f2-f50e185dd248-T7K4aEPoGGk.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A sophisticated Next.js web application that showcases luxury sports cars from your dealership network. Built with modern design principles and powered by Cosmic CMS for dynamic content management.

## ✨ Features

- 🏎️ **Dynamic Vehicle Showcase** - Browse luxury sports cars with detailed specifications and high-resolution galleries
- 🏢 **Dealership Directory** - Explore premium dealership locations with contact information and specializations  
- 🏷️ **Brand Heritage** - Discover the history and legacy of iconic automotive brands
- 🔍 **Advanced Filtering** - Filter vehicles by brand, price range, condition, and availability
- 📱 **Responsive Design** - Optimized experience across all devices and screen sizes
- ⚡ **Performance Optimized** - Built with Next.js 15 for lightning-fast loading
- 🎨 **Modern UI/UX** - Sleek design with smooth animations and premium aesthetics
- 📊 **Real-time Content** - Dynamic updates from your Cosmic CMS bucket

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=689e5af27cb9d94e812bc49b&clone_repository=689e5e7c7cb9d94e812bc4bb)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a sports car dealership"

### Code Generation Prompt  

> "Build a Next.js website that uses my existing objects in this bucket. Use a modern style and design."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Cosmic CMS
- **Image Optimization**: Imgix
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up your environment variables (see Environment Variables section below)

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

## 🌐 Cosmic SDK Examples

```typescript
// Fetch all available cars with brand and dealership details
const cars = await cosmic.objects
  .find({ type: 'cars', 'metadata.available': true })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get specific car by slug with full relationship data  
const car = await cosmic.objects
  .findOne({ type: 'cars', slug: carSlug })
  .depth(1)

// Fetch dealerships with their specialized brands
const dealerships = await cosmic.objects
  .find({ type: 'dealerships' })
  .props(['id', 'title', 'slug', 'metadata'])  
  .depth(1)
```

## 🎨 Cosmic CMS Integration

This application leverages three main content types from your Cosmic bucket:

- **Cars**: Vehicle listings with specifications, images, pricing, and availability
- **Brands**: Automotive brand information with logos, descriptions, and heritage
- **Dealerships**: Location details with contact info, hours, and brand specializations

All content is dynamically rendered with proper TypeScript interfaces and comprehensive error handling.

## 🚀 Deployment Options

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git)

1. Connect your repository to Vercel
2. Add environment variables in your Vercel dashboard
3. Deploy automatically on every push

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Connect your repository to Netlify  
2. Set build command: `bun run build`
3. Set publish directory: `.next`
4. Add environment variables in Netlify dashboard

### Environment Variables

Set these environment variables in your hosting platform:

- `COSMIC_BUCKET_SLUG`: Your Cosmic bucket slug
- `COSMIC_READ_KEY`: Your Cosmic read key  
- `COSMIC_WRITE_KEY`: Your Cosmic write key (if using write operations)

<!-- README_END -->