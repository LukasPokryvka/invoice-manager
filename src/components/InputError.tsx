interface IProps {
  message: string;
}

const InputError: React.FunctionComponent<IProps> = ({ message }) => {
  return (
    <label className="label">
      <span className="label-text-alt text-error-content">{message}</span>
    </label>
  );
};

export default InputError;
