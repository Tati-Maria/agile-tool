import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormControl } from '@/components/ui/form';

interface SelectFieldProps {
    defaultValue?: string;
    onValueChange: (value: string) => void;
    options: {label: string, value: string}[];
}

const SelectField = ({ defaultValue, onValueChange, options }: SelectFieldProps) => {
    return (
        <Select onValueChange={onValueChange} defaultValue={defaultValue}>
            <FormControl>
                <SelectTrigger>
                    <SelectValue placeholder="Select a value" />
                </SelectTrigger>
            </FormControl>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem value={option.value} key={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
};

export default SelectField;