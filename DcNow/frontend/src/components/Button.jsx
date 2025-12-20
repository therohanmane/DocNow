export default function Button({ children, onClick, className = '', ...props }) {
  return (
    <button onClick={onClick} className={"form-btn " + className} {...props}>
      {children}
    </button>
  );
}
