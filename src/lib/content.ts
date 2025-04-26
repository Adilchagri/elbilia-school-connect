
import { supabase } from "@/integrations/supabase/client";

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
    .single();

  if (error) {
    console.error('Error fetching page content:', error);
    return null;
  }

  return data;
}

export async function updatePageContent(pageKey: string, content: any): Promise<boolean> {
  const { error } = await supabase
    .from('page_content')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('page_key', pageKey);

  if (error) {
    console.error('Error updating page content:', error);
    return false;
  }

  return true;
}
