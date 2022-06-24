import React from 'react';
import cls from 'classnames'

export default ({children, className}) => (
    <div className={cls('t-button-base t-button-base__padding', className)}>
        {children}
    </div>
)