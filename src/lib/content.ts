
import { supabase } from "@/integrations/supabase/client";
import { defaultContent } from "./defaultContent";

export interface PageContent {
  id: string;
  page_key: string;
  title: string;
  content: any;
  status: 'draft' | 'published' | 'archived';
  updated_at: string;
  updated_by: string | null;
}

/**
 * Get content for a specific page
 */
export async function getPageContent(pageKey: string): Promise<PageContent | null> {
  try {
    console.log(`Fetching content for page ${pageKey}`);
    
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .eq('page_key', pageKey)
      .maybeSingle();

    if (error) {
      console.error('Error fetching page content:', error);
      throw new Error(`Failed to fetch content: ${error.message}`);
    }

    console.log(`Content retrieved for ${pageKey}:`, data);

    // If no content is found, create default content
    if (!data && defaultContent[pageKey as keyof typeof defaultContent]) {
      console.log(`No content found for ${pageKey}, creating default content`);
      await createDefaultContent(pageKey);
      return getPageContent(pageKey);
    }

    return data;
  } catch (error) {
    console.error('Error in getPageContent:', error);
    throw error;
  }
}

/**
 * Get all pages content
 */
export async function getAllPagesContent(): Promise<PageContent[]> {
  try {
    const { data, error } = await supabase
      .from('page_content')
      .select('*')
      .order('page_key');

    if (error) {
      console.error('Error fetching all pages content:', error);
      throw new Error(`Failed to fetch all content: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error in getAllPagesContent:', error);
    throw error;
  }
}

/**
 * Update content for a specific page
 */
export async function updatePageContent(pageKey: string, content: any, status: 'draft' | 'published' | 'archived' = 'published'): Promise<boolean> {
  try {
    console.log(`Updating content for page ${pageKey}`, { content, status });
    
    // Check if content exists first
    const existing = await getPageContent(pageKey);
    
    if (!existing) {
      // If content doesn't exist, create it
      console.log(`No existing content for ${pageKey}, creating new entry`);
      return createPageContent(pageKey, content, status);
    }
    
    // If it exists, update it
    const { error } = await supabase
      .from('page_content')
      .update({ 
        content, 
        status,
        updated_at: new Date().toISOString(),
        updated_by: (await supabase.auth.getSession()).data.session?.user?.id
      })
      .eq('page_key', pageKey);

    if (error) {
      console.error('Error updating page content:', error);
      throw new Error(`Failed to update content: ${error.message}`);
    }

    console.log(`Content successfully updated for ${pageKey}`);
    return true;
  } catch (error) {
    console.error('Error in updatePageContent:', error);
    throw error;
  }
}

/**
 * Create new content for a page
 */
export async function createPageContent(pageKey: string, content: any, status: 'draft' | 'published' | 'archived' = 'published'): Promise<boolean> {
  try {
    console.log(`Creating new content for page ${pageKey}`, { content, status });
    
    const title = pageKey.charAt(0).toUpperCase() + pageKey.slice(1);

    const { error } = await supabase
      .from('page_content')
      .insert({
        page_key: pageKey,
        title: title,
        content: content || {},
        status: status,
        updated_at: new Date().toISOString(),
        updated_by: (await supabase.auth.getSession()).data.session?.user?.id
      });

    if (error) {
      console.error('Error creating page content:', error);
      throw new Error(`Failed to create content: ${error.message}`);
    }

    console.log(`Content successfully created for ${pageKey}`);
    return true;
  } catch (error) {
    console.error('Error in createPageContent:', error);
    throw error;
  }
}

/**
 * Delete content for a specific page
 */
export async function deletePageContent(pageKey: string): Promise<boolean> {
  try {
    console.log(`Deleting content for page ${pageKey}`);
    
    const { error } = await supabase
      .from('page_content')
      .delete()
      .eq('page_key', pageKey);

    if (error) {
      console.error('Error deleting page content:', error);
      throw new Error(`Failed to delete content: ${error.message}`);
    }

    console.log(`Content successfully deleted for ${pageKey}`);
    return true;
  } catch (error) {
    console.error('Error in deletePageContent:', error);
    throw error;
  }
}

/**
 * Update page content status
 */
export async function updatePageStatus(pageKey: string, status: 'draft' | 'published' | 'archived'): Promise<boolean> {
  try {
    console.log(`Updating status for page ${pageKey} to ${status}`);
    
    const { error } = await supabase
      .from('page_content')
      .update({ 
        status,
        updated_at: new Date().toISOString(),
        updated_by: (await supabase.auth.getSession()).data.session?.user?.id
      })
      .eq('page_key', pageKey);

    if (error) {
      console.error('Error updating page status:', error);
      throw new Error(`Failed to update status: ${error.message}`);
    }

    console.log(`Status successfully updated for ${pageKey} to ${status}`);
    return true;
  } catch (error) {
    console.error('Error in updatePageStatus:', error);
    throw error;
  }
}

/**
 * Create default content when a page has no content yet
 */
async function createDefaultContent(pageKey: string): Promise<boolean> {
  const contentData = defaultContent[pageKey as keyof typeof defaultContent];
  
  if (!contentData) return false;
  
  const title = pageKey.charAt(0).toUpperCase() + pageKey.slice(1);

  try {
    console.log(`Creating default content for ${pageKey}`);
    
    const { error } = await supabase
      .from('page_content')
      .insert({
        page_key: pageKey,
        title: title,
        content: contentData,
        status: 'published' as const,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error creating default content:', error);
      throw new Error(`Failed to create default content: ${error.message}`);
    }

    console.log(`Default content successfully created for ${pageKey}`);
    return true;
  } catch (error) {
    console.error('Error in createDefaultContent:', error);
    throw error;
  }
}
