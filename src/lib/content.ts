
import { supabase } from "@/integrations/supabase/client";
import { defaultContent } from "./defaultContent";

export interface PageContent {
  id: string;
  page_key: string;
  title: string;
  content: any;
  updated_at: string;
  updated_by: string | null;
}

export async function getPageContent(pageKey: string): Promise<PageContent | null> {
  const { data, error } = await supabase
    .from('page_content')
    .select('*')
    .eq('page_key', pageKey)
    .maybeSingle();

  if (error) {
    console.error('Error fetching page content:', error);
    return null;
  }

  // If no content is found, create default content
  if (!data && defaultContent[pageKey as keyof typeof defaultContent]) {
    await createDefaultContent(pageKey);
    return getPageContent(pageKey);
  }

  return data;
}

export async function updatePageContent(pageKey: string, content: any): Promise<boolean> {
  const { error } = await supabase
    .from('page_content')
    .update({ 
      content, 
      updated_at: new Date().toISOString(),
      updated_by: (await supabase.auth.getSession()).data.session?.user?.id
    })
    .eq('page_key', pageKey);

  if (error) {
    console.error('Error updating page content:', error);
    return false;
  }

  return true;
}

async function createDefaultContent(pageKey: string): Promise<boolean> {
  const contentData = defaultContent[pageKey as keyof typeof defaultContent];
  
  if (!contentData) return false;
  
  const title = pageKey.charAt(0).toUpperCase() + pageKey.slice(1);

  const { error } = await supabase
    .from('page_content')
    .insert({
      page_key: pageKey,
      title: title,
      content: contentData,
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.error('Error creating default content:', error);
    return false;
  }

  return true;
}
