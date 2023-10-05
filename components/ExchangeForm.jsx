"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { calculateExchange, convertToUINT256 } from '@/lib/utils'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function ExchangeForm({ exchangeRate }) {
    const [baseAmount, setBaseAmount] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [action, setAction] = useState('');
    const [convertedValue, setConvertedValue] = useState(null);

    const onBaseAmountChange = useCallback((e) => {
        setBaseAmount(e.target.value);
        setAction('base-to-target');
    }, []);

    const onTargetAmountChange = useCallback((e) => {
        setTargetAmount(e.target.value);
        setAction('target-to-base');
    }, [],);

    const formatValue = () => {
        if (action === 'base-to-target') {
            const converted = convertToUINT256(targetAmount)
            setConvertedValue(converted);
        }
        if (action === 'target-to-base') {
            const converted = convertToUINT256(baseAmount)
            setConvertedValue(converted);
        }
    }

    useEffect(() => {
        if (action === 'base-to-target') {
            setTargetAmount(calculateExchange(baseAmount, exchangeRate, 'base-to-target'));
        }
        if (action === 'target-to-base') {
            setBaseAmount(calculateExchange(targetAmount, exchangeRate, 'target-to-base'));
        }
    }, [action, baseAmount, exchangeRate, targetAmount])

  return (
    <div>
        <form className='mb-4'>
            <div className="grid w-full max-w-sm items-center mb-6 gap-1.5">
                <Label htmlFor="btc">Bitcoin</Label>
                <Input  
                    type="number" 
                    id="btc"
                    name="baseAmount"
                    placeholder='0.00'
                    inputMode='numeric'
                    value={baseAmount || ''}
                    onChange={onBaseAmountChange}
                />
            </div>
            <div className="grid w-full max-w-sm items-center mb-6 gap-1.5">
                <Label htmlFor="usdt">USDT</Label>
                <Input  
                    type="text" 
                    id="usdt"
                    name="targetAmount"
                    placeholder='0.00'
                    inputMode='numeric'
                    value={targetAmount || ''}
                    onChange={onTargetAmountChange}
                />
            </div>
            <div className="grid w-full max-w-sm items-center mb-6 gap-1.5">
                
            </div>
        </form>
        <div className="grid w-full max-w-sm items-center mb-6 gap-1.5">
            <Button onClick={formatValue}>
                Convert
            </Button>
            {convertedValue && (
                <div>
                    <span className='ml-2 text-lg font-bold'>{convertedValue} USDT</span>
                </div>
            )}
        </div>
    </div>
  )
}
