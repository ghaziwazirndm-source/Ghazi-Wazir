import { useEffect } from 'react';

export interface SEOBreadcrumb {
  name: string;
  item: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
  ogType?: 'website' | 'article';
  image?: string;
  lang?: 'en' | 'ar';
  alternateEn?: string;
  alternateAr?: string;
  breadcrumbs?: SEOBreadcrumb[];
  schema?: object;
}

const CANONICAL_HOST = 'https://ghaziwazir.com';

function toCanonicalUrl(pathOrUrl?: string): string {
  if (pathOrUrl) {
    if (pathOrUrl.startsWith('http')) {
      return pathOrUrl.replace('https://ghazi-wazir.vercel.app', CANONICAL_HOST);
    }
    const clean = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
    return `${CANONICAL_HOST}${clean}`;
  }
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname === '/' ? '/' : window.location.pathname.replace(/\/+$/, '');
    return `${CANONICAL_HOST}${pathname}`;
  }
  return `${CANONICAL_HOST}/`;
}

export function SEOHead({
  title,
  description,
  canonical,
  noindex = false,
  ogType = 'website',
  image = '/ghazi-wazir-photo.jpg',
  lang = 'en',
  alternateEn,
  alternateAr,
  breadcrumbs,
  schema,
}: SEOHeadProps) {
  useEffect(() => {
    const resolvedCanonical = toCanonicalUrl(canonical);
    const absoluteImage = image.startsWith('http') ? image : `${CANONICAL_HOST}${image.startsWith('/') ? image : `/${image}`}`;

    // 0. Sync HTML lang & dir attributes cleanly
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

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

    // 3. Robots Tag
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');

    // 4. Strictly Locked Canonical Link (Always https://ghaziwazir.com)
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', resolvedCanonical);

    // 4b. Hreflang Alternates
    const upsertHreflang = (hreflangVal: string, hrefVal: string) => {
      let el = document.querySelector(`link[rel="alternate"][hreflang="${hreflangVal}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'alternate');
        el.setAttribute('hreflang', hreflangVal);
        document.head.appendChild(el);
      }
      el.setAttribute('href', hrefVal);
    };
    const enUrl = toCanonicalUrl(alternateEn || (lang === 'ar' ? '/' : resolvedCanonical));
    const arUrl = toCanonicalUrl(alternateAr || '/ar');
    upsertHreflang('en', enUrl);
    upsertHreflang('ar', arUrl);
    upsertHreflang('x-default', enUrl);

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
    setMetaTag('property', 'og:site_name', 'Ghazi Wazir');
    setMetaTag('property', 'og:locale', lang === 'ar' ? 'ar_BH' : 'en_US');
    setMetaTag('property', 'og:locale:alternate', lang === 'ar' ? 'en_US' : 'ar_BH');
    setMetaTag('property', 'og:image', absoluteImage);
    setMetaTag('property', 'og:image:alt', 'Ghazi Wazir, CEO of Bab Al-Khaleej and Back for Brand LLC');

    // 6. Twitter / X Cards
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:url', resolvedCanonical);
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', absoluteImage);
    setMetaTag('name', 'twitter:creator', '@ghaziwazir');

    // 7. Schema.org JSON-LD Structured Data
    const breadcrumbItems = breadcrumbs && breadcrumbs.length > 0
      ? breadcrumbs.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: b.name,
          item: toCanonicalUrl(b.item),
        }))
      : [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${CANONICAL_HOST}/` },
          ...(resolvedCanonical !== `${CANONICAL_HOST}/`
            ? [{ '@type': 'ListItem', position: 2, name: title.split('|')[0].trim(), item: resolvedCanonical }]
            : []),
        ];

    const defaultGraph: Record<string, unknown>[] = [
      {
        '@type': 'Person',
        '@id': `${CANONICAL_HOST}/#person`,
        name: 'Ghazi Wazir',
        jobTitle: 'Chief Executive Officer',
        telephone: '+97334398754',
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            telephone: '+97334398754',
            url: `${CANONICAL_HOST}/contact`,
          },
          {
            '@type': 'ContactPoint',
            contactType: 'WhatsApp direct',
            telephone: '+97335628353',
            url: 'https://wa.me/97335628353',
          },
        ],
        url: `${CANONICAL_HOST}/`,
        image: `${CANONICAL_HOST}/ghazi-wazir-photo.jpg`,
        description:
          'CEO of Bab Al-Khaleej (Bahrain corporate formation & investor residency) and Back for Brand LLC (GEO, AEO, SEO, and AI automation).',
        sameAs: [
          'https://wa.me/97335628353',
          'https://linkedin.com/in/ghaziwazir',
          'https://x.com/ghaziwazir',
          'https://instagram.com/ghaziwazir',
          'https://youtube.com/@ghaziwazir',
          'https://github.com/ghaziwazir',
        ],
        worksFor: [
          { '@id': `${CANONICAL_HOST}/#babal-khaleej` },
          { '@id': `${CANONICAL_HOST}/#backforbrand` },
        ],
      },
      {
        '@type': ['ProfessionalService', 'LocalBusiness'],
        '@id': `${CANONICAL_HOST}/#babal-khaleej`,
        name: 'Bab Al-Khaleej',
        legalName: 'Bab Al-Khaleej Document Clearance & Corporate Advisory',
        description:
          'Private corporate services consultancy in Manama, Bahrain assisting with Sijilat Commercial Registration (CR), NPRA investor visas, LMRA work permits, and document attestation.',
        image: `${CANONICAL_HOST}/ghazi-wazir-photo.jpg`,
        areaServed: {
          '@type': 'Country',
          name: 'Bahrain',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'The Collective Hub, Yateem Center',
          addressLocality: 'Manama',
          addressCountry: 'BH',
        },
        telephone: '+97334398754',
        url: `${CANONICAL_HOST}/services/business-registration`,
      },
      {
        '@type': 'Organization',
        '@id': `${CANONICAL_HOST}/#backforbrand`,
        name: 'Back for Brand LLC',
        legalName: 'Back for Brand LLC',
        description:
          'Florida-based agency delivering Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), technical SEO, autonomous AI agents, and conversion funnels worldwide.',
        areaServed: 'Worldwide',
        address: {
          '@type': 'PostalAddress',
          addressRegion: 'Florida',
          addressCountry: 'US',
        },
        url: `${CANONICAL_HOST}/services/geo-aeo`,
      },
      {
        '@type': 'WebSite',
        '@id': `${CANONICAL_HOST}/#website`,
        url: `${CANONICAL_HOST}/`,
        name: 'Ghazi Wazir',
        inLanguage: ['en', 'ar'],
        publisher: {
          '@id': `${CANONICAL_HOST}/#person`,
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: `${CANONICAL_HOST}/#top-20-problems?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${resolvedCanonical}#breadcrumbs`,
        itemListElement: breadcrumbItems,
      },
    ];

    const finalSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@graph': [...defaultGraph],
    };

    if (schema) {
      if (Array.isArray((schema as { '@graph'?: unknown[] })['@graph'])) {
        (finalSchema['@graph'] as unknown[]).push(...((schema as { '@graph': unknown[] })['@graph']));
      } else {
        (finalSchema['@graph'] as unknown[]).push(schema);
      }
    }

    const staticScript = document.getElementById('static-seo-jsonld');
    if (staticScript) staticScript.remove();

    let scriptTag = document.querySelector('script[type="application/ld+json"]#seo-jsonld');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      scriptTag.setAttribute('id', 'seo-jsonld');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(finalSchema);
  }, [title, description, canonical, noindex, ogType, image, lang, alternateEn, alternateAr, breadcrumbs, schema]);

  return null;
}
