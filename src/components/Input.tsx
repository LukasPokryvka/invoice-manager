import InputError from "./InputError";

interface IProps {
  register: any;
  name: string;
  label: string;
  width?: string;
  inputWidth?: string;
  errors?: any;
}

const Input: React.FunctionComponent<IProps> = ({
  register,
  name,
  label,
  width = "w-full",
  inputWidth = "max-w-xl",
  errors,
}) => {
  return (
    <div className={`form-control ${width}`}>
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        type="text"
        className={`input input-bordered input-info w-full ${inputWidth}`}
        {...register(name)}
      />
      {errors[name] && <InputError message={errors[name].message} />}
    </div>
  );
};

export default Input;
