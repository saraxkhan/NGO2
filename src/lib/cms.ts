/**
 * CMS Adapter for Utkrast Foundation
 * Provides a unified interface for fetching data from future CMS (Sanity, Strapi, etc.)
 * Fallbacks to local data if CMS is not configured.
 */

export interface Program {
    title: string;
    description: string;
    image: string;
    slug: string;
}

export const getPrograms = async (): Promise<Program[]> => {
    // Check if CMS is configured (example env vars)
    const cmsUrl = import.meta.env.VITE_CMS_URL;
    const cmsApiKey = import.meta.env.VITE_CMS_API_KEY;

    if (cmsUrl && cmsApiKey) {
        try {
            // Future implementation for Sanity/Strapi
            // const response = await fetch(`${cmsUrl}/programs`, {
            //   headers: { Authorization: `Bearer ${cmsApiKey}` },
            // });
            // return await response.json();
        } catch (error) {
            console.error("Failed to fetch from CMS, falling back to local data:", error);
        }
    }

    // Fallback to local data (mocking the structure)
    return [
        {
            title: "Women's Skill Development",
            description: "Empowering women through tailoring and digital literacy.",
            image: "/assets/program-skills.jpg",
            slug: "skill-development",
        },
        // ... add other programs
    ];
};

export const getProgramBySlug = async (slug: string): Promise<Program | null> => {
    const programs = await getPrograms();
    return programs.find((p) => p.slug === slug) || null;
};
