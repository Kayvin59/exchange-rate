"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { calculateExchange, convertToUINT256 } from '@/lib/utils'

export default function ExchangeForm({ exchangeRate }) {
    const [baseAmount, setBaseAmount] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [action, setAction] = useState('');

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
            setTargetAmount(convertToUINT256(targetAmount));
        }
        if (action === 'target-to-base') {
            setBaseAmount(convertToUINT256(baseAmount));
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
        <form>
            <label htmlFor="btc">Bitcoin</label>
            <input 
                type="number" 
                id="btc"
                name="baseAmount"
                placeholder='0.00'
                inputMode='numeric'
                value={baseAmount || ''}
                onChange={onBaseAmountChange}
            />
            <label htmlFor="usdt">USDT</label>
            <input 
                type="text" 
                id="usdt"
                name="targetAmount"
                placeholder='0.00'
                inputMode='numeric'
                value={targetAmount || ''}
                onChange={onTargetAmountChange}
            />
        </form>
        <div>
            <button onClick={formatValue}>
                Convert
            </button>
        </div>
    </div>
  )
}
