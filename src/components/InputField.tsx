import clsx from 'clsx';
import React, { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import Button from './Button';
interface InputFieldProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; //ex : 이메일 비밀번호
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  suffixButton?: React.ReactNode; // ex: 중복 확인 버튼
  variant?: 'line' | 'box'; // input박스 유형
  timer?: React.ReactNode;
  placeholderStyle?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder = '텍스트를 입력해주세요',
  required,
  disabled,
  error,
  suffixButton,
  variant = 'line',
  timer,
  placeholderStyle = '',
}) => {
  const wrapperClass =
    variant === 'line' ? 'flex flex-col w-full gap-1' : 'flex flex-col gap-2 w-full';
  const inputWrapperClass =
    variant === 'line'
      ? `border-b mb-2 pb-1 bg-transparent ${suffixButton ? 'pt-2' : 'pt-4'}`
      : 'border rounded-lg px-2 py-1 bg-white';
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={wrapperClass}>
      {/*레이블 require시 *표시 */}
      {label && (
        <label
          className={clsx(
            'text-s mb-[-15px] mt-2',
            variant === 'line' ? 'text-gray-400' : 'text-gray-600 font-medium'
          )}
        >
          {label} {required && <span className="text-pink-500">*</span>}
        </label>
      )}
      {/*wrapper 영역 focus시 색 변경 */}
      <div
        className={clsx(
          'flex mb-1 items-center border-zinc-200 transition duration-200 focus-within:border-black',
          inputWrapperClass
        )}
      >
        {/*input 영역*/}
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={clsx(
            'flex-1 text-sm mt-1 outline-none placeholder:font-normal placeholder-[#A9B3C2]',
            variant === 'line' ? 'bg-transparent' : 'bg-white',
            suffixButton ? 'relative top-1' : '',
            variant === 'box' && suffixButton ? 'mb-2' : '',
            placeholderStyle
          )}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-zinc-200"
          >
            {!showPassword ? (
              <IoEyeOffOutline className="size-6" />
            ) : (
              <IoEyeOutline className="size-6" />
            )}
          </button>
        )}
        {timer && <span className=" text-xs mt-3 text-pink-500 whitespace-nowrap">{timer}</span>}
        {suffixButton && (
          <Button
            variant="outline"
            size="m"
            type="button"
            color="gray"
            className={clsx(
              'border-zinc-400 ml-2 bg-zinc-50 min-w-[100px]',
              disabled ? 'hidden ' : ''
            )}
          >
            {suffixButton}
          </Button>
        )}
      </div>
      {/*error영역*/}
      {error && <p className="text-xs md:text-sm text-pink-500">{error}</p>}
    </div>
  );
};

export default InputField;
