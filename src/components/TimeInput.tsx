import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { Button } from './ui/button';

interface TimeInputProps {
  onStart: (milliseconds: number) => void;
  disabled?: boolean;
}

const TimeInput = ({ onStart, disabled = false }: TimeInputProps) => {
  const [minutes, setMinutes] = useState<string>('10');
  const [seconds, setSeconds] = useState<string>('0');

  const handleStart = () => {
    const totalMilliseconds =
      parseInt(minutes || '0', 10) * 60 * 1000 + parseInt(seconds || '0', 10) * 1000;

    onStart(totalMilliseconds);
  };

  return (
    <div className='w-75 py-10'>
      <div>
        <CustomSelect
          label='Timer Duration (minutes)'
          placeholder='Select minutes'
          value={minutes}
          onChange={(value) => setMinutes(value)}
          items={[
            { label: '00 Minute', value: '0' },
            { label: '05 Minutes', value: '5' },
            { label: '10 Minutes', value: '10' },
            { label: '15 Minutes', value: '15' },
            { label: '20 Minutes', value: '20' },
            { label: '25 Minutes', value: '25' },
            { label: '30 Minutes', value: '30' },
            { label: '45 Minutes', value: '45' },
            { label: '60 Minutes', value: '60' },
          ]}
        />
        <CustomSelect
          label='Timer Duration (seconds)'
          placeholder='Select seconds'
          value={seconds}
          onChange={(value) => setSeconds(value)}
          items={[
            { label: '00 Second', value: '0' },
            { label: '05 Seconds', value: '5' },
            { label: '10 Seconds', value: '10' },
            { label: '15 Seconds', value: '15' },
            { label: '20 Seconds', value: '20' },
            { label: '25 Seconds', value: '25' },
            { label: '30 Seconds', value: '30' },
            { label: '45 Seconds', value: '45' },
            { label: '60 Seconds', value: '60' },
          ]}
        />
        <Button
          onClick={handleStart}
          disabled={disabled || (!minutes && !seconds)}
          className='w-full mt-1 cursor-pointer bg-green-600 hover:bg-green-700 disabled:text-gray-400 text-white'
        >
          {disabled ? 'Running...' : 'Start'}
        </Button>
      </div>
    </div>
  );
};

export default TimeInput;

interface CustomSelectProps {
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  items: { label: string; value: string }[];
  label: string;
}

const CustomSelect = ({ placeholder, onChange, value, items, label }: CustomSelectProps) => {
  return (
    <div className='w-full mb-1'>
      <label htmlFor='minutes-input' className='text-sm font-medium text-muted-foreground'>
        {label}
      </label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className='w-full'>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
