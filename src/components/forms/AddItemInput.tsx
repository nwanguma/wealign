import Image from "next/image";
import Input from "./Input";

interface IAddItemInput {
  item?: any;
  items?: any;
  setItem?: any;
  setItems?: any;
  label: string;
}

const AddItemInput: React.FC<IAddItemInput> = ({
  label,
  item,
  items,
  setItem,
  setItems,
}) => {
  return (
    <div className="w-full">
      <div>
        <div className="flex space-x-2 items-end">
          <div className="flex-1">
            <div className="w-full">
              <Input
                label={label}
                name=""
                type=""
                onChange={(e) => {
                  setItem(e.target.value);
                }}
                required
              />
            </div>
          </div>
          <p
            className="mb-1 cursor-pointer h-10 px-3 flex items-center text-xs rounded bg-gray-600 text-white"
            onClick={() => setItems((prev: any) => [...prev, item])}
          >
            Add
          </p>
        </div>
        <div className="flex gap-1 flex-wrap">
          {items &&
            items.map((tag: any, index: any) => {
              return (
                <div
                  key={index}
                  className="py-2 px-3 text-xs bg-primary rounded-2xl flex items-center justify-center space-x-2"
                  onClick={() =>
                    setItems((prev: any) =>
                      prev.filter((item: any) => item === tag)
                    )
                  }
                >
                  <span className="">{tag}</span>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      setItems((prev: any) =>
                        prev.filter((c: any) => item !== c)
                      );
                    }}
                  >
                    <Image
                      width={10}
                      height={10}
                      src="/images/icons/cross.svg"
                      alt=""
                    />
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AddItemInput;
