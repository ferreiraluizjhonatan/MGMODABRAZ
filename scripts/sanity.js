// Sanity.io configuration and helpers
// Replace with your project ID once you create a project on sanity.io
export const SANITY_CONFIG = {
  projectId: 'YOUR_SANITY_PROJECT_ID',
  dataset: 'production',
  apiVersion: '2023-08-01',
  useCdn: true,
};

/**
 * Converts a Sanity image reference to a public CDN URL.
 * Supports standard format: image-assetId-widthxheight-ext
 */
export function urlFor(source) {
  if (!source || !source.asset || !source.asset._ref) return '';
  
  const ref = source.asset._ref;
  const parts = ref.split('-');
  
  if (parts.length < 4) return '';
  
  const assetId = parts[1];
  const dimensions = parts[2];
  const extension = parts[3];
  
  return `https://cdn.sanity.io/images/${SANITY_CONFIG.projectId}/${SANITY_CONFIG.dataset}/${assetId}-${dimensions}.${extension}`;
}

/**
 * Check if Sanity is configured
 */
export function isSanityConfigured() {
  return SANITY_CONFIG.projectId && SANITY_CONFIG.projectId !== 'YOUR_SANITY_PROJECT_ID';
}

/**
 * Fetches data from Sanity CDN API
 */
async function fetchFromSanity(query) {
  if (!isSanityConfigured()) {
    return null;
  }
  
  const encodedQuery = encodeURIComponent(query);
  const url = `https://${SANITY_CONFIG.projectId}.apicdn.sanity.io/v${SANITY_CONFIG.apiVersion}/data/query/${SANITY_CONFIG.dataset}?query=${encodedQuery}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Sanity API error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    return null;
  }
}

/**
 * Fetch Hero Banner content
 */
export async function fetchHeroData() {
  const query = `*[_type == "hero"][0] {
    badge,
    title,
    description,
    image
  }`;
  return await fetchFromSanity(query);
}

/**
 * Fetch all products
 */
export async function fetchProductsData() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    category,
    price,
    image,
    isNew,
    whatsappMessage
  }`;
  return await fetchFromSanity(query);
}
