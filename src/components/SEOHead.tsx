import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  ogType?: 'website' | 'article';
  image?: string;
  schema?: object;
}

export function SEOHead({
  title,
  description,
  canonical,
  noindex = false,
  ogType = 'website',
  image = '/ghazi-wazir-photo.jpg',
  schema,
}: SEOHeadProps) {
  useEffect(() => {
    // 1. Page Title
    document.title = title;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Robots Tag (for noindex / nofollow)
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (noindex) {
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', 'noindex, nofollow');
    } else {
      if (!metaRobots) {
        metaRobots = document.createElement('meta');
        metaRobots.setAttribute('name', 'robots');
        document.head.appendChild(metaRobots);
      }
      metaRobots.setAttribute('content', 'index, follow');
    }

    // 4. Canonical Link
    const resolvedCanonical = canonical || (typeof window !== 'undefined' ? window.location.origin + window.location.pathname : 'https://ghaziwazir.com/');
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', resolvedCanonical);

    // 5. Open Graph Meta Tags
    const setMetaTag = (attrName: string, attrVal: string, contentVal: string) => {
      let el = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', contentVal);
    };

    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:url', resolvedCanonical);
    setMetaTag('property', 'og:site_name', 'Ghazi Wazir Executive Ecosystem');
    setMetaTag('property', 'og:image', image.startsWith('http') ? image : `https://ghaziwazir.com${image}`);

    // 6. Twitter / X Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', image.startsWith('http') ? image : `https://ghaziwazir.com${image}`);
    setMetaTag('name', 'twitter:creator', '@ghaziwazir');

    // 7. Schema.org JSON-LD Structured Data
    const defaultGraph = [
      {
        '@type': 'Person',
        '@id': 'https://ghaziwazir.com/#person',
        name: 'Ghazi Wazir',
        jobTitle: 'CEO of Bab Al-Khaleej & Back for Brand LLC',
        telephone: '+97335628353',
        email: 'ghaziwazirndm@gmail.com',
        url: 'https://ghaziwazir.com/',
        image: 'https://ghaziwazir.com/ghazi-wazir-photo.jpg',
        description: 'Business leader in Bahrain and the United States guiding enterprise company formation, investor residency, and cutting-edge Generative Engine Optimization.',
        sameAs: [
          'https://wa.me/97335628353',
          'https://linkedin.com/in/ghaziwazir',
          'https://x.com/ghaziwazir',
          'https://facebook.com/ghaziwazir',
          'https://instagram.com/ghaziwazir',
          'https://youtube.com/@ghaziwazir',
          'https://tiktok.com/@ghaziwazir',
          'https://t.me/ghaziwazir',
          'https://snapchat.com/add/ghaziwazir',
          'https://pinterest.com/ghaziwazir',
          'https://threads.net/@ghaziwazir',
          'https://medium.com/@ghaziwazir',
          'https://github.com/ghaziwazir',
          'https://maps.google.com/?cid=ghaziwazir',
          'https://fiverr.com/ghaziwazir',
          'https://upwork.com/freelancers/~ghaziwazir',
          'https://freelancer.com/u/ghaziwazir',
          'https://peopleperhour.com/freelancer/ghaziwazir',
          'https://clutch.co/profile/ghazi-wazir',
          'https://trustpilot.com/review/ghaziwazir.com'
        ],
        worksFor: [
          {
            '@type': 'Organization',
            '@id': 'https://ghaziwazir.com/#babal-khaleej',
            name: 'Bab Al-Khaleej',
            legalName: 'Bab Al-Khaleej Document Clearance & Corporate Advisory',
            description: 'Commercial registration (CR), investor visa, worker visa (LMRA), document clearance, and corporate advisory services in the Kingdom of Bahrain.',
            areaServed: {
              '@type': 'Country',
              name: 'Bahrain'
            },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Manama',
              addressCountry: 'BH'
            },
            telephone: '+97335628353',
            email: 'ghaziwazirndm@gmail.com'
          },
          {
            '@type': 'Organization',
            '@id': 'https://ghaziwazir.com/#backforbrand',
            name: 'Back for Brand LLC',
            legalName: 'Back for Brand LLC',
            description: 'Global technology consultancy specializing in SEO, Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), autonomous AI agents, and high-converting funnels.',
            areaServed: 'Worldwide',
            address: {
              '@type': 'PostalAddress',
              addressRegion: 'Florida',
              addressCountry: 'US'
            },
            email: 'ghaziwazirndm@gmail.com'
          }
        ]
      },
      {
        '@type': 'WebSite',
        '@id': 'https://ghaziwazir.com/#website',
        url: 'https://ghaziwazir.com/',
        name: 'Ghazi Wazir Executive Ecosystem',
        description: 'Personal brand, corporate establishment in Bahrain (Bab Al-Khaleej), and global technology acceleration (Back for Brand LLC).',
        publisher: {
          '@id': 'https://ghaziwazir.com/#person'
        }
      }
    ];

    let finalSchema: any = {
      '@context': 'https://schema.org',
      '@graph': defaultGraph
    };

    if (schema) {
      if ((schema as any)['@graph']) {
        finalSchema['@graph'] = [...defaultGraph, ...(schema as any)['@graph']];
      } else {
        finalSchema['@graph'].push(schema);
      }
    }

    let scriptTag = document.querySelector('script[type="application/ld+json"]#seo-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('id', 'seo-jsonld');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(finalSchema);
  }, [title, description, canonical, noindex, ogType, image, schema]);

  return null;
}
