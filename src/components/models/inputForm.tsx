export default function InputForm({ 
  name,
  type,
  placeholder,
  value,
  onChange,
  match
}: {
  name: string,
  type: string,
  placeholder: string,
  value: string,
  onChange: React.ChangeEventHandler
  match?: boolean
}) {
  return (
    <>
      <input
        className={`w-full md:w-full h-12 border-b-[3px] bg-transparent text-lg focus:border-b-2 duration-300 outline-none caret-white text-white 
          ${type === 'password' && match === false ? 'border-red-600' : 'border-white' }`
        }
        name={name}
        type={type}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
      />
    </>
  );
}
