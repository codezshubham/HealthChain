interface Props {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: any) => void;
  name?: string;
}

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}: Props) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}