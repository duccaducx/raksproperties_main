import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

interface PriceSliderProps {
  min?: number;
  max?: number;
  step?: number;
  onValueChange?: (value: number[]) => void;
}

const PriceSlider: React.FC<PriceSliderProps> = ({ 
  min = 50000, 
  max = 5000000, 
  step = 10000,
  onValueChange 
}) => {
  const [value, setValue] = useState([min, max]);

  const formatPrice = (price: number) => {
    return `P ${price.toLocaleString()}`;
  };

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue);
    onValueChange?.(newValue);
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Price Range (BWP)</h3>
        
        <div className="px-2">
          <Slider
            value={value}
            onValueChange={handleValueChange}
            max={max}
            min={min}
            step={step}
            className="w-full"
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formatPrice(value[0])}</span>
          <span>{formatPrice(value[1])}</span>
        </div>
        
        <div className="text-center text-orange-600 font-medium">
          {formatPrice(value[0])} - {formatPrice(value[1])}
        </div>
      </div>
    </Card>
  );
};

export default PriceSlider;