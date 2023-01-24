import { useState, useEffect } from "react";

interface IContentProps {
  label: string;
  value: string;
  readonly?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  style?: string;
  maxLength?: number;
}

const Content: React.FC<IContentProps> = ({
  label,
  value,
  readonly = false,
  style,
  onChange,
  maxLength
}) => {
  const [wordCount, setWordCount] = useState<number>(0);
  const baseTextArea =
    "h-[400px] px-3 py-2 text-base w-full text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline";

  useEffect(() => {
    if (!value) return;
    const words = value.match(/\b\w+\b/g);
    setWordCount(words ? words.length : 0);
  }, [value]);

  return (
    <div className="grow font-bold text-black">
      <div className="flex w-full justify-between">
        <label className="mb-1 block" htmlFor="article">
          {label}
        </label>
        {wordCount > 0 && (
          <span className="text-white">Word Count: {wordCount}</span>
        )}
      </div>
      <textarea
        value={value}
        className={`${baseTextArea} ${readonly ? style : "bg-slate-100"}`}
        onChange={(e) => onChange(e)}
        maxLength={maxLength ? maxLength : 3000}
        readOnly={readonly}
      />
    </div>
  );
};

export default Content;
