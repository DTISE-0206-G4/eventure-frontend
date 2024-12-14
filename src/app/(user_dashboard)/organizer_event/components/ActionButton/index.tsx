import { FC, MouseEvent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';



interface IActionButton {
  
  label: string;
  className?: string;
  icon?: IconDefinition;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

const ActionButton: FC<IActionButton> = ({
  label,
  className,
  onClick,
  icon,
}) => {
  return (
    <button
      className={`${className} flex items-center gap-2 rounded-lg py-2 px-5`}
      onClick={onClick}
      type="button"
    >
      {icon && (
        <FontAwesomeIcon
          className="w-[15px] h-[15px] shrink-0 text-white"
          icon={icon}
        />
      )}
      <div>{label}</div>
    </button>
    
  )
}

export default ActionButton;




// interface IActionButton {
//   id: number;
//   name: string;
//   label: string;
//   className?: string;
//   onClick: (args: {
//     id: number;
//     name: string
//   }) => void;
//   icon?: IconDefinition;
// }


// id,
  // name,
  // label,
  // className,
  // onClick,
  // icon

// <button
    //   className={`${className} flex items-center gap-2 rounded-lg py-2 px-5`}
    //   onClick={() => onClick({ id, name })}
    //   type="button"
    // >
    //   {icon && (
    //     <FontAwesomeIcon
    //       className="w-[15px] h-[15px] shrink-0 text-white"
    //       icon={icon}
    //     />
    //   )}
    //   <div>{label}</div>
    // </button>