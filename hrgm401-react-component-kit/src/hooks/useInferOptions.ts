/**
 * @file src/hooks/useInferOptions.ts
 * @description 入力値に基づいてオプションのリストから候補を推測（フィルタリング）するカスタムフック。
 */
import { useState, useMemo } from 'react';

/**
 * オプションを推測するカスタムフック
 * @param allOptions - 検索対象となるすべてのオプションの配列
 * @returns フィルタリングされたオプションと、それを更新するための関数
 */
export const useInferOptions = (allOptions: readonly string[]) => {
  const [inputValue, setInputValue] = useState('');

  // 入力値に基づいてオプションをフィルタリングする
  // useMemoを使用して、inputValueかallOptionsが変更された場合のみ再計算する
  const filteredOptions = useMemo(() => {
    if (!inputValue) {
      return allOptions; // 入力がない場合は候補をすべて表示
    }
    const lowercasedInput = inputValue.toLowerCase();
    return allOptions.filter(option =>
      option.toLowerCase().includes(lowercasedInput)
    );
  }, [inputValue, allOptions]);

  return {
    inputValue,
    setInputValue,
    filteredOptions,
  };
};
