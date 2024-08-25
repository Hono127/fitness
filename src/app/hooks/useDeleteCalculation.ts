import { supabase } from "../lib/supabaseClient";

export const useDeleteCalculation = () => {
  const deleteCalculation = async (id: string) => {
    const { error } = await supabase
      .from('calculations')
      .delete()
      .eq('id', id);

    if (error) {
      console.log('削除に失敗しました:', error.message);
      throw new Error('削除に失敗しました');
    }
    return true
  };
  return { deleteCalculation }
};