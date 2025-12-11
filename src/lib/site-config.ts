/**
 * Site Configuration Loader
 * Loads site-specific customizations embedded at build time
 * This file is generated during deployment with unique values per site
 */

import { generateDesignDNA, type DesignDNA, type DesignStyle } from './design-dna'

export interface SiteConfig {
  domain: string
  siteName: string
  keyword: string
  keywordId: string  // e.g., 'free-government-phone' - used to load correct variation module
  keywordLabel: string  // e.g., 'Free Government Phone' - display name
  ownerEmail: string
  designStyle: DesignStyle  // 'basic' or 'advanced'
  designDNA?: Partial<DesignDNA>
  content?: {
    homepage?: {
      h1?: string
      description?: string
    }
  }
  environment: 'staging' | 'production'
  createdAt: string
  version: string
}

// ===== SITE CONFIG - REPLACED AT BUILD TIME =====
// DO NOT MODIFY THIS SECTION MANUALLY - IT IS AUTO-GENERATED
const SITE_CONFIG_DATA = {
  domain: "test-unique-1.com",
  siteName: "Test Unique Site 1",
  keyword: "Free Government Phone",
  keywordId: "free-government-phone",
  keywordLabel: "Free Government Phone",
  ownerEmail: "test@example.com",
  designStyle: "advanced" as DesignStyle,
  environment: "production" as const,
  createdAt: "2025-12-11T16:47:21.172Z",
  version: "1.0.0"
};
// ===== END SITE CONFIG =====

// Default configuration (fallback)
const DEFAULT_CONFIG: SiteConfig = {
  domain: 'example.com',
  siteName: 'Free Phone Service',
  keyword: 'Free Government Phone',
  keywordId: 'free-government-phone',
  keywordLabel: 'Free Government Phone',
  ownerEmail: 'admin@example.com',
  designStyle: 'basic',
  environment: 'staging',
  createdAt: new Date().toISOString(),
  version: '1.0.0'
}

let cachedConfig: SiteConfig | null = null
let cachedDesignDNA: DesignDNA | null = null

/**
 * Load site configuration
 */
export function getSiteConfig(): SiteConfig {
  if (cachedConfig) {
    return cachedConfig
  }

  // Use embedded config data
  cachedConfig = {
    domain: SITE_CONFIG_DATA.domain || DEFAULT_CONFIG.domain,
    siteName: SITE_CONFIG_DATA.siteName || DEFAULT_CONFIG.siteName,
    keyword: SITE_CONFIG_DATA.keyword || DEFAULT_CONFIG.keyword,
    keywordId: SITE_CONFIG_DATA.keywordId || DEFAULT_CONFIG.keywordId,
    keywordLabel: SITE_CONFIG_DATA.keywordLabel || DEFAULT_CONFIG.keywordLabel,
    ownerEmail: SITE_CONFIG_DATA.ownerEmail || DEFAULT_CONFIG.ownerEmail,
    designStyle: SITE_CONFIG_DATA.designStyle || DEFAULT_CONFIG.designStyle,
    designDNA: (SITE_CONFIG_DATA as any).designDNA || undefined, // Custom design from Claude
    environment: SITE_CONFIG_DATA.environment || DEFAULT_CONFIG.environment,
    createdAt: SITE_CONFIG_DATA.createdAt || DEFAULT_CONFIG.createdAt,
    version: SITE_CONFIG_DATA.version || DEFAULT_CONFIG.version
  }
  
  return cachedConfig
}

/**
 * Get the site's Design DNA
 * ALWAYS uses Claude AI colors from site-config.json (Option 1)
 * Falls back to hash-based palette ONLY if Claude colors don't exist
 */
export function getDesignDNA(): DesignDNA {
  if (cachedDesignDNA) {
    return cachedDesignDNA
  }

  const config = getSiteConfig()
  
  // If we have Claude-generated designDNA, use it directly (Option 1)
  if (config.designDNA && config.designDNA.colors) {
    const customColors = config.designDNA.colors
    const customFonts = config.designDNA.fonts
    
    cachedDesignDNA = {
      designStyle: config.designStyle,
      colors: {
        primary: customColors.primary,
        secondary: customColors.secondary,
        accent: customColors.accent,
        background: customColors.background,
        text: customColors.text,
        textOnPrimary: customColors.textOnPrimary,
      },
      gradients: {
        primary: `linear-gradient(135deg, ${customColors.primary}, ${customColors.secondary})`,
        hero: `linear-gradient(180deg, ${customColors.primary}15 0%, ${customColors.background} 100%)`,
        accent: `linear-gradient(135deg, ${customColors.accent}, ${customColors.primary})`,
      },
      fonts: customFonts ? {
        heading: customFonts.heading,
        body: customFonts.body,
      } : {
        heading: 'Inter',
        body: 'Inter'
      },
      layout: {
        heroStyle: 'centered',
        cardStyle: 'rounded',
        ctaStyle: 'pill'
      }
    }
  } else {
    // FALLBACK: Use hash-based palette only if no Claude colors exist
    cachedDesignDNA = generateDesignDNA(config.domain, config.keyword, config.designStyle)
  }
  
  return cachedDesignDNA
}

/**
 * Get design style
 */
export function getDesignStyle(): DesignStyle {
  return getSiteConfig().designStyle
}

/**
 * Get site name
 */
export function getSiteName(): string {
  return getSiteConfig().siteName
}

/**
 * Get target keyword (display version)
 */
export function getKeyword(): string {
  return getSiteConfig().keyword
}

/**
 * Get keyword ID (for loading variation modules)
 * Returns default 'free-government-phone' if not set to prevent runtime errors
 */
export function getKeywordId(): string {
  const keywordId = getSiteConfig().keywordId;
  // Always return a valid keyword ID, default to 'free-government-phone' if not set
  return keywordId || 'free-government-phone';
}

/**
 * Get keyword label (formatted display name)
 */
export function getKeywordLabel(): string {
  return getSiteConfig().keywordLabel
}

/**
 * Get domain
 */
export function getDomain(): string {
  return getSiteConfig().domain
}

/**
 * Get site URL
 */
export function getSiteURL(): string {
  return `https://${getDomain()}`
}

/**
 * Get owner email
 */
export function getOwnerEmail(): string {
  return getSiteConfig().ownerEmail
}

