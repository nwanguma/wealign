interface IAddItemButtonProps {
  title: string;
  handleOnClick: () => void;
  fill?: string;
}

const AddItemButton: React.FC<IAddItemButtonProps> = ({
  title,
  handleOnClick,
  fill = "bg-blue-600 text-white hover:bg-blue-700",
}) => {
  return (
    <button
      onClick={handleOnClick}
      className={`flex items-center h-full px-3 py-2  font-medium text-sm rounded-md ${fill}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-4 h-4 mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 4v16m8-8H4"
        />
      </svg>
      <span>{title}</span>
    </button>
  );
};

export default AddItemButton;
